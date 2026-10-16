/*!
 * Dentara — hero.js
 * Three.js hero scene in #hero-canvas: procedural molar (spheres + capsules,
 * MeshPhysicalMaterial w/ clearcoat) floating in ~300 additive glowing particles.
 * Auto-rotation + mouse parallax + drag-to-rotate + float bob.
 * Quality pass: ACESFilmic tone mapping + sRGB output, PMREM studio environment
 * (procedural, no external HDR), physically-based 4-point light rig, cast-free
 * soft materials, canvas-sprite round glow particles.
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
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.setAttribute('aria-hidden', 'true');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.35, 7.2);
  camera.lookAt(0, 0, 0);

  /* ---------- lights (physically-based) ---------- */
  const ambient = new THREE.AmbientLight(0xfff4ea, 0.4);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xffe4cc, 0.35);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(3.5, 4.5, 5);
  scene.add(keyLight);

  // soft fill from camera-left to open up shadowed cusps
  const fillLight = new THREE.DirectionalLight(0xfff1e4, 0.35);
  fillLight.position.set(-3, 1, 4);
  scene.add(fillLight);

  // warm orange rim lights from both sides
  const rimA = new THREE.DirectionalLight(0xff8c42, 2.0);
  rimA.position.set(-5, 1.5, -3);
  scene.add(rimA);

  const rimB = new THREE.DirectionalLight(0xffb877, 1.1);
  rimB.position.set(5, -2, -4);
  scene.add(rimB);

  /* ---------- procedural tooth (molar) ---------- */
  // Tiny PMREM room environment: gives clearcoat/reflections real structure
  // without loading any external HDR file (keeps the page dependency-free).
  function buildStudioEnvironment() {
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0d0b09);
    const geo = new THREE.PlaneGeometry(1, 1);
    const addPanel = (color, intensity, x, y, z, lookAtOrigin) => {
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) });
      mat.toneMapped = false;
      const panel = new THREE.Mesh(geo, mat);
      panel.position.set(x, y, z);
      if (lookAtOrigin) panel.lookAt(0, 0, 0);
      envScene.add(panel);
    };
    // key softbox (large, slightly warm white, upper front)
    addPanel(0xffffff, 6.0, 4, 5, 4, true);
    // cool-neutral fill panel (left)
    addPanel(0xfff1e4, 2.2, -5, 1.5, 3, true);
    // warm brand strip behind-left — the 2049 signature glow
    addPanel(0xff8c42, 4.5, -4, 0.5, -4, true);
    // warm counter-strip behind-right
    addPanel(0xffb877, 2.5, 4.5, -1.5, -4, true);
    // faint floor bounce
    addPanel(0xffe4cc, 0.8, 0, -5, 0, false);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(envScene, 0.18);
    pmrem.dispose();
    envScene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    return envRT.texture;
  }
  const envMap = buildStudioEnvironment();

  const crownMat = new THREE.MeshPhysicalMaterial({
    color: 0xfdfbf7,        // porcelain white
    roughness: 0.16,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    envMap: envMap,
    envMapIntensity: 1.1,
    sheen: 0.25,
    sheenColor: new THREE.Color(0xfff1e4),
    iridescence: 0.06,
    iridescenceIOR: 1.3
  });

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xff8c42,        // warm orange "gold" inlay
    roughness: 0.22,
    metalness: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
    envMap: envMap,
    envMapIntensity: 1.25
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

  // Soft radial glow sprite — round bokeh particles instead of hard squares
  function buildParticleSprite() {
    const S = 64;
    const cv = document.createElement('canvas');
    cv.width = S; cv.height = S;
    const ctx = cv.getContext('2d');
    const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0.0, 'rgba(255, 190, 140, 1)');
    g.addColorStop(0.35, 'rgba(255, 162, 94, 0.55)');
    g.addColorStop(1.0, 'rgba(255, 140, 66, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
  const particleTexture = buildParticleSprite();

  particleMaterial = new THREE.PointsMaterial({
    color: 0xffa25e,
    size: 0.085,
    map: particleTexture,
    transparent: true,
    opacity: 0.7,
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
    if (particleTexture) particleTexture.dispose();
    if (typeof envMap !== 'undefined' && envMap) envMap.dispose();
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }, { once: true });

  applyMotionPref();
})();
