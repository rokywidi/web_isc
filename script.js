document.addEventListener("DOMContentLoaded", function () {
  const fadeTexts = document.querySelectorAll(".fade-in-text");

  const options = {
    threshold: 0.5, // Elemen dianggap muncul ketika 50% terlihat
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target); // Hentikan pengamatan setelah animasi
      }
    });
  }, options);

  fadeTexts.forEach((el) => observer.observe(el));

  // Toggle hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("nav-active");
    // Opsional: animasi hamburger (misal, mengubah bentuk bar)
    hamburger.classList.toggle("toggle");
  });

  // Smooth scroll untuk navigasi (meskipun properti CSS scroll-behavior sudah aktif)
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      // Tutup menu mobile jika terbuka
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");
        hamburger.classList.remove("toggle");
      }
    });
  });

  // Lightbox modal untuk galeri
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const galleryImages = document.querySelectorAll(".gallery-img");
  const closeModal = document.querySelector(".close");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.textContent = this.alt;
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Tutup modal jika area di luar gambar diklik
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
