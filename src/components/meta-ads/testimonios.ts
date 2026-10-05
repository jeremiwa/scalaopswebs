/**
 * Testimonios de texto de /meta-ads.
 * ⚠️ TODO: los 3 son DE EJEMPLO (placeholder:true). Reemplazar a mano por testimonios reales
 * antes de indexar o pautar. No usar nombres de empresas reales. Foto = avatar con iniciales.
 */
export interface Testimonio {
  nombre: string;
  cargo: string;
  empresa: string;
  rubro: string;
  ciudad: string;
  foto: string | null; // null → avatar con iniciales
  texto: string;
  placeholder: boolean;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    // TODO: reemplazar por testimonio real
    nombre: 'Martín R.',
    cargo: 'Director comercial',
    empresa: 'Fábrica de aberturas de aluminio',
    rubro: 'Industria',
    ciudad: 'Buenos Aires',
    foto: null,
    texto:
      'Hacía dos años que invertíamos en publicidad y entraban consultas, pero no vendíamos. SCALA cambió los anuncios y, sobre todo, lo que pasaba después: hoy cada consulta se responde en el momento y a mí me llegan las reuniones agendadas.',
    placeholder: true,
  },
  {
    // TODO: reemplazar por testimonio real
    nombre: 'Lucía G.',
    cargo: 'Socia',
    empresa: 'Inmobiliaria',
    rubro: 'Real estate',
    ciudad: 'Córdoba',
    foto: null,
    texto:
      'Lo que más me cambió no fueron los números, fue dejar de ser la que contesta WhatsApp a las once de la noche. Ahora lo hace la empresa. Y cada mañana sé exactamente qué entró y qué se agendó.',
    placeholder: true,
  },
  {
    // TODO: reemplazar por testimonio real
    nombre: 'Diego F.',
    cargo: 'Gerente',
    empresa: 'Concesionaria',
    rubro: 'Automotriz',
    ciudad: 'Rosario',
    foto: null,
    texto:
      'Probamos agencias que nos traían likes. Acá el foco fue otro: qué decir, a quién y qué pasa con cada lead. El equipo dejó de perseguir mensajes y se dedica a cerrar.',
    placeholder: true,
  },
];
