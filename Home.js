// Contact in sub-navbar
const subContact = document.querySelector('.sub-contact-btn');
if (subContact) {
  subContact.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Contact Us clicked — ganti ini dengan navigasi ke halaman contact atau modal.');
  });
}

// ================== DISCOVER CAROUSEL SECTION ================== //
(function () {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const btnPrev = document.querySelector('.carousel-btn--left');
  const btnNext = document.querySelector('.carousel-btn--right');
  const dotsWrap = document.querySelector('.carousel-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  const autoplayInterval = 4000;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function updateTrack() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseInt(getComputedStyle(track).gap || 20, 10);
    const x = (slideWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${x}px)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((d, i) =>
      d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false')
    );
  }

  function goTo(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    currentIndex = index;
    updateTrack();
    resetAutoplay();
  }

  btnPrev && btnPrev.addEventListener('click', () => goTo(currentIndex - 1));
  btnNext && btnNext.addEventListener('click', () => goTo(currentIndex + 1));

  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (ev.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  const carouselEl = document.querySelector('.carousel');
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);
  carouselEl.addEventListener('focusin', stopAutoplay);
  carouselEl.addEventListener('focusout', startAutoplay);

  let imagesLoaded = 0;
  const imgs = track.querySelectorAll('img');
  imgs.forEach((img) => {
    if (img.complete) imagesLoaded++;
    else
      img.addEventListener('load', () => {
        imagesLoaded++;
        if (imagesLoaded === imgs.length) updateTrack();
      });
  });

  window.addEventListener('resize', () => updateTrack());

  updateTrack();
  startAutoplay();
})();

// ================== PURIFIER SWITCHER ================== //
const purifierButtons = document.querySelectorAll('.product-btn');
const purifierImage = document.querySelector('.product-display img');

if (purifierButtons.length && purifierImage) {
  let isTransitioning = false;

  purifierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;

      purifierButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const newIndex = btn.dataset.index;
      const newSrc = `images/purifier-${newIndex}.png`;

      purifierImage.style.transition = 'opacity 0.5s ease';
      purifierImage.style.opacity = 0;

      setTimeout(() => {
        purifierImage.src = newSrc;
        purifierImage.onload = () => {
          purifierImage.style.opacity = 1;
          setTimeout(() => {
            isTransitioning = false;
          }, 400);
        };
      }, 250);
    });
  });
}

// ================== FAQ ACCORDION ================== //
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach((i) => {
      if (i !== item) i.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// ================== MULTI-LANGUAGE SYSTEM ================== //

const translations = {
  en: {
    find_store: "Find a Store",
    nav_home: "Home",
    nav_professional: "Professional",
    nav_iot: "Seamless IoT",
    nav_energy: "Energy",
    nav_program: "Program",
    nav_support: "Support",
    nav_pay: "Pay",
    smart_lifestyle: "Smart Lifestyle",
    our_products: "Our Products",
    how_to_subscribe: "How to Subscribe",
    b2b: "B2B",
    faq: "FAQ",
    contact_us: "Contact Us",
    hero_title: "Hydrate with<br>Peace of Mind",
    hero_sub: "Enjoy MODENA appliances with no upfront cost through Seamless Go Subscription Service",
    subscription_title: "Subscribe Now. Use Freely.<br>Go Worry-Free.",
    subscription_desc: "Subscribe to a better way of enjoying appliances with Seamless Go Subscription Service. No upfront stress, no maintenance worries—just the freedom to use without the usual ownership hassle.",
    card1_overlay: "Multiple Plans<br>Available",
    card3_price_line: "Start From",
    card3_price_price: "Rp.240.000",
    card3_price_month: "/Month",
    card4_overlay: "Seamless Care: <br>From installation to regular maintenance—all handled.",
    discover_title: "All-In Care At<br>No Extra Cost",
    discover_sub: "All the service you need, already included.<br>So you can focus on what matters — living, not maintaining.",
    slide1: "FREE Water Checking",
    slide2: "4x General Checking & Cleaning",
    slide3: "FREE Filter Changing",
    slide3_sub: "(Based on Replacement Cycle)",
    slide4: "FREE Repair Cost",
    slide5: "FREE Spare Parts",
    slide6: "20% OFF for Accessories",
    our_products_label: "OUR PRODUCTS",
    purifier_title: "Choose What You Need for Your Home",
    subscribe_title: "How to Subscribe",
    for_business_label: "FOR BUSINESS",
    for_business_title: "Simplify Daily Operations with Seamless Go Subscription Service",
    for_business_desc: "It's the smarter choice for busy spaces—less downtime, fewer service costs, more peace of mind.",
    ready_title: "Ready to Go?<br>Let's Get Started!",
    subscribe_now: "Subscribe Now",
    faq_header: "Frequently Asked Questions (FAQ)",
    faq_q1: "What is Seamless Go Subscription Service?",
    faq_a1: "Seamless Go is a subscription program that lets you use MODENA home appliances with a more affordable monthly payment. With this program, you can enjoy the product without worrying about routine maintenance or other extra costs.",
    faq_q2: "What’s included in a Seamless Go Subscription Service plan?",
    faq_a2: "Your plan includes the product, routine service and maintenance, and warranty coverage for the full contract period.",
    faq_q3: "How does Seamless Go Subscription Service work?",
    faq_a3: "Just choose a product from our catalog, pick your preferred subscription duration, and make your monthly payments based on your selected plan. We’ll deliver the product, and you can use it with full service and support throughout the contract.",
    faq_q4: "How do I pay for my Seamless Go Subscription Service?",
    faq_a4: "Your monthly payments will be automatically debited from the debit or credit card you registered during sign-up.",
    faq_q5: "Will I own the product after the contract ends?",
    faq_q6: "Where can I see the actual products included in Seamless Go Subscription Service?",
    faq_q7: "What products are available under Seamless Go Subscription Service?",
    faq_a7: "Currently, Seamless Go Subscription Service is available for our Water Purifier series.",
    faq_q8: "Who can sign up for Seamless Go Subscription Service?",
    faq_a8: "Seamless Go Subscription Service is open to individuals and companies who meet the following criteria: minimum age of 18 years, hold a valid ID (KTP or KITAS), and willing to go through a verification process.",
    faq_q9: "What contract durations are available?",
    faq_a9: "You can choose a contract duration of 3, 5, 6, or 7 years, depending on the product.",
    faq_q10: "Is there any upfront fee when signing up?",
    faq_a10: "Yes, a down payment of at least one month's subscription fee is required at the start of your plan.",
    faq_q11: "Can I cancel my contract before it ends?",
    faq_q12: "Where can I sign up for Shamless Go Subscription Service",
    faq_q13: "Where can I read the Seamless Go Subscription Service Terms & Conditions?",
    faq_a13: "You can find the full “Sales Contract Terms & Conditions” and “Service & Warranty Terms” on our official website.",
    footer_get_in_loop: "Get in the Loop",
    footer_desc: "Be the first to know all the best offers, news, and new products from MODENA.",
    footer_tagline: "Crafting Comfort and Convenience",
    privacy_policy: "Privacy Policy",
    cookies_policy: "Cookies Policy",
    terms_conditions: "Terms and Conditions",
    sitemap: "Sitemap",
    country: "Indonesia",
    copyright: "© 2025 MODENA. All rights reserved.",
    lang_label: "Indonesia, EN",
  },
  id: {
    find_store: "Temukan Toko",
    nav_home: "Beranda",
    nav_professional: "Profesional",
    nav_iot: "Seamless IoT",
    nav_energy: "Energi",
    nav_program: "Program",
    nav_support: "Dukungan",
    nav_pay: "Pembayaran",
    smart_lifestyle: "Gaya Hidup Cerdas",
    our_products: "Produk Kami",
    how_to_subscribe: "Cara Berlangganan",
    b2b: "Bisnis",
    faq: "FAQ",
    contact_us: "Hubungi Kami",
    hero_title: "Nikmati Hidup<br>Tanpa Khawatir",
    hero_sub: "Nikmati produk MODENA tanpa biaya di muka melalui layanan Seamless Go Subscription.",
    subscription_title: "Berlangganan Sekarang.<br>Gunakan dengan Bebas.",
    subscription_desc: "Berlangganan cara baru menikmati peralatan rumah tangga bersama Seamless Go Subscription. Tanpa biaya awal, tanpa repot perawatan — cukup gunakan dengan tenang.",
    card1_overlay: "Beragam Paket<br>Tersedia",
    card3_price_line: "Mulai Dari",
    card3_price_price: "Rp.240.000",
    card3_price_month: "/Bulan",
    card4_overlay: "Perawatan Menyeluruh:<br>Dari instalasi hingga perawatan rutin—semua ditangani.",
    discover_title: "Perawatan Menyeluruh<br>Tanpa Biaya Tambahan",
    discover_sub: "Semua layanan yang kamu butuhkan sudah termasuk.<br>Fokus pada hidup, bukan perawatannya.",
    slide1: "Pengecekan Air GRATIS",
    slide2: "4x Pemeriksaan & Pembersihan Umum",
    slide3: "Ganti Filter GRATIS",
    slide3_sub: "(Sesuai Jadwal Penggantian)",
    slide4: "Biaya Perbaikan GRATIS",
    slide5: "Suku Cadang GRATIS",
    slide6: "Diskon 20% untuk Aksesori",
    our_products_label: "PRODUK KAMI",
    purifier_title: "Pilih Produk Sesuai Kebutuhan Rumahmu",
    subscribe_title: "Cara Berlangganan",
    for_business_label: "UNTUK BISNIS",
    for_business_title: "Permudah Operasional Harian dengan Seamless Go Subscription",
    for_business_desc: "Pilihan cerdas untuk bisnis sibuk—lebih sedikit waktu henti, biaya layanan rendah, dan lebih tenang.",
    ready_title: "Siap Mulai?<br>Ayo Berlangganan!",
    subscribe_now: "Langganan Sekarang",
    faq_header: "Pertanyaan yang Sering Diajukan (FAQ)",
    faq_q1: "Apa itu Seamless Go Subscription Service?",
    faq_a1: "Seamless Go adalah program berlangganan yang memungkinkan Anda menggunakan peralatan rumah tangga MODENA dengan biaya bulanan yang lebih terjangkau.",
    faq_q2: "Apa saja yang termasuk dalam paket Seamless Go Subscription Service?",
    faq_a2: "Paket Anda mencakup produk, layanan rutin dan perawatan, serta garansi selama masa kontrak.",
    faq_q3: "Bagaimana cara kerja Seamless Go Subscription Service?",
    faq_a3: "Pilih produk dari katalog kami, tentukan durasi langganan, dan lakukan pembayaran bulanan. Kami akan mengirimkan produk dan menyediakan layanan penuh selama masa kontrak.",
    faq_q4: "Bagaimana cara saya membayar langganan?",
    faq_a4: "Pembayaran bulanan akan didebit otomatis dari kartu debit atau kredit yang Anda daftarkan saat pendaftaran.",
    faq_q5: "Apakah saya akan memiliki produk setelah kontrak berakhir?",
    faq_q6: "Di mana saya bisa melihat produk yang termasuk dalam Seamless Go Subscription Service?",
    faq_a6: "Anda dapat mengunjungi toko resmi atau situs web kami untuk melihat daftar produk lengkap.",
    faq_q7: "Produk apa saja yang tersedia dalam Seamless Go Subscription Service?",
    faq_a7: "Saat ini, Seamless Go Subscription Service tersedia untuk seri Water Purifier kami.",
    faq_q8: "Siapa yang dapat mendaftar untuk Seamless Go Subscription Service?",
    faq_a8: "Seamless Go Subscription Service terbuka untuk individu dan perusahaan yang memenuhi kriteria berikut: berusia minimal 18 tahun, memiliki identitas sah (KTP atau KITAS), dan bersedia menjalani proses verifikasi.",
    faq_q9: "Berapa lama durasi kontrak yang tersedia?",
    faq_a9: "Anda dapat memilih durasi kontrak 3, 5, 6, atau 7 tahun, tergantung pada produk.",
    faq_q10: "Apakah ada biaya awal saat mendaftar?",
    faq_a10: "Ya, diperlukan uang muka minimal sebesar satu kali biaya langganan bulanan di awal perjanjian Anda.",
    faq_q11: "Apakah saya bisa membatalkan kontrak sebelum berakhir?",
    faq_q12: "Di mana saya bisa mendaftar untuk layanan Shamless Go Subscription Service?",
    faq_q13: "Di mana saya dapat membaca Syarat & Ketentuan Seamless Go Subscription Service?",
    faq_a13: "Anda dapat menemukan dokumen lengkap 'Syarat & Ketentuan Kontrak Penjualan' dan 'Syarat Garansi & Layanan' di situs web resmi kami.",
    footer_get_in_loop: "Tetap Terhubung",
    footer_desc: "Jadilah yang pertama tahu tentang promo terbaik, berita, dan produk terbaru dari MODENA.",
    footer_tagline: "Menciptakan Kenyamanan dan Kemudahan",
    privacy_policy: "Kebijakan Privasi",
    cookies_policy: "Kebijakan Cookie",
    terms_conditions: "Syarat dan Ketentuan",
    sitemap: "Peta Situs",
    country: "Indonesia",
    copyright: "© 2025 MODENA. Hak cipta dilindungi.",
    lang_label: "Indonesia, EN",
  },
};

// Ganti bahasa otomatis
const languageSwitcher = document.getElementById("languageSwitcher");
const i18nElements = document.querySelectorAll("[data-i18n]");

function updateLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  i18nElements.forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("language", lang);
}

// Jalankan saat load
const savedLang = localStorage.getItem("language") || "id";
updateLanguage(savedLang);
languageSwitcher.value = savedLang;

// Ganti saat user memilih
languageSwitcher.addEventListener("change", (e) => {
  updateLanguage(e.target.value);
});
