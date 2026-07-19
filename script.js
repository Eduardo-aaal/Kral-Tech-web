// ===== Número de WhatsApp (formato internacional sin + ni espacios) =====
var WHATSAPP_NUMBER = "56972251219";

// ===== Abrir WhatsApp con mensaje personalizado =====
function openWhatsApp(message) {
  var text = encodeURIComponent(
    message || "Hola Kral Tech Solutions, quiero más información.",
  );
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  window.open(url, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", function () {
  // Todos los botones/enlaces con data-wa abren WhatsApp
  var waButtons = document.querySelectorAll("[data-wa]");
  waButtons.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openWhatsApp(el.getAttribute("data-wa"));
    });
  });

  // ===== Menú móvil =====
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ===== FAQ acordeón =====
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Cerrar todos
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other
          .querySelector(".faq-question")
          .setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ===== Año dinámico en footer =====
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
