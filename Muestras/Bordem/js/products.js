// Product data for Bordem Furniture Catalog
const productsData = [
  // ---- SALA DE ESTAR ----
  {
    id: 1,
    name: "Sofá Milano",
    category: "sala",
    categoryName: "Sala de Estar",
    price: "$1,290,000",
    description:
      "Sofá de tres plazas en tela premium con estructura de madera maciza y cojines de espuma de alta densidad.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    badge: "Más vendido",
  },
  {
    id: 2,
    name: "Sillón Nordico",
    category: "sala",
    categoryName: "Sala de Estar",
    price: "$680,000",
    description:
      "Sillón individual de diseño escandinavo con tapizado en lino y patas de roble natural.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80",
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Mesa de Centro Atacama",
    category: "sala",
    categoryName: "Sala de Estar",
    price: "$450,000",
    description:
      "Mesa de centro en madera de nogal macizo con acabado natural y almacenamiento integrado.",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80",
    badge: null,
  },
  {
    id: 4,
    name: "Estantería Modular Flow",
    category: "sala",
    categoryName: "Sala de Estar",
    price: "$890,000",
    description:
      "Sistema modular de estanterías en melamina blanca y madera. Configurable según tu espacio.",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80",
    badge: null,
  },

  // ---- COMEDOR ----
  {
    id: 5,
    name: "Mesa Comedor Terranova",
    category: "comedor",
    categoryName: "Comedor",
    price: "$1,450,000",
    description:
      "Mesa para 8 personas en madera de acacia maciza con base de hierro forjado.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80",
    badge: "Oferta especial",
  },
  {
    id: 6,
    name: "Silla Comedor Eames",
    category: "comedor",
    categoryName: "Comedor",
    price: "$320,000",
    description:
      "Silla de comedor apilable con asiento de madera curvada y estructura metálica.",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80",
    badge: null,
  },
  {
    id: 7,
    name: "Vitrina Cristalina",
    category: "comedor",
    categoryName: "Comedor",
    price: "$980,000",
    description:
      "Vitrina exhibidora con puertas de vidrio templado e iluminación LED integrada.",
    image:
      "https://images.unsplash.com/photo-1597006335777-25b6fc72e6c5?w=500&q=80",
    badge: null,
  },

  // ---- DORMITORIO ----
  {
    id: 8,
    name: "Cama King Zen",
    category: "dormitorio",
    categoryName: "Dormitorio",
    price: "$2,100,000",
    description:
      "Cama king size con cabecero tapizado en terciopelo y base con sistema de almacenamiento.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
    badge: "Premium",
  },
  {
    id: 9,
    name: "Velador Nórdico",
    category: "dormitorio",
    categoryName: "Dormitorio",
    price: "$280,000",
    description:
      "Velador de noche con cajón en madera de pino lacado y patas cónicas.",
    image:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500&q=80",
    badge: null,
  },
  {
    id: 10,
    name: "Closet Empotrado Moda",
    category: "dormitorio",
    categoryName: "Dormitorio",
    price: "$1,800,000",
    description:
      "Closet modular con puertas corredizas, organizadores y sistema de iluminación.",
    image:
      "https://images.unsplash.com/photo-1597006335777-25b6fc72e6c5?w=500&q=80",
    badge: "Más vendido",
  },

  // ---- OFICINA ----
  {
    id: 11,
    name: "Escritorio Ejecutivo Roble",
    category: "oficina",
    categoryName: "Oficina",
    price: "$1,150,000",
    description:
      "Escritorio en roble macizo con cajonera integrada y pasacables oculto.",
    image:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&q=80",
    badge: null,
  },
  {
    id: 12,
    name: "Silla Ergonómica Pro",
    category: "oficina",
    categoryName: "Oficina",
    price: "$650,000",
    description:
      "Silla de oficina ergonómica con soporte lumbar ajustable y reposabrazos 3D.",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
    badge: "Recomendado",
  },
  {
    id: 13,
    name: "Estantería Bibliotecaria",
    category: "oficina",
    categoryName: "Oficina",
    price: "$750,000",
    description:
      "Estantería alta de 5 niveles en melamina color wengue con respaldo cerrado.",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80",
    badge: null,
  },

  // ---- EXTERIOR ----
  {
    id: 14,
    name: "Juego de Terraza Bali",
    category: "exterior",
    categoryName: "Exterior & Jardín",
    price: "$1,600,000",
    description:
      "Set de 2 sillones + mesa ratán sintético con cojines impermeables y resistentes UV.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    badge: null,
  },
  {
    id: 15,
    name: "Tumbona Relax Playa",
    category: "exterior",
    categoryName: "Exterior & Jardín",
    price: "$420,000",
    description:
      "Tumbona reclinable en teca con lona textilene ajustable y reposapiés integrado.",
    image:
      "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=500&q=80",
    badge: "Nuevo",
  },
  {
    id: 16,
    name: "Mesa de Jardín rústica",
    category: "exterior",
    categoryName: "Exterior & Jardín",
    price: "$550,000",
    description:
      "Mesa redonda para exterior en madera de pino tratada con barniz marino.",
    image:
      "https://images.unsplash.com/photo-1591768793355-2740f7fc6df9?w=500&q=80",
    badge: null,
  },
];
