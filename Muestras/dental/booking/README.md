# 🦷 Clínica Dental Care - Sistema de Agendamiento Online

Sistema completo de agendamiento de horas para clínica dental con integración a Google Calendar. Construido con Next.js 14 (App Router), TypeScript y Tailwind CSS.

## ✅ Pasos Completados (Tú ya hiciste esto)

### 1. Node.js Instalado ✅

Node.js está instalado en tu sistema.

### 2. Dependencias Instaladas ✅

```bash
cd Muestras/dental/booking
npm install
```

Esto ya se ejecutó y se creó la carpeta `node_modules`.

### 3. Google Cloud Service Account Creada ✅

Tienes el archivo `project-c18b2c67-8742-45ca-b1f-f3fb9e43e915.json` en la carpeta `Muestras/dental/`.

### 4. Variables de Entorno Configuradas ✅

El archivo `.env.local` ya tiene las credenciales reales de tu Service Account.

---

## ⚠️ PASO 5 (CRÍTICO) - Compartir tus Calendarios de Google con el Bot

Este es el paso más importante. Debes darle permiso al "bot" de Google para que pueda leer y escribir eventos en los calendarios de tus doctores.

### ¿Qué email usar?

El email del bot es:

```
dental-booking-bot@project-c18b2c67-8742-45ca-b1f.iam.gserviceaccount.com
```

### ¿Qué calendarios compartir?

En el archivo `lib/doctors.ts` hay 4 doctores configurados. Cada uno tiene un `calendarId`. **Debes reemplazar esos calendarId con los correos de los calendarios reales de tus doctores**, y luego compartir cada calendario con el bot.

### Instrucciones paso a paso:

1. **Abre Google Calendar** en tu navegador (calendar.google.com)

2. **Para CADA doctor**, busca el calendario en la barra lateral izquierda:
   - Si el doctor ya tiene un calendario, haz clic en los 3 puntos (⋮) al lado del nombre → "Configuración y uso compartido"
   - Si NO existe, crea un calendario nuevo: haz clic en el "+" al lado de "Otros calendarios" → "Crear nuevo calendario" → pon el nombre del doctor

3. **Comparte el calendario con el bot:**
   - En "Compartir con personas específicas", haz clic en "Añadir personas"
   - Pega este email: `dental-booking-bot@project-c18b2c67-8742-45ca-b1f.iam.gserviceaccount.com`
   - En permisos, selecciona **"Hacer cambios en los eventos"**
   - Haz clic en "Enviar"

4. **Repite** para cada doctor (Dra. García, Dr. Martínez, Dra. López, Dr. Rodríguez)

5. **Actualiza el archivo `lib/doctors.ts`**:
   - Abre el archivo `Muestras/dental/booking/lib/doctors.ts`
   - Busca la línea `calendarId: "dra.garcia@tudominio.cl"` (línea 40)
   - Cámbiala por el correo del calendario REAL de la doctora (ej: `calendarId: "mariagarcia@gmail.com"`)
   - Haz lo mismo con los otros 3 doctores (líneas 62, 82, 102)

---

## 🚀 PASO 6 - Ejecutar el Proyecto

Una vez que hayas compartido los calendarios, ejecuta:

```bash
cd Muestras/dental/booking
npm run dev
```

Esto iniciará el servidor en **http://localhost:3000**

### Rutas del sistema:

| Ruta                                      | Descripción                                     |
| ----------------------------------------- | ----------------------------------------------- |
| **http://localhost:3000**                 | Página pública de agendamiento (para pacientes) |
| **http://localhost:3000/admin/login**     | Login del panel administrativo                  |
| **http://localhost:3000/admin/dashboard** | Dashboard de administración                     |

### Credenciales del Admin:

- **Clave:** `admin123` (configurable en `.env.local`)

---

## 📋 Estructura del Proyecto

```
booking/
├── app/
│   ├── api/
│   │   ├── disponibilidad/route.ts    # GET - Horas disponibles
│   │   ├── agendar/route.ts           # POST - Crear cita
│   │   └── admin/
│   │       ├── citas/route.ts         # GET - Listar citas del día
│   │       ├── cancelar/route.ts      # POST - Cancelar cita
│   │       ├── reagendar/route.ts     # POST - Reagendar cita
│   │       └── bloquear/route.ts      # POST - Bloquear horario
│   ├── admin/
│   │   ├── login/page.tsx             # Login administrativo
│   │   └── dashboard/page.tsx         # Panel de administración
│   ├── layout.tsx
│   ├── page.tsx                       # Página principal de agendamiento
│   └── globals.css
├── components/
│   ├── StepIndicator.tsx              # Indicador de progreso
│   ├── StepDoctor.tsx                 # Paso 1: Selección doctor/tratamiento
│   ├── StepDateTime.tsx               # Paso 2: Selección fecha/hora
│   ├── StepPatient.tsx                # Paso 3: Datos del paciente
│   ├── StepConfirm.tsx                # Paso 4: Confirmación
│   └── StepSuccess.tsx                # Confirmación exitosa
├── lib/
│   ├── doctors.ts                     # Configuración de doctores y tratamientos
│   └── google-calendar.ts             # Integración con Google Calendar API
├── .env.local                         # Variables de entorno (YA CONFIGURADO)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🔧 Funcionalidades

### Para Pacientes (Público)

- **Paso 1:** Selección visual de doctor y tratamiento
- **Paso 2:** Calendario interactivo con selección de fecha y hora
- **Paso 3:** Formulario con validación de datos (RUT chileno, email, teléfono)
- **Paso 4:** Resumen y confirmación de la cita

### Para Administración (Protegido)

- **Login** con clave secreta configurable
- **Vista diaria** de todas las citas de todos los doctores
- **Filtro por doctor** para ver agenda individual
- **Estadísticas** del día (total citas, doctores, pacientes)
- **Cancelar citas** con un clic
- **Bloquear horarios** manualmente (reuniones, emergencias, etc.)
- **Llamar paciente** con enlace directo al teléfono

## 🎨 Diseño

- **Tema:** Azules médicos (#00b4d8, #0096c7) con blancos y grises suaves
- **Responsive:** Mobile-first, optimizado para celulares
- **Componentes:** Tarjetas con sombras suaves, bordes redondeados
- **Estados:** Loading spinners, estados vacíos, mensajes de error
