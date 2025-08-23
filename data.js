const workers = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    photo: "worker1.png",
    category: "Plomería",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Centro"
    },
    description: "Plomero matriculado con 15 años de experiencia en Córdoba Capital. Ofrezco servicios de reparación de fugas, instalaciones de grifería, destapes y emergencias 24/7. Trabajo rápido y garantizado.",
    phone: "5493512345678",
    rating: 4.8,
    reviews: 45,
    isAnonymous: true
  },
  {
    id: 2,
    name: "Lucía Fernández",
    photo: "worker2.png",
    category: "Electricidad",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Nueva Córdoba"
    },
    description: "Electricista certificada. Realizo instalaciones eléctricas completas, reparación de cortocircuitos, cambio de tableros y colocación de luminarias en toda la ciudad de Córdoba. Priorizo la seguridad y la prolijidad.",
    phone: "5493519876543",
    rating: 4.9,
    reviews: 62,
    isAnonymous: true
  },
  {
    id: 3,
    name: "Miguel Torres",
    photo: "worker3.png",
    category: "Jardinería",
    location: {
      city: "Villa Carlos Paz",
      province: "Córdoba"
    },
    description: "Amante de la naturaleza. Ofrezco mantenimiento de jardines, corte de césped, poda de árboles y diseño de espacios verdes en Villa Carlos Paz y alrededores. Presupuestos sin cargo.",
    phone: "54935415554433",
    rating: 4.7,
    reviews: 38
  },
  {
    id: 4,
    name: "Ana Gutierrez",
    photo: "worker4.png",
    category: "Pintura",
    location: {
      city: "Río Cuarto",
      province: "Córdoba"
    },
    description: "Pintora profesional con ojo para el detalle. Realizo trabajos de pintura interior y exterior, preparación de superficies y empapelados en Río Cuarto. Acabados impecables.",
    phone: "5493588887766",
    rating: 5.0,
    reviews: 51
  },
  {
    id: 5,
    name: "Javier Sosa",
    photo: "worker5.png",
    category: "Gasista",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Alta Córdoba"
    },
    description: "Gasista matriculado en Córdoba. Instalación y reparación de calefones, termotanques, cocinas y estufas. Pruebas de hermeticidad y trámites. La seguridad de tu hogar es mi prioridad.",
    phone: "5493511122334",
    rating: 4.9,
    reviews: 75,
    isAnonymous: true
  },
  {
    id: 6,
    name: "Mariana Paz",
    photo: "worker6.png",
    category: "Limpieza",
    location: {
      city: "Villa Carlos Paz",
      province: "Córdoba"
    },
    description: "Servicio de limpieza profunda para casas y complejos en Villa Carlos Paz. Cuento con equipo propio y productos de primera calidad. Planes de temporada y limpieza por única vez.",
    phone: "54935413344556",
    rating: 4.8,
    reviews: 40
  },
  {
    id: 7,
    name: "Martín Herrera",
    photo: "worker7.png",
    category: "Arreglos de computadoras",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "General Paz"
    },
    description: "Técnico PC con más de 10 años de experiencia. Reparación de notebooks y PC de escritorio, eliminación de virus, instalación de software y hardware, armado de equipos a medida. Servicio a domicilio en Córdoba Capital.",
    phone: "5493516677889",
    rating: 4.9,
    reviews: 82,
    isAnonymous: true
  },
  {
    id: 8,
    name: "",
    photo: "worker8.png",
    category: "Arreglos de heladera",
    location: {
      city: "Córdoba",
      province: "Córdoba"
    },
    description: "Técnico especializado en refrigeración. Reparación de heladeras familiares y comerciales, freezers y exhibidoras. Carga de gas, cambio de motor y repuestos originales. Garantía en todos los trabajos.",
    phone: "5493584455667",
    rating: 4.7,
    reviews: 35
  },
  {
    id: 9,
    name: "Sofia Beltrán",
    photo: "worker9.png",
    category: "Carpintería",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Cerro de las Rosas"
    },
    description: "Carpintería artesanal y a medida. Diseño y fabricación de muebles, placares, vestidores y amoblamientos de cocina. Restauración de muebles antiguos. Presupuestos personalizados.",
    phone: "5493519988776",
    rating: 5.0,
    reviews: 60,
    isAnonymous: true
  },
  {
    id: 10,
    name: "Esteban Rojas",
    photo: "worker10.png",
    category: "Mecánica",
    location: {
      city: "Villa Carlos Paz",
      province: "Córdoba"
    },
    description: "Mecánico integral. Servicio de mantenimiento programado, frenos, tren delantero, distribución y diagnóstico computarizado. Atención multimarca. Taller ubicado en el centro de Carlos Paz.",
    phone: "5493541223344",
    rating: 4.8,
    reviews: 55
  },
  {
    id: 11,
    name: "Fernando Diaz",
    photo: "worker11.png",
    category: "Herrería",
    location: {
      city: "Río Cuarto",
      province: "Córdoba"
    },
    description: "Herrería de obra y artística. Fabricación de rejas, portones, escaleras y estructuras metálicas. Trabajos de soldadura en general. Calidad y durabilidad garantizadas.",
    phone: "5493581122334",
    rating: 4.9,
    reviews: 48
  },
  {
    id: 12,
    name: "Valeria Ponce",
    photo: "worker14.png",
    category: "Arreglos de lavarropa",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Alberdi"
    },
    description: "Técnica en reparación de lavarropas automáticos y semiautomáticos. Todas las marcas. Cambio de rodamientos, bombas de agua y plaquetas electrónicas. Servicio a domicilio.",
    phone: "5493513344557",
    rating: 4.8,
    reviews: 41,
    isAnonymous: true
  },
  {
    id: 13,
    name: "Roberto Gomez",
    photo: "/worker12.png",
    category: "Cerrajería",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Centro"
    },
    description: "Cerrajero de urgencia disponible las 24 horas en Córdoba Capital. Apertura de puertas, cambio de cerraduras, copias de llaves. Llego en minutos. Servicio confiable y rápido.",
    phone: "5493514455668",
    rating: 4.9,
    reviews: 53,
    isAnonymous: true
  },
  {
    id: 14,
    name: "Laura Nuñez",
    photo: "worker13.png",
    category: "Arreglos de celulares",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      neighborhood: "Nueva Córdoba"
    },
    description: "Técnica especializada en reparación de celulares y tablets. Cambio de pantallas, baterías, pines de carga y reparación de placas. Presupuestos sin cargo en el acto. Local en Nueva Córdoba.",
    phone: "5493515566779",
    rating: 4.9,
    reviews: 91,
    isAnonymous: true
  }
];