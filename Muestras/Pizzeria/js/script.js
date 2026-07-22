(function () {
  "use strict";

  // ===================== MENU DATA =====================
  const menuData = {
    pizzas: [
      {
        id: "p1",
        name: "Pizza Margherita",
        desc: "Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva.",
        price: 8900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      },
      {
        id: "p2",
        name: "Pizza Pepperoni",
        desc: "Salsa de tomate, mozzarella y pepperoni clásico.",
        price: 9900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      },
      {
        id: "p3",
        name: "Pizza Napolitana",
        desc: "Salsa de tomate, mozzarella, anchoas, alcaparras y aceitunas.",
        price: 10900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      },
      {
        id: "p4",
        name: "Pizza Cuatro Quesos",
        desc: "Mozzarella, gorgonzola, parmesano y queso de cabra.",
        price: 11900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      },
      {
        id: "p5",
        name: "Pizza Jamón & Champiñones",
        desc: "Salsa de tomate, mozzarella, jamón y champiñones salteados.",
        price: 10900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=400&h=300&fit=crop",
      },
      {
        id: "p6",
        name: "Pizza Hawaiana",
        desc: "Salsa de tomate, mozzarella, jamón y piña caramelizada.",
        price: 9900,
        category: "pizzas",
        img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop",
      },
    ],
    especiales: [
      {
        id: "e1",
        name: "Pizza Da Mangiare",
        desc: "Nuestra especialidad: salsa de tomate, mozzarella, pepperoni, champiñones, pimientos y cebolla caramelizada.",
        price: 13900,
        category: "especiales",
        img: "https://images.unsplash.com/photo-1552539618-7eec9b4d3886?w=400&h=300&fit=crop",
      },
      {
        id: "e2",
        name: "Pizza BBQ Pulled Pork",
        desc: "Base BBQ, cerdo desmenuzado, mozzarella, cebolla morada y cilantro fresco.",
        price: 14900,
        category: "especiales",
        img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
      },
      {
        id: "e3",
        name: "Pizza Caprese",
        desc: "Mozzarella fresca, tomates cherry, albahaca, pesto y reducción balsámica.",
        price: 12900,
        category: "especiales",
        img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop",
      },
      {
        id: "e4",
        name: "Pizza Trufa & Champiñones",
        desc: "Crema de trufa, mozzarella, champiñones portobello, parmesano y rúcula.",
        price: 15900,
        category: "especiales",
        img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      },
      {
        id: "e5",
        name: "Pizza Calzone",
        desc: "Pizza rellena de mozzarella, ricotta, jamón y espinacas, horneada a la perfección.",
        price: 11900,
        category: "especiales",
        img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
      },
    ],
    bebidas: [
      {
        id: "b1",
        name: "Coca-Cola (lata)",
        desc: "Bebida gaseosa 355 ml.",
        price: 1500,
        category: "bebidas",
        img: "",
      },
      {
        id: "b2",
        name: "Sprite (lata)",
        desc: "Bebida gaseosa 355 ml.",
        price: 1500,
        category: "bebidas",
        img: "",
      },
      {
        id: "b3",
        name: "Fanta (lata)",
        desc: "Bebida gaseosa 355 ml.",
        price: 1500,
        category: "bebidas",
        img: "",
      },
      {
        id: "b4",
        name: "Agua Mineral Sin Gas",
        desc: "Agua mineral 500 ml.",
        price: 1200,
        category: "bebidas",
        img: "",
      },
      {
        id: "b5",
        name: "Agua Mineral Con Gas",
        desc: "Agua mineral 500 ml.",
        price: 1200,
        category: "bebidas",
        img: "",
      },
      {
        id: "b6",
        name: "Jugo Natural",
        desc: "Jugo natural de naranja o frambuesa 400 ml.",
        price: 2500,
        category: "bebidas",
        img: "",
      },
      {
        id: "b7",
        name: "Cerveza Artesanal",
        desc: "Cerveza artesanal local 500 ml.",
        price: 4500,
        category: "bebidas",
        img: "",
      },
    ],
  };

  const allItems = [
    ...menuData.pizzas,
    ...menuData.especiales,
    ...menuData.bebidas,
  ];

  // ===================== STATE =====================
  let cart = JSON.parse(localStorage.getItem("dmCart")) || [];
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartFloat = document.getElementById("cartFloat");
  const cartClose = document.getElementById("cartClose");
  const cartItems = document.getElementById("cartItems");
  const cartCountFloat = document.getElementById("cartCountFloat");
  const cartTotal = document.getElementById("cartTotal");
  const whatsappOrder = document.getElementById("whatsappOrder");
  const menuGrid = document.getElementById("menuGrid");
  const menuTabs = document.getElementById("menuTabs");
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  // ===================== RENDER MENU =====================
  function renderMenu(category = "all") {
    menuGrid.innerHTML = "";

    let itemsToShow;
    if (category === "all") {
      itemsToShow = [
        { label: "Pizzas Clásicas", items: menuData.pizzas },
        { label: "Pizzas Especiales", items: menuData.especiales },
        { label: "Bebidas", items: menuData.bebidas },
      ];
    } else {
      itemsToShow = [
        {
          label: getCategoryTitle(category),
          items: allItems.filter((i) => i.category === category),
        },
      ];
    }

    itemsToShow.forEach((group) => {
      if (group.items.length === 0) return;
      const title = document.createElement("h3");
      title.className = "menu-category-title";
      title.textContent = group.label;
      menuGrid.appendChild(title);

      group.items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "menu-item fade-in";

        const hasImg = item.img && item.img.length > 0;
        const imgHtml = hasImg
          ? `<img class="menu-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />`
          : `<div class="menu-item-img-placeholder"><i class="fas fa-wine-bottle"></i></div>`;

        div.innerHTML = `
          ${imgHtml}
          <div class="menu-item-body">
            <div class="menu-item-header">
              <h4>${item.name}</h4>
              <span class="price">$${item.price.toLocaleString("es-CL")}</span>
            </div>
            <p class="desc">${item.desc}</p>
            <button class="add-btn" data-id="${item.id}">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        `;
        menuGrid.appendChild(div);

        // Trigger fade-in
        requestAnimationFrame(() => {
          div.classList.add("visible");
        });

        const addBtn = div.querySelector(".add-btn");
        addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(item);
        });
      });
    });
  }

  function getCategoryTitle(cat) {
    const map = {
      pizzas: "Pizzas",
      especiales: "Especiales",
      bebidas: "Bebidas",
    };
    return map[cat] || cat;
  }

  // ===================== CART =====================
  function addToCart(item) {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    updateCart();
    showToast(`${item.name} agregado al carrito`);
    // badge bounce
    cartCountFloat.classList.add("bounce");
    setTimeout(() => cartCountFloat.classList.remove("bounce"), 400);
  }

  function removeFromCart(id) {
    cart = cart.filter((i) => i.id !== id);
    updateCart();
  }

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      updateCart();
    }
  }

  function updateCart() {
    localStorage.setItem("dmCart", JSON.stringify(cart));
    renderCart();
    renderCartBadge();
    updateWhatsappButton();
  }

  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-pizza-slice"></i>
          <p>Tu carrito está vacío</p>
          <p style="font-size:0.85rem; color:#aaa;">Agrega productos del menú</p>
        </div>
      `;
      cartTotal.textContent = "$0";
      return;
    }

    let html = "";
    let total = 0;
    cart.forEach((item) => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <span class="cart-item-price">$${item.price.toLocaleString("es-CL")} c/u</span>
          </div>
          <div class="cart-item-qty">
            <button onclick="window._changeQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="window._changeQty('${item.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="window._removeFromCart('${item.id}')" aria-label="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = `$${total.toLocaleString("es-CL")}`;
  }

  function renderCartBadge() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCountFloat.textContent = count;
  }

  function updateWhatsappButton() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    whatsappOrder.disabled = count === 0;
  }

  // ===================== WHATSAPP ORDER =====================
  function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    const phone = "56900000000";
    let msg = "🍕 *Nuevo Pedido - Pizzería Artesanal* 🍕\n\n";
    let total = 0;

    cart.forEach((item) => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      msg += `• ${item.qty}x ${item.name} - $${subtotal.toLocaleString("es-CL")}\n`;
    });

    msg += `\n─────────────────\n`;
    msg += `*Total: $${total.toLocaleString("es-CL")}*\n\n`;
    msg += `📍 *Retiro en local:* Calle Ejemplo #456, Ciudad de Muestra\n`;
    msg += `⏰ Estaremos esperando tu pedido 🙌`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // Expose for inline onclick
  window._changeQty = changeQty;
  window._removeFromCart = removeFromCart;

  // ===================== TOAST =====================
  let toastTimer;

  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // ===================== CART SIDEBAR CONTROLS =====================
  function openCart() {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  cartFloat.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // ===================== MENU TABS =====================
  menuTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".menu-tab");
    if (!tab) return;
    menuTabs
      .querySelectorAll(".menu-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.category);
  });

  // ===================== MOBILE NAV =====================
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const header = document.getElementById("header");

  navToggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    const icon = navToggle.querySelector("i");
    if (header.classList.contains("nav-open")) {
      icon.className = "fas fa-times";
    } else {
      icon.className = "fas fa-bars";
    }
  });

  // Close nav when clicking a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.querySelector("i").className = "fas fa-bars";
    });
  });

  // ===================== HORARIO HOY =====================
  function updateHoursToday() {
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const now = new Date();
    const dayName = days[now.getDay()];
    const hours = {
      lunes: "11:30 a.m. – 11:30 p.m.",
      martes: "11:30 a.m. – 11:30 p.m.",
      miércoles: "11:30 a.m. – 11:30 p.m.",
      jueves: "11:30 a.m. – 11:30 p.m.",
      viernes: "11:30 a.m. – 11:30 p.m.",
      sábado: "11:30 a.m. – 11:30 p.m.",
      domingo: "12:00 p.m. – 9:30 p.m.",
    };
    const el = document.getElementById("hoursToday");
    el.textContent = `Hoy (${dayName.charAt(0).toUpperCase() + dayName.slice(1)}): ${hours[dayName]}`;
  }
  updateHoursToday();

  // ===================== SCROLL ANIMATIONS (Intersection Observer) =====================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Also observe items added dynamically
  const menuObserver = new MutationObserver(() => {
    document
      .querySelectorAll(".menu-item.fade-in:not(.visible)")
      .forEach((el) => {
        observer.observe(el);
      });
  });
  menuObserver.observe(menuGrid, { childList: true, subtree: true });

  // ===================== HEADER SCROLL EFFECT =====================
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===================== INIT =====================
  renderMenu("all");
  updateCart();

  // Pre-open cart if URL has #carrito
  if (window.location.hash === "#carrito") {
    setTimeout(openCart, 300);
  }

  // Bind WhatsApp order button
  whatsappOrder.addEventListener("click", sendWhatsAppOrder);

  // Keyboard: Escape closes cart
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
      closeCart();
    }
  });

  console.log("🍕 Da Mangiare Pizza — Web lista!");
})();
