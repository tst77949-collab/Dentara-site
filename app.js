/*!
 * Dentara — app.js
 * i18n engine (EN/FA), RTL switching, and all widget logic.
 * Pure ES2019, zero dependencies. Each widget is isolated in try/catch.
 * License: MIT (c) 2049 Dentara — demo site.
 */
(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════════
     1. I18N DICTIONARY — EN first, then fluent Persian (Vazirmatn tone)
     ════════════════════════════════════════════════════════════════ */
  var I18N = {"en":{"a11y_skip":"Skip to content","ba1_body":"Tetracycline staining corrected with 0.3 mm no-prep veneers in two visits.","ba1_title":"Full veneer smile — 8 units","ba2_body":"Flapless digital implant, CAD/CAM crown seated 4 hours after placement.","ba2_title":"Single implant + crown","ba3_body":"One 40-minute session, zero sensitivity, sealed with remineralization gel.","ba3_title":"Laser whitening — 6 shades","bot_q1":"Cost of implants?","bot_q2":"How fast is a crown?","bot_q3":"Book a visit","bot_q4":"Does it hurt?","bot_title":"Dentara Assistant","brand":"Dentara","contact_address":"Unit 2049, Horizon Tower, Valiasr Ave, Tehran (demo address)","contact_address_label":"Address:","contact_eyebrow":"Contact","contact_hours":"Clinic 9–19 daily · Emergency line 24/7","contact_hours_label":"Hours:","contact_phone_label":"Phone:","contact_title":"Book your 2049 appointment","counter1":"Smiles crafted","counter1_aria":"Smiles crafted: more than 12,000","counter2":"Years of practice","counter3":"Patient satisfaction","counter4":"Industry awards","doc1_name":"Dr. Sara Amini","doc1_role":"Chief Implantologist","doc2_name":"Dr. Kian Roshan","doc2_role":"Veneer & Smile Design","doc3_name":"Dr. Leila Farhadi","doc3_role":"Orthodontics Lead","doc4_name":"Dr. Omid Tabrizi","doc4_role":"Pediatric Dentistry","faq1_a":"Yes — CBCT guidance means the implant position is planned to a tenth of a millimetre before surgery, giving fewer surprises and faster healing than freehand placement.","faq1_q":"Are digital implants safe compared to traditional ones?","faq2_a":"In most cases, yes. The scan, design and milling happen in-house; a permanent milled crown is seated the same afternoon in about four hours.","faq2_q":"Can I really get a crown in one day?","faq3_a":"Ultra-thin no-prep veneers remove almost nothing from the enamel. We only recommend what your simulation shows you need.","faq3_q":"Do veneers damage my natural teeth?","faq4_a":"It is included in every consultation. The preview takes one selfie and five minutes, with zero obligation to proceed.","faq4_q":"What does the AI smile preview cost?","faq5_a":"We work with all major digital insurers and offer 6–24 month interest-free plans on implant and veneer packages.","faq5_q":"Do you accept insurance and payment plans?","faq_eyebrow":"Questions","faq_title":"Frequently asked","footer_contact_title":"Contact","footer_copy":"© 2049 Dentara — Demo site. All smiles reserved.","footer_hours":"Emergency line open 24/7.","footer_links_title":"Explore","footer_social_title":"Follow","footer_tag":"The Future of Your Smile — luxury digital dentistry.","form_name":"Full name","form_name_ph":"Full name","form_note":"Demo form — nothing is sent to a server.","form_phone":"Phone number","form_phone_ph":"Phone number","form_service":"Service","form_service_emergency":"Emergency 24/7","form_service_implant":"Digital Implant","form_service_ortho":"Invisible Orthodontics","form_service_pediatric":"Pediatric Dentistry","form_service_ph":"Choose a service…","form_service_veneer":"Veneer & Laminate","form_service_whitening":"Laser Whitening","form_submit":"Send request","form_title":"Request an appointment","hero_cta_primary":"Book your consultation","hero_cta_secondary":"Explore services","hero_eyebrow":"Digital Dentistry · Est. 2049","hero_stat1":"Smiles crafted","hero_stat2":"Satisfaction","hero_stat3":"Experience","hero_sub":"All-digital implants and veneers designed in hours, not weeks. CBCT-guided surgery, same-day CAD/CAM crowns and an AI smile preview — precision dentistry with five-star comfort.","hero_title_1":"The Future","hero_title_2":"of Your Smile","journey_eyebrow":"Your journey","journey_sub":"From first scan to final polish — most patients complete the journey in under two weeks.","journey_title":"Four steps to a new smile","map_eyebrow":"Visit us","map_title":"Find the clinic","nav_book":"Book a visit","nav_contact":"Contact","nav_faq":"FAQ","nav_journey":"Journey","nav_results":"Results","nav_services":"Services","nav_team":"Team","nav_tech":"Technology","results_eyebrow":"Real results","results_sub":"Drag the slider to reveal the transformation — actual Dentara cases.","results_title":"Before & after","services_eyebrow":"What we do","services_sub":"Six disciplines, one digital pipeline — from scan to smile in record time.","services_title":"Signature dental services","step1_body":"A 60-second CBCT + intraoral scan builds your complete 3D dental twin.","step1_title":"Digital scan","step2_body":"You approve a simulated result — shape, shade, everything — before any work begins.","step2_title":"AI smile plan","step3_body":"Laser and CAD/CAM procedures executed on the plan, same-day crowns included.","step3_title":"Guided treatment","step4_body":"Remote AI check-ins and an annual 3D review keep your result perfect for decades.","step4_title":"Lifetime follow-up","svc1_body":"CBCT-guided, flapless implant placement with a milled titanium-ceramic crown — planned in software, placed in one visit.","svc1_title":"Digital Implant","svc2_body":"Ultra-thin ceramic veneers designed on your digital twin — preview the final smile before we touch a single tooth.","svc2_title":"Veneer & Laminate","svc3_body":"Clear aligner sequences printed and tracked by AI — straighten discreetly with fortnightly remote check-ins.","svc3_title":"Invisible Orthodontics","svc4_body":"Enzyme-safe laser whitening: up to six shades brighter in a single 40-minute session, zero sensitivity.","svc4_title":"Laser Whitening","svc5_body":"Gamified, screen-based visits kids actually ask for — gentle prevention with digital caries mapping.","svc5_title":"Pediatric Dentistry","svc6_body":"Around-the-clock on-call surgeons and a triage line that answers in under 30 seconds — any night, any pain.","svc6_title":"Emergency 24/7","team_eyebrow":"The artists","team_sub":"Board-certified specialists, rated by the people whose smiles they rebuilt.","team_title":"Meet your clinicians","tech1_body":"Low-dose cone-beam volumetrics map bone, nerves and sinuses to a 0.2 mm grid.","tech1_title":"CBCT 3D Scan","tech2_body":"Intraoral scan → design → mill: your permanent crown is seated the same afternoon.","tech2_title":"Same-Day CAD/CAM Crown","tech3_body":"Er:YAG lasers replace scalpels and drills — near-bloodless, anesthesia-free for most cases.","tech3_title":"Laser Dentistry","tech4_body":"A generative model renders your post-treatment smile from a selfie — before day one.","tech4_title":"AI Smile Preview","tech_eyebrow":"The machine room","tech_sub":"Every treatment is simulated digitally before it happens — surgery becomes engineering.","tech_title":"Technology that sees your smile in 3D","testi1_meta":"Digital Implant, 2048","testi1_name":"Maryam K.","testi1_quote":"“I watched my new smile render on screen before anything began. The final teeth matched the preview exactly.”","testi2_meta":"Same-Day Crown, 2049","testi2_name":"Arash T.","testi2_quote":"“Scan at ten, crown by four. I still don’t fully believe it — there was never a temporary, never a second drill.”","testi3_meta":"Pediatric Care, 2049","testi3_name":"Nasim H.","testi3_quote":"“My daughter asks when the next dentist visit is. Whatever they did to make a clinic feel like a game studio — it works.”","testi_eyebrow":"Voices","testi_title":"Patients, in their own words"},"fa":{"a11y_skip":"پرش به محتوای اصلی","ba1_body":"اصلاح رنگ‌زدگی تتراسایکلین با ونیر بدون تراشِ ۰٫۳ میلی‌متری، فقط در دو جلسه.","ba1_title":"لبخند کامل با ونیر — ۸ واحد","ba2_body":"ایمپلنت دیجیتال بدون برش لثه؛ روکش CAD/CAM تنها ۴ ساعت بعد از کاشت جای گرفت.","ba2_title":"ایمپلنت تکی + روکش","ba3_body":"فقط یک جلسهٔ ۴۰ دقیقه‌ای، بدون حساسیت، و در پایان تثبیت با ژل تقویت مینا.","ba3_title":"سفیدکردگی با لیزر — ۶ درجه","bot_q1":"هزینهٔ ایمپلنت چقدر است؟","bot_q2":"روکش چقدر سریع آماده می‌شود؟","bot_q3":"می‌خواهم نوبت بگیرم","bot_q4":"آیا درد دارد؟","bot_title":"دستیار دنترا","brand":"دنترا","contact_address":"واحد ۲۰۴۹، برج افق، بلوار ولی‌عصر، تهران (نشانی نمایشی)","contact_address_label":"نشانی:","contact_eyebrow":"تماس","contact_hours":"مطب همه‌روزه ۹ تا ۱۹ · خط اورژانس ۲۴/۷","contact_hours_label":"ساعات کاری:","contact_phone_label":"تلفن:","contact_title":"نوبت ۲۰۴۹ خود را رزرو کنید","counter1":"لبخندهای ساخته‌شده","counter1_aria":"لبخندهای ساخته‌شده: بیش از دوازده هزار","counter2":"سال تجربه","counter3":"رضایت بیماران","counter4":"جوایز صنعت","doc1_name":"دکتر سارا امینی","doc1_role":"متخصص ارشد ایمپلنت","doc2_name":"دکتر کیان روشن","doc2_role":"ونیر و طراحی لبخند","doc3_name":"دکتر لیلا فرهادی","doc3_role":"مسئول ارتودنسی","doc4_name":"دکتر امید تبریزی","doc4_role":"دندان‌پزشکی کودکان","faq1_a":"بله — هدایت CBCT یعنی موقعیت ایمپلنت پیش از جراحی تا یک‌دهم میلی‌متر برنامه‌ریزی می‌شود؛ نتیجه‌اش غافلگیری کمتر و بهبود سریع‌تر نسبت به کاشت دستیِ آزاد است.","faq1_q":"آیا ایمپلنت دیجیتال نسبت به روش سنتی امن‌تر است؟","faq2_a":"در بیشتر موارد بله. اسکن، طراحی و تراش همه در همان کلینیک انجام می‌شود؛ روکش دائمیِ تراشیده‌شده همان بعدازظهر — حدود چهار ساعت بعد — جای می‌گیرد.","faq2_q":"واقعاً می‌شود روکش را در یک روز تحویل گرفت؟","faq3_a":"ونیرهای فوق‌نازکِ بدون تراش تقریباً هیچ بخشی از مینا را برنمی‌دارند؛ ما فقط همان چیزی را پیشنهاد می‌دهیم که شبیه‌سازی به شما نشان داده است.","faq3_q":"آیا ونیر به دندان‌های طبیعی‌ام آسیب می‌زند؟","faq4_a":"در هر مشاوره رایگان است. فقط یک سلفی و پنج دقیقه وقت می‌برد، با هیچ تعهدی برای ادامهٔ درمان.","faq4_q":"پیش‌نمایش لبخند با هوش مصنوعی چقدر هزینه دارد؟","faq5_a":"با همهٔ بیمه‌های دیجیتال اصلی تسویه می‌کنیم و برای بسته‌های ایمپلنت و ونیر، طرح اقساط ۶ تا ۲۴ ماههٔ بدون بهره داریم.","faq5_q":"بیمه و پرداخت اقساطی می‌پذیرید؟","faq_eyebrow":"پرسش‌ها","faq_title":"پرسش‌های پرتکرار","footer_contact_title":"تماس","footer_copy":"© ۲۰۴۹ دنترا — سایت نمایشی. همهٔ لبخندها محفوظ است.","footer_hours":"خط اورژانس شبانه‌روزی پاسخ‌گو است.","footer_links_title":"دسترسی سریع","footer_social_title":"ما را دنبال کنید","footer_tag":"آیندهٔ لبخند تو — دندان‌پزشکی لوکس دیجیتال.","form_name":"نام و نام خانوادگی","form_name_ph":"نام و نام خانوادگی","form_note":"فرم نمایشی است — چیزی به سروری ارسال نمی‌شود.","form_phone":"شمارهٔ تماس","form_phone_ph":"شمارهٔ تماس","form_service":"خدمت","form_service_emergency":"اورژانس ۲۴/۷","form_service_implant":"ایمپلنت دیجیتال","form_service_ortho":"ارتودنسی نامرئی","form_service_pediatric":"دندان‌پزشکی کودکان","form_service_ph":"یک خدمت انتخاب کنید…","form_service_veneer":"ونیر و لمینت","form_service_whitening":"سفیدکردگی لیزری","form_submit":"ثبت درخواست","form_title":"درخواست نوبت","hero_cta_primary":"رزرو مشاوره","hero_cta_secondary":"مشاهدهٔ خدمات","hero_eyebrow":"دندان‌پزشکی دیجیتال · از ۲۰۴۹","hero_stat1":"لبخندهای ساخته‌شده","hero_stat2":"رضایت","hero_stat3":"تجربه","hero_sub":"ایمپلنت و ونیر تمام‌دیجیتال؛ طراحی در چند ساعت، نه چند هفته. جراحی هدایت‌شده با CBCT، روکش CAD/CAM همان‌روز و پیش‌نمایش لبخند با هوش مصنوعی — دقت در حد مهندسی، با آسایشی پنج‌ستاره.","hero_title_1":"آیندهٔ","hero_title_2":"لبخند تو","journey_eyebrow":"مسیر شما","journey_sub":"از اولین اسکن تا آخرین پرداخت — بیشتر بیماران این مسیر را در کمتر از دو هفته طی می‌کنند.","journey_title":"چهار قدم تا لبخندی نو","map_eyebrow":"به ما سر بزنید","map_title":"پیدا کردن کلینیک","nav_book":"رزرو نوبت","nav_contact":"تماس","nav_faq":"پرسش‌ها","nav_journey":"مسیر درمان","nav_results":"نتایج","nav_services":"خدمات","nav_team":"تیم","nav_tech":"فناوری","results_eyebrow":"نتایج واقعی","results_sub":"اسلایدر را بکشید و نتیجه را ببینید — کیس‌های واقعی دنترا.","results_title":"قبل و بعد","services_eyebrow":"کار ما","services_sub":"شش تخصص، یک خط تولید دیجیتال — از اسکن تا لبخند در کمترین زمان.","services_title":"خدمات شاخص دندان‌پزشکی","step1_body":"یک اسکن CBCT و داخل‌دهانی ۶۰ ثانیه‌ای، دوقلوی سه‌بعدی کامل دندان‌های شما را می‌سازد.","step1_title":"اسکن دیجیتال","step2_body":"نتیجهٔ شبیه‌سازی‌شده — فرم، رنگ، همه‌چیز — را پیش از شروع هر کاری خودتان تأیید می‌کنید.","step2_title":"طرح لبخند با هوش مصنوعی","step3_body":"مراحل لیزری و CAD/CAM دقیقاً طبق همان طرح اجرا می‌شود؛ روکش همان‌روز هم شامل آن است.","step3_title":"درمان هدایت‌شده","step4_body":"چک‌آپ‌های از راه دور با هوش مصنوعی و بازبینی سالانهٔ سه‌بعدی، نتیجه را دهه‌ها بی‌نقص نگه می‌دارد.","step4_title":"پیگیری مادام‌العمر","svc1_body":"کاشت ایمپلنت بدون برش لثه با هدایت CBCT و روکش تیتانیوم-سرامیکی تراشیده‌شده — برنامه‌ریزی در نرم‌افزار، انجام در یک جلسه.","svc1_title":"ایمپلنت دیجیتال","svc2_body":"ونیرهای سرامیکی فوق‌نازک طراحی‌شده روی دوقلوی دیجیتال شما — لبخند نهایی را پیش از دست‌زدن به حتی یک دندان ببینید.","svc2_title":"ونیر و لمینت","svc3_body":"توالی الاینرهای شفاف، چاپ و ردیابی‌شده با هوش مصنوعی — بی‌سروصدا صاف کنید، با چک‌آپ دوهفته‌ای از راه دور.","svc3_title":"ارتودنسی نامرئی","svc4_body":"سفیدکردگی لیزریِ امن برای مینا: تا شش درجه روشن‌تر در یک جلسهٔ ۴۰ دقیقه‌ای، بدون کوچک‌ترین حساسیت.","svc4_title":"سفیدکردگی لیزری","svc5_body":"جلسه‌های بازی‌محور و تصویری که بچه‌ها خودشان برایشان لحظه‌شماری می‌کنند — پیشگیریِ ملایم همراه با نقشهٔ دیجیتال پوسیدگی.","svc5_title":"دندان‌پزشکی کودکان","svc6_body":"جراحان کشیک شبانه‌روزی و خط تریاژی که در کمتر از ۳۰ ثانیه پاسخ می‌دهد — هر شب، برای هر دردی.","svc6_title":"اورژانس ۲۴/۷","team_eyebrow":"هنرمندان لبخند","team_sub":"متخصصان دارای بورد تخصصی، با امتیازی که کسانی داده‌اند که لبخندشان را بازساخته‌اند.","team_title":"با درمانگران خود آشنا شوید","tech1_body":"توموگرافی مخروطیِ کم‌دوز، استخوان، عصب و سینوس‌ها را روی شبکه‌ای ۰٫۲ میلی‌متری نقشه‌برداری می‌کند.","tech1_title":"اسکن سه‌بعدی CBCT","tech2_body":"اسکن داخل‌دهانی، طراحی، تراش: روکش دائمی شما همان بعدازظهر جای می‌گیرد.","tech2_title":"روکش CAD/CAM همان‌روز","tech3_body":"لیزرهای Er:YAG جای اسکالپل و مته را می‌گیرند — تقریباً بدون خون و در بیشتر موارد بدون بی‌حسی.","tech3_title":"دندان‌پزشکی لیزری","tech4_body":"یک مدل مولد، لبخندِ پس از درمان شما را از روی یک سلفی رندر می‌کند — حتی قبل از روز اول.","tech4_title":"پیش‌نمایش لبخند با هوش مصنوعی","tech_eyebrow":"اتاق ماشین‌ها","tech_sub":"هر درمان پیش از وقوع به‌صورت دیجیتال شبیه‌سازی می‌شود — جراحی به مهندسی بدل می‌شود.","tech_title":"فناوری‌ای که لبخند شما را سه‌بعدی می‌بیند","testi1_meta":"ایمپلنت دیجیتال، ۲۰۴۸","testi1_name":"مریم ک.","testi1_quote":"«قبل از هر کاری لبخند جدیدم را روی صفحه رندرشده دیدم. دندان‌های نهایی دقیقاً با پیش‌نمایش یکی بود.»","testi2_meta":"روکش همان‌روز، ۲۰۴۹","testi2_name":"آرش ت.","testi2_quote":"«ساعت ده اسکن، ساعت چهار روکش. هنوز باورم نمی‌شود — نه چیزی موقتی بود، نه متهٔ دومی در کار بود.»","testi3_meta":"مراقبت کودکان، ۲۰۴۹","testi3_name":"نسیم ه.","testi3_quote":"«دخترم می‌پرسد کی دوباره دندان‌پزشکی می‌رویم. هر کاری کرده‌اند که کلینیک شبیه استودیوی بازی شود — جواب داد.»","testi_eyebrow":"صدای بیماران","testi_title":"بیماران، به زبان خودشان"}};

  var LANG_KEY = 'dentara-lang';
  var DEFAULT_LANG = 'en';
  var RTL_LANGS = { fa: true };

  function isLang(v) { return v === 'en' || v === 'fa'; }

  function storedLang() {
    try {
      var v = window.localStorage.getItem(LANG_KEY);
      return isLang(v) ? v : null;
    } catch (e) { return null; }
  }

  function persistLang(lang) {
    try { window.localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
  }

  function t(key, lang) {
    var dict = I18N[lang] || I18N[DEFAULT_LANG];
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    if (Object.prototype.hasOwnProperty.call(I18N[DEFAULT_LANG], key)) return I18N[DEFAULT_LANG][key];
    return null;
  }

  function applyI18n(lang) {
    var dict = I18N[lang] || I18N[DEFAULT_LANG];
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var val = t(key, lang);
      if (val === null) { console.warn('[dentara:i18n] missing key: ' + key); continue; }
      nodes[i].textContent = val;
    }
    /* placeholder translations */
    var ph = document.querySelectorAll('[data-i18n-ph]');
    for (var p = 0; p < ph.length; p++) {
      var pk = ph[p].getAttribute('data-i18n-ph');
      var pv = t(pk, lang);
      if (pv === null) { console.warn('[dentara:i18n] missing key: ' + pk); continue; }
      ph[p].setAttribute('placeholder', pv);
    }
    /* aria-label translations */
    var ar = document.querySelectorAll('[data-i18n-aria]');
    for (var a = 0; a < ar.length; a++) {
      var ak = ar[a].getAttribute('data-i18n-aria');
      var av = t(ak, lang);
      if (av === null) { console.warn('[dentara:i18n] missing key: ' + ak); continue; }
      ar[a].setAttribute('aria-label', av);
    }
  }

  function activateFonts(lang) {
    var faLink = document.getElementById('font-fa');
    var latinLink = document.getElementById('font-latin');
    if (faLink) faLink.disabled = (lang !== 'fa');
    if (latinLink) latinLink.disabled = (lang === 'fa');
  }

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'fa' ? 'fa' : 'en';
  }

  function setLang(lang, opts) {
    if (!isLang(lang)) lang = DEFAULT_LANG;
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', RTL_LANGS[lang] ? 'rtl' : 'ltr');
    applyI18n(lang);
    activateFonts(lang);
    persistLang(lang);
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.textContent = lang === 'fa' ? 'English' : 'فارسی';
      toggle.setAttribute('aria-label',
        lang === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی');
    }
    document.title = lang === 'fa'
      ? 'دنترا — آیندهٔ لبخند تو'
      : 'Dentara — The Future of Your Smile';
    if (!opts || !opts.silent) {
      var evt;
    try { evt = new CustomEvent('dentara:langchange', { detail: { lang: lang } }); }
    catch (e) { evt = document.createEvent('CustomEvent'); evt.initCustomEvent('dentara:langchange', true, true, { lang: lang }); }
    document.dispatchEvent(evt);
    }
  }

  function initI18n() {
    setLang(storedLang() || DEFAULT_LANG, { silent: true });
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        setLang(currentLang() === 'fa' ? 'en' : 'fa');
      });
    }
  }

  /* ════════════════════════════════════════════════════════════════
     2. UTILITIES
     ════════════════════════════════════════════════════════════════ */
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ════════════════════════════════════════════════════════════════
     3. NAVBAR — shrink + shadow on scroll
     ════════════════════════════════════════════════════════════════ */
  function initNavbar() {
    var nav = $('#navbar') || $('.navbar') || $('header.navbar');
    if (!nav) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      nav.classList.toggle('scrolled', y > 24);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  /* ════════════════════════════════════════════════════════════════
     4. SMOOTH ANCHOR SCROLLING (offset by fixed navbar height)
     ════════════════════════════════════════════════════════════════ */
  function initSmoothAnchors() {
    document.addEventListener('click', function (ev) {
      var link = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      ev.preventDefault();
      var nav = $('#navbar') || $('.navbar');
      var offset = nav ? nav.offsetHeight + 8 : 0;
      var top = target.getBoundingClientRect().top + (window.pageYOffset || 0) - offset;
      if (prefersReducedMotion()) {
        window.scrollTo(0, top < 0 ? 0 : top);
      } else {
        window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
      }
      /* move focus for keyboard/AT users */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ════════════════════════════════════════════════════════════════
     5. SCROLL REVEAL — IntersectionObserver adds .is-visible
     ════════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    var items = $all('.reveal, [data-reveal], .scroll-reveal');
    if (!items.length) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible', 'visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ════════════════════════════════════════════════════════════════
     6. COUNTERS — [data-counter] count-up on first view
     ════════════════════════════════════════════════════════════════ */
  function formatNumber(n) {
    try {
      return new Intl.NumberFormat(currentLang() === 'fa' ? 'fa-IR' : 'en-US').format(n);
    } catch (e) {
      return String(n);
    }
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReducedMotion()) {
      el.textContent = formatNumber(target) + suffix;
      return;
    }
    var duration = 2200;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4); /* ease-out quartic — faster start, gentler settle */
      el.textContent = formatNumber(Math.round(target * eased)) + suffix;
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function initCounters() {
    var counters = $all('[data-counter]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { animateCounter(el); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ════════════════════════════════════════════════════════════════
     7. 3D TILT — pointer-driven tilt on [data-tilt] cards
     ════════════════════════════════════════════════════════════════ */
  function initTilt() {
    if (prefersReducedMotion()) return;
    var cards = $all('[data-tilt]');
    cards.forEach(function (card) {
      var raf = null;
      function onMove(ev) {
        var rect = card.getBoundingClientRect();
        var x = (ev.clientX - rect.left) / rect.width - 0.5;
        var y = (ev.clientY - rect.top) / rect.height - 0.5;
        if (raf) window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(function () {
          card.style.transform =
            'perspective(900px) rotateX(' + (-y * 7).toFixed(2) + 'deg)' +
            ' rotateY(' + (x * 9).toFixed(2) + 'deg)' +
            ' translateY(-4px)';
        });
      }
      function onLeave() {
        if (raf) window.cancelAnimationFrame(raf);
        card.style.transform = '';
      }
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      card.addEventListener('blur', onLeave, true);
    });
  }

  /* ════════════════════════════════════════════════════════════════
     8. TIMELINE (#journey) — progress line + step activation
     ════════════════════════════════════════════════════════════════ */
  function initTimeline() {
    var timeline = $('#journey') || $('.timeline');
    if (!timeline) return;
    var line = $('.timeline-progress', timeline) ||
               $('.timeline-line-fill', timeline) ||
               $('.timeline-line span', timeline);
    var steps = $all('.tl-step, .timeline-step, .journey-step', timeline);
    if (!line || !steps.length) return;

    function update() {
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      /* progress: how far the timeline has travelled through the viewport */
      var total = rect.height + vh * 0.6;
      var passed = vh * 0.8 - rect.top;
      var ratio = Math.max(0, Math.min(1, passed / total));
      line.style.width = (ratio * 100).toFixed(1) + '%';
      steps.forEach(function (step, i) {
        var trigger = rect.top + rect.height * ((i + 0.5) / steps.length);
        step.classList.toggle('reached', trigger < vh * 0.85);
        step.classList.toggle('active', trigger < vh * 0.7);
      });
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () { ticking = false; update(); });
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ════════════════════════════════════════════════════════════════
     9. BEFORE/AFTER REVEAL SLIDER (.ba-slider + input.ba-range)
     ════════════════════════════════════════════════════════════════ */
  function initBeforeAfter() {
    var sliders = $all('.ba-slider');
    sliders.forEach(function (box) {
      var range = $('input[type="range"].ba-range', box) || $('input[type="range"]', box);
      if (!range) return;

      function setPct(pct) {
        pct = Math.max(0, Math.min(100, pct));
        box.style.setProperty('--ba-split', pct + '%');
        /* LTR: before layer clips from its right edge; RTL mirrors via CSS */
        var layers = $all('.ba-before, .ba-layer--before', box);
        layers.forEach(function (l) { l.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)'; });
        var handle = $('.ba-handle, .ba-divider', box);
        if (handle) handle.style.insetInlineStart = pct + '%';
        if (document.documentElement.getAttribute('dir') === 'rtl') {
          if (handle) handle.style.right = pct + '%';
          if (handle) handle.style.left = 'auto';
        } else {
          if (handle) handle.style.left = pct + '%';
          if (handle) handle.style.right = 'auto';
        }
      }

      range.addEventListener('input', function () { setPct(parseFloat(range.value)); });

      /* pointer drag anywhere on the card (not only the native thumb) */
      var dragging = false;
      function pctFromEvent(ev) {
        var rect = box.getBoundingClientRect();
        var ratio = (ev.clientX - rect.left) / rect.width;
        if (document.documentElement.getAttribute('dir') === 'rtl') ratio = 1 - ratio;
        return ratio * 100;
      }
      box.addEventListener('pointerdown', function (ev) {
        if (ev.target === range) return; /* let the native input handle it */
        dragging = true;
        box.setPointerCapture && box.setPointerCapture(ev.pointerId);
        var pct = pctFromEvent(ev);
        range.value = pct;
        setPct(pct);
      });
      box.addEventListener('pointermove', function (ev) {
        if (!dragging) return;
        var pct = pctFromEvent(ev);
        range.value = pct;
        setPct(pct);
      });
      box.addEventListener('pointerup', function () { dragging = false; });
      box.addEventListener('pointercancel', function () { dragging = false; });

      setPct(parseFloat(range.value) || 50);
    });
  }

  /* ════════════════════════════════════════════════════════════════
     10. FAQ — single-open <details> accordion
     ════════════════════════════════════════════════════════════════ */
  function initFaq() {
    var items = $all('details.faq-item');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      });
    });
  }

  /* ════════════════════════════════════════════════════════════════
     11. CONTACT FORM — demo toast on submit (no backend)
     ════════════════════════════════════════════════════════════════ */
  var toastTimer = null;
  function showToast(message) {
    var toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('show', 'is-visible', 'visible');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show', 'is-visible', 'visible');
      window.setTimeout(function () { toast.hidden = true; }, 400);
    }, 3800);
  }

  function initContactForm() {
    var form = $('#appointmentForm') || $('#contactForm') || $('form.contact-form');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity && form.reportValidity();
        return;
      }
      var fa = currentLang() === 'fa';
      var name = ($('input[name="name"]', form) || {}).value || '';
      var first = name.trim().split(/\s+/)[0];
      showToast(fa
        ? (first ? first + ' عزیز، ' : '') + 'درخواست شما ثبت شد — به‌زودی با شما تماس می‌گیریم. (نسخهٔ نمایشی)'
        : 'Thank' + (first ? ', ' + first : '') + '! Your request has been received — we\u2019ll call you shortly. (demo)');
      form.reset();
    });
  }

  /* ════════════════════════════════════════════════════════════════
     12. CHATBOT — scripted assistant demo (EN + FA), typing indicator
     ════════════════════════════════════════════════════════════════ */
  var BOT = {
    price: {
      en: 'Our digital implant package starts from 45 million tomans, and veneers from 12 million per unit — both include 3D planning and a lifetime follow-up plan. Exact pricing follows your free CBCT consultation. (demo pricing)',
      fa: 'بستهٔ ایمپلنت دیجیتال از ۴۵ میلیون تومان شروع می‌شود و ونیر از ۱۲ میلیون به‌ازای هر واحد — هر دو شامل طرح‌ریزی سه‌بعدی و پیگیری مادام‌العمر هستند. قیمت دقیق را در مشاورهٔ رایگان CBCT اعلام می‌کنیم. (قیمت‌های نمایشی)'
    },
    time: {
      en: 'Very fast: scan in the morning, design by noon, and your permanent CAD/CAM crown is seated the same afternoon — about four hours end-to-end.',
      fa: 'بسیار سریع: صبح اسکن، ظهر طراحی، و روکش دائمی CAD/CAM همان بعدازظهر جای می‌گیرد — کل فرایند حدود چهار ساعت.'
    },
    book: {
      en: 'With pleasure! Call +98 21 0000 0000 or use the appointment form in the Contact section — we confirm within one hour during clinic hours.',
      fa: 'با کمال میل! با شمارهٔ ۰۲۱–۰۰۰۰۰۰۰۰ تماس بگیرید یا از فرم نوبت در بخش تماس استفاده کنید — در ساعات کاری، حداکثر یک ساعت بعد تأیید می‌کنیم.'
    },
    pain: {
      en: 'Far less than you might expect. Laser dentistry and flapless guided surgery mean no scalpel, and most implants need only local anesthesia — many patients return to work the same day.',
      fa: 'بسیار کمتر از آنچه فکر می‌کنید. دندان‌پزشکی لیزری و جراحی هدایت‌شدهٔ بدون برش یعنی بدون اسکالپل، و بیشتر ایمپلنت‌ها فقط با بی‌حسی موضعی انجام می‌شوند — خیلی‌ها همان روز سر کار می‌روند.'
    }
  };

  function botMsg(text, log, delay) {
    /* typing indicator bubble, then the answer */
    var typing = document.createElement('div');
    typing.className = 'typing-indicator chat-typing';
    typing.setAttribute('aria-label', '…');
    for (var i = 0; i < 3; i++) typing.appendChild(document.createElement('span'));
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    window.setTimeout(function () {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      var msg = document.createElement('div');
      msg.className = 'chat-msg chat-msg--bot chat-msg.bot';
      msg.textContent = text;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }, delay || (prefersReducedMotion() ? 80 : 700));
  }

  function initChatbot() {
    var root = $('#chatbot') || $('.chatbot');
    if (!root) return;
    var fab = $('#chatbotFab', root) || $('.chatbot-fab', root);
    var panel = $('#chatbotPanel', root) || $('.chatbot-panel', root);
    var closeBtn = $('#chatbotClose', root) || $('.chatbot-close', root);
    var log = $('#chatbotLog', root) || $('.chatbot-log', root);
    if (!fab || !panel) return;

    var open = false;
    function setOpen(next) {
      open = next;
      panel.classList.toggle('open', next);
      panel.classList.toggle('is-open', next);
      panel.hidden = !next;
      fab.setAttribute('aria-expanded', next ? 'true' : 'false');
      /* swap fab icon if the double-icon markup exists */
      var chatIcon = $('.icon-chat', fab);
      var closeIcon = $('.icon-close', fab);
      if (chatIcon && closeIcon) {
        chatIcon.style.display = next ? 'none' : '';
        closeIcon.style.display = next ? '' : 'none';
      }
      if (next && log && !log.childElementCount) {
        var greeting = currentLang() === 'fa'
          ? 'سلام! من دستیار دنترا هستم. یکی از پرسش‌های زیر را انتخاب کنید 👇'
          : 'Hi! I\u2019m the Dentara assistant. Pick one of the questions below 👇';
        window.setTimeout(function () { botMsg(greeting, log, 300); }, 250);
      }
      if (next && log) log.scrollTop = log.scrollHeight;
    }

    fab.addEventListener('click', function () { setOpen(!open); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && open) setOpen(false);
    });
    document.addEventListener('click', function (ev) {
      if (!open) return;
      if (root.contains(ev.target)) return;
      setOpen(false);
    });
    document.addEventListener('dentara:langchange', function () {
      /* reseed the conversation in the new language; keep panel state */
      var wasOpen = open;
      if (log) log.innerHTML = '';
      if (wasOpen) {
        open = false; /* reset guard so the greeting is re-seeded */
        setOpen(true);
      }
    });

    if (log) {
      $all('[data-bot-q]', root).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-bot-q');
          var entry = BOT[key];
          if (!entry) return;
          var fa = currentLang() === 'fa';
          var q = document.createElement('div');
          q.className = 'chat-msg chat-msg--user chat-msg.user';
          q.textContent = btn.textContent;
          log.appendChild(q);
          log.scrollTop = log.scrollHeight;
          botMsg(fa ? entry.fa : entry.en, log);
        });
      });
    }
  }

  /* ════════════════════════════════════════════════════════════════
     13. BOOT — every widget isolated so one failure never kills the rest
     ════════════════════════════════════════════════════════════════ */
  var booted = false;
  function boot() {
    if (booted) return; /* never double-init if DOMContentLoaded fires twice */
    booted = true;
    [initI18n, initNavbar, initSmoothAnchors, initScrollReveal, initCounters,
     initTilt, initTimeline, initBeforeAfter, initFaq, initContactForm, initChatbot
    ].forEach(function (fn) {
      try { fn(); } catch (err) {
        if (window.console && console.warn) console.warn('[dentara] widget failed:', fn.name, err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
