/*!
 * Dentara — hero.js
 * Three.js hero scene in #hero-canvas: procedural molar (spheres + capsules,
 * MeshPhysicalMaterial w/ clearcoat) floating in ~300 additive glowing particles.
 * Auto-rotation + mouse parallax + drag-to-rotate + float bob.
 * DPR capped at 2, ResizeObserver, pauses when tab hidden, static frame under
 * prefers-reduced-motion, full disposal on pagehide. No external model files.
 * MIT (c) 2049 Dentara demo.
 */

(() => {
  'use strict';

  const container = document.getElementById('hero-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DPR_CAP = 2;

  /* ---------- renderer / scene / camera ---------- */
  let renderer, scene, camera, toothGroup, particles, particleMaterial;
  let rafId = 0, running = false, disposed = false;
  let targetRotX = 0, targetRotY = 0, dragRotY = 0, dragVelY = 0;
  let parallaxX = 0, parallaxY = 0;
  const clock = { t: 0, last: 0 };

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.setAttribute('aria-hidden', 'true');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.35, 7.2);
  camera.lookAt(0, 0, 0);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
  keyLight.position.set(3.5, 4.5, 5);
  scene.add(keyLight);

  // warm orange rim lights from both sides
  const rimA = new THREE.DirectionalLight(0xff8c42, 1.5);
  rimA.position.set(-5, 1.5, -3);
  scene.add(rimA);

  const rimB = new THREE.DirectionalLight(0xffb877, 0.9);
  rimB.position.set(5, -2, -4);
  scene.add(rimB);

  /* ---------- procedural tooth (molar) ---------- */
  const crownMat = new THREE.MeshPhysicalMaterial({
    color: 0xfdfbf7,        // porcelain white
    roughness: 0.22,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.18,
    envMapIntensity: 0.8
  });

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xff8c42,        // warm orange "gold" inlay
    roughness: 0.28,
    metalness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.25
  });

  toothGroup = new THREE.Group();

  // Crown: squashed sphere cluster (4 cusps)
  const cuspGeo = new THREE.SphereGeometry(0.62, 40, 32);
  const cusps = [[-0.42, 0.1, -0.4], [0.42, 0.1, -0.4], [-0.42, 0.1, 0.4], [0.42, 0.1, 0.4]];
  cusps.forEach(([x, y, z]) => {
    const m = new THREE.Mesh(cuspGeo, crownMat);
    m.position.set(x, y, z);
    m.scale.set(1, 0.72, 1);
    toothGroup.add(m);
  });
  // crown body fills the gaps between cusps
  const body = new THREE.Mesh(cuspGeo, crownMat);
  body.position.set(0, 0.02, 0);
  body.scale.set(1.35, 0.62, 1.28);
  toothGroup.add(body);

  // occlusal orange inlay — the "2049 signature"
  const inlay = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), goldMat);
  inlay.position.set(0, 0.5, 0);
  inlay.scale.set(1, 0.25, 0.9);
  toothGroup.add(inlay);

  // Roots: two capsules tapering down
  const rootGeo = new THREE.CapsuleGeometry(0.24, 0.85, 8, 24);
  const rootA = new THREE.Mesh(rootGeo, crownMat);
  rootA.position.set(-0.3, -0.95, 0);
  rootA.rotation.z = 0.14;
  rootA.scale.set(1, 1, 1);
  toothGroup.add(rootA);

  const rootB = new THREE.Mesh(rootGeo, crownMat);
  rootB.position.set(0.3, -0.95, 0);
  rootB.rotation.z = -0.14;
  toothGroup.add(rootB);
  rootA.scale.set(0.95, 1, 0.95);
  rootB.scale.set(0.95, 1, 0.95);

  // slight overall tilt for elegance
  toothGroup.rotation.z = 0.06;
  scene.add(toothGroup);

  /* ---------- particle cloud ---------- */
  const COUNT = 300;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const r = 2.6 + Math.random() * 2.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.62;   // flatter cloud
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    seeds[i] = Math.random() * Math.PI * 2;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  particleMaterial = new THREE.PointsMaterial({
    color: 0xffa25e,
    size: 0.055,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });
  particles = new THREE.Points(pGeo, particleMaterial);
  scene.add(particles);

  /* ---------- sizing ---------- */
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  /* ---------- interaction ---------- */
  let dragging = false, lastX = 0;
  const el = renderer.domElement;
  el.style.touchAction = 'pan-y';
  el.style.cursor = 'grab';

  el.addEventListener('pointerdown', (e) => {
    dragging = true; lastX = e.clientX; dragVelY = 0;
    el.style.cursor = 'grabbing';
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (dragging) {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      dragRotY += dx * 0.006;
      dragVelY = dx * 0.006;
    }
    const rect = el.getBoundingClientRect();
    parallaxX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
    parallaxY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.25;
  });
  window.addEventListener('pointerup', () => { dragging = false; el.style.cursor = 'grab'; });

  /* ---------- render loop ---------- */
  function frame(now) {
    if (disposed) return;
    rafId = requestAnimationFrame(frame);
    const dt = Math.min((now - clock.last) / 1000, 0.05);
    clock.last = now;
    clock.t += dt;

    // inertia + damping
    if (!dragging) { dragRotY += dragVelY; dragVelY *= 0.94; }
    targetRotY = clock.t * 0.22 + dragRotY;
    targetRotX = Math.sin(clock.t * 0.4) * 0.06;

    toothGroup.rotation.y += (targetRotY - toothGroup.rotation.y) * 0.08;
    toothGroup.rotation.x += (targetRotX - toothGroup.rotation.x) * 0.05;
    toothGroup.position.y = Math.sin(clock.t * 1.1) * 0.12;              // float bob

    particles.rotation.y = clock.t * 0.045;
    const pos = pGeo.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      pos.array[i * 3 + 1] += Math.sin(clock.t * 0.8 + seeds[i]) * 0.0009;
    }
    pos.needsUpdate = true;

    // mouse parallax on camera
    camera.position.x += (parallaxX - camera.position.x) * 0.04;
    camera.position.y += (0.35 + parallaxY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function renderStatic() {
    renderer.render(scene, camera);
  }

  function start() {
    if (disposed || running) return;
    running = true;
    clock.last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  function applyMotionPref() {
    if (reducedMotion.matches) { stop(); if (!disposed) renderStatic(); }
    else if (!document.hidden) start();
  }
  const motionMQ = (e) => applyMotionPref();
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', motionMQ);
  else if (reducedMotion.addListener) reducedMotion.addListener(motionMQ);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else applyMotionPref();
  });

  window.addEventListener('pagehide', () => {
    if (disposed) return;
    disposed = true;
    stop();
    if (ro) ro.disconnect();
    pGeo.dispose();
    cuspGeo.dispose();
    rootGeo.dispose();
    inlay.geometry.dispose();
    crownMat.dispose();
    goldMat.dispose();
    particleMaterial.dispose();
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }, { once: true });

  applyMotionPref();
})();
