// =============================================
// BORDEM - Mueblería & Diseño | Main Scripts
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // =============================================
  // 1. PRELOADER
  // =============================================
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1200);
  }

  // =============================================
  // 2. HEADER SCROLL EFFECT
  // =============================================
  const header = document.getElementById("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
  });

  // =============================================
  // 3. MOBILE MENU TOGGLE
  // =============================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // =============================================
  // 4. ACTIVE NAV LINK ON SCROLL
  // =============================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  // =============================================
  // 5. RENDER PRODUCTS
  // =============================================
  const productsGrid = document.querySelector(".products-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderProducts(filter = "all") {
    if (!productsGrid) return;

    const filtered =
      filter === "all"
        ? productsData
        : productsData.filter((p) => p.category === filter);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <i class="fas fa-couch" style="font-size: 3rem; color: var(--color-gray-400); margin-bottom: 20px; display: block;"></i>
          <p style="font-size: 1.1rem; color: var(--color-text-light);">Próximamente nuevos modelos en esta categoría.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered
      .map(
        (product) => `
      <div class="product-card" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <button class="product-wishlist" aria-label="Agregar a favoritos"><i class="far fa-heart"></i></button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.categoryName}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">${product.price}</span>
            <button class="product-btn" onclick="handleInquiry(${product.id})">Consultar</button>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    // Lazy reveal animation for product cards
    document.querySelectorAll(".product-card").forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      setTimeout(
        () => {
          card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        },
        100 + i * 80,
      );
    });
  }

  // Initial render
  renderProducts();

  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });

  // =============================================
  // 6. PRODUCT INQUIRY (WhatsApp)
  // =============================================
  window.handleInquiry = function (productId) {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    const phone = "56900000000";
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto "${product.name}" (${product.categoryName}). Precio: ${product.price}. ¿Podrían darme más información?`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // =============================================
  // 7. STATS COUNTER ANIMATION
  // =============================================
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach((stat) => {
      const target = parseInt(stat.dataset.count);
      if (isNaN(target)) return;

      let current = 0;
      const increment = Math.ceil(target / 60);
      const duration = 2000;
      const stepTime = Math.floor(duration / target);

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        stat.textContent = current;
      }, stepTime);
    });
  }

  // =============================================
  // 8. SCROLL REVEAL ANIMATIONS
  // =============================================
  const revealElements = document.querySelectorAll(
    ".section-header, .about-content, .category-card, .testimonial-card, .stats-grid, .contact-content",
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Check if this is the stats section
        if (entry.target.classList.contains("stats-grid")) {
          animateStats();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  // Also observe individual product cards
  const productObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          productObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  // =============================================
  // 9. SCROLL TO TOP BUTTON
  // =============================================
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // =============================================
  // 10. CONTACT FORM
  // =============================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        interest: document.getElementById("interest").value,
        message: document.getElementById("message").value.trim(),
      };

      if (!formData.name || !formData.email || !formData.message) {
        alert(
          "Por favor completa los campos obligatorios: Nombre, Email y Mensaje.",
        );
        return;
      }

      const phone = "56900000000";
      const whatsappMsg = encodeURIComponent(
        `*Nuevo contacto desde sitio web*%0A%0A` +
          `*Nombre:* ${formData.name}%0A` +
          `*Email:* ${formData.email}%0A` +
          `${formData.phone ? `*Teléfono:* ${formData.phone}%0A` : ""}` +
          `${formData.interest ? `*Interés:* ${formData.interest}%0A` : ""}` +
          `*Mensaje:* ${formData.message}`,
      );

      window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, "_blank");
      contactForm.reset();
    });
  }

  // =============================================
  // 11. NEWSLETTER FORM
  // =============================================
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      if (input && input.value.trim()) {
        alert("¡Gracias por suscribirte! Pronto recibirás nuestras novedades.");
        input.value = "";
      }
    });
  }

  // =============================================
  // 12. WISHLIST BUTTONS (delegated)
  // =============================================
  document.addEventListener("click", (e) => {
    const wishlistBtn = e.target.closest(".product-wishlist");
    if (wishlistBtn) {
      e.preventDefault();
      const icon = wishlistBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("far");
        icon.classList.toggle("fas");
        if (icon.classList.contains("fas")) {
          icon.style.color = "#ff4444";
        } else {
          icon.style.color = "";
        }
      }
    }
  });

  // =============================================
  // 13. SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // =============================================
  // 14. KEYBOARD SUPPORT - ESC to close mobile menu
  // =============================================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  console.log("Bordem - Sitio web cargado correctamente");
});
