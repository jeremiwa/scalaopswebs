/**
 * Testimonios de texto de /meta-ads.
 * Martín S. y Laura G. son REALES (texto + foto tomados de /por-que-scala).
 * Diego F. es DE EJEMPLO (placeholder:true) → TODO: reemplazar por real.
 */
export interface Testimonio {
  nombre: string;
  rol: string; // "Cargo · Sector"
  ciudad?: string;
  foto: string | null; // null → avatar con iniciales
  texto: string;
  placeholder: boolean;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: 'Martín S.',
    rol: 'Director Comercial · Real Estate',
    foto: '/images/martin.jpg',
    texto:
      'La auditoría fue un antes y un después. Nos mostró fallas reales en cómo vendíamos: objeciones mal trabajadas, poco seguimiento y un equipo sin un proceso claro. Scala nos cambió el negocio.',
    placeholder: false,
  },
  {
    nombre: 'Laura G.',
    rol: 'CEO · Agencia B2B',
    foto: '/images/laura.jpg',
    texto:
      'Implementamos IA en toda la empresa, la velocidad y profesionalismo 10 puntos. No solo los recomiendo, es casi una obligación si tenés un negocio y no tenés IA.',
    placeholder: false,
  },
  {
    // TODO: reemplazar por testimonio real
    nombre: 'Diego F.',
    rol: 'Gerente · Concesionaria',
    ciudad: 'Rosario',
    foto: null,
    texto:
      'Probamos agencias que nos traían likes. Acá el foco fue otro: qué decir, a quién y qué pasa con cada lead. El equipo dejó de perseguir mensajes y se dedica a cerrar.',
    placeholder: true,
  },
];
