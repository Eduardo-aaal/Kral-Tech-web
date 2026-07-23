export interface Doctor {
  id: string;
  nombre: string;
  especialidad: string;
  foto: string;
  color: string;
  descripcion: string;
  calendarId: string;
  duracionCitaMinutos: number;
  intervaloColacion: {
    inicio: string; // HH:mm
    fin: string; // HH:mm
  } | null;
  horariosAtencion: {
    [dia: number]: // 0=domingo, 1=lunes... 6=sábado
    {
      inicio: string; // HH:mm
      fin: string; // HH:mm
    } | null;
  };
}

export interface Tratamiento {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  icono: string;
  doctores: string[]; // doctor IDs
}

export const DOCTORS: Doctor[] = [
  {
    id: "dra-garcia",
    nombre: "DR Eduardo Krebs",
    especialidad: "Odontología General & Estética Dental",
    foto: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    color: "from-primary-400 to-primary-600",
    descripcion: "Especialista en estética dental con 12 años de experiencia.",
    calendarId: "eduardo.krebsmartinez@gmail.com",
    duracionCitaMinutos: 30,
    intervaloColacion: { inicio: "13:00", fin: "14:00" },
    horariosAtencion: {
      0: null,
      1: { inicio: "09:00", fin: "18:00" },
      2: { inicio: "09:00", fin: "18:00" },
      3: { inicio: "09:00", fin: "18:00" },
      4: { inicio: "09:00", fin: "18:00" },
      5: { inicio: "09:00", fin: "17:00" },
      6: { inicio: "10:00", fin: "14:00" },
    },
  },
  {
    id: "dr-martinez",
    nombre: "Dr. Carlos Martínez",
    especialidad: "Ortodoncia & Implantología",
    foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
    color: "from-purple-400 to-purple-600",
    descripcion:
      "Ortodoncista e implantólogo certificado, más de 1,500 implantes realizados.",
    calendarId: "dr.martinez@tudominio.cl",
    duracionCitaMinutos: 45,
    intervaloColacion: { inicio: "13:00", fin: "14:30" },
    horariosAtencion: {
      0: null,
      1: { inicio: "08:30", fin: "17:30" },
      2: { inicio: "08:30", fin: "17:30" },
      3: { inicio: "08:30", fin: "17:30" },
      4: { inicio: "08:30", fin: "17:30" },
      5: { inicio: "08:30", fin: "16:00" },
      6: { inicio: "09:00", fin: "13:00" },
    },
  },
  {
    id: "dra-lopez",
    nombre: "Dra. Andrea López",
    especialidad: "Endodoncia & Odontopediatría",
    foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    color: "from-emerald-400 to-emerald-600",
    descripcion:
      "Endodoncista y odontopediatra, atención especializada para niños y adultos.",
    calendarId: "dra.lopez@tudominio.cl",
    duracionCitaMinutos: 30,
    intervaloColacion: { inicio: "13:00", fin: "14:00" },
    horariosAtencion: {
      0: null,
      1: { inicio: "09:30", fin: "18:30" },
      2: { inicio: "09:30", fin: "18:30" },
      3: { inicio: "09:30", fin: "18:30" },
      4: { inicio: "09:30", fin: "18:30" },
      5: { inicio: "09:30", fin: "17:00" },
      6: null,
    },
  },
  {
    id: "dr-rodriguez",
    nombre: "Dr. Felipe Rodríguez",
    especialidad: "Cirugía Oral & Maxilofacial",
    foto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80",
    color: "from-amber-400 to-amber-600",
    descripcion:
      "Cirujano oral y maxilofacial, especialista en extracciones complejas y cirugía.",
    calendarId: "dr.rodriguez@tudominio.cl",
    duracionCitaMinutos: 60,
    intervaloColacion: { inicio: "12:30", fin: "14:00" },
    horariosAtencion: {
      0: null,
      1: { inicio: "08:00", fin: "16:00" },
      2: { inicio: "08:00", fin: "16:00" },
      3: { inicio: "08:00", fin: "16:00" },
      4: { inicio: "08:00", fin: "16:00" },
      5: { inicio: "08:00", fin: "15:00" },
      6: null,
    },
  },
];

export const TRATAMIENTOS: Tratamiento[] = [
  {
    id: "consulta-general",
    nombre: "Consulta General",
    descripcion:
      "Evaluación completa, diagnóstico y plan de tratamiento personalizado.",
    precio: "Desde $35.000",
    icono: "🩺",
    doctores: ["dra-garcia", "dr-martinez", "dra-lopez"],
  },
  {
    id: "limpieza-dental",
    nombre: "Limpieza Dental",
    descripcion: "Profilaxis profesional, remoción de sarro y pulido dental.",
    precio: "Desde $45.000",
    icono: "✨",
    doctores: ["dra-garcia", "dra-lopez"],
  },
  {
    id: "blanqueamiento",
    nombre: "Blanqueamiento Dental",
    descripcion:
      "Blanqueamiento con técnica avanzada, resultados visibles en 1 sesión.",
    precio: "Desde $120.000",
    icono: "💎",
    doctores: ["dra-garcia"],
  },
  {
    id: "ortodoncia",
    nombre: "Ortodoncia (Brackets)",
    descripcion:
      "Tratamiento de ortodoncia con brackets estéticos o metálicos.",
    precio: "Desde $280.000",
    icono: "🦷",
    doctores: ["dr-martinez"],
  },
  {
    id: "implante",
    nombre: "Implante Dental",
    descripcion:
      "Implante de titanio con corona individual, solución permanente.",
    precio: "Desde $450.000",
    icono: "🦷",
    doctores: ["dr-martinez"],
  },
  {
    id: "endodoncia",
    nombre: "Endodoncia (Conductos)",
    descripcion: "Tratamiento de conductos con microscopio operatorio.",
    precio: "Desde $150.000",
    icono: "🦷",
    doctores: ["dra-lopez"],
  },
  {
    id: "extraccion",
    nombre: "Extracción Dental",
    descripcion: "Extracción simple o compleja con sedación consciente.",
    precio: "Desde $60.000",
    icono: "🦷",
    doctores: ["dr-rodriguez"],
  },
  {
    id: "cirugia",
    nombre: "Cirugía Oral",
    descripcion:
      "Cirugía de terceros molares, quistes o lesiones maxilofaciales.",
    precio: "Desde $200.000",
    icono: "🏥",
    doctores: ["dr-rodriguez"],
  },
  {
    id: "odontopediatria",
    nombre: "Odontopediatría",
    descripcion:
      "Atención dental especializada para niños en un ambiente amigable.",
    precio: "Desde $30.000",
    icono: "👶",
    doctores: ["dra-lopez"],
  },
  {
    id: "resina",
    nombre: "Resinas / Obturaciones",
    descripcion: "Restauración estética del color del diente.",
    precio: "Desde $40.000",
    icono: "🦷",
    doctores: ["dra-garcia", "dra-lopez"],
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return DOCTORS.find((d) => d.id === id);
}

export function getTratamientoById(id: string): Tratamiento | undefined {
  return TRATAMIENTOS.find((t) => t.id === id);
}

export const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
