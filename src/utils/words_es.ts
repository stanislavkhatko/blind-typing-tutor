/**
 * Spanish word dictionary for typing practice
 * Sorted by frequency and difficulty
 */
export const words: string[] = [
    // Very common short words (2-4 letters)
    'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'y', 'o',
    'yo', 'tú', 'él', 'ella', 'usted', 'nos', 'vos', 'ellos', 'ellas',
    'que', 'qué', 'por', 'para', 'con', 'sin', 'en', 'a', 'al',
    'no', 'sí', 'muy', 'más', 'menos', 'todo', 'todos', 'bien', 'mal',

    // Common 5-7 letter words
    'ser', 'estar', 'haber', 'tener', 'hacer', 'poder', 'decir', 'ir',
    'ver', 'dar', 'saber', 'querer', 'llegar', 'pasar', 'deber', 'poner',
    'parecer', 'quedar', 'creer', 'hablar', 'llevar', 'dejar', 'seguir',
    'encontrar', 'llamar', 'venir', 'pensar', 'salir', 'volver', 'tomar',

    // Common nouns
    'hombre', 'mujer', 'niño', 'niña', 'persona', 'gente', 'mundo', 'vida',
    'tiempo', 'día', 'año', 'mes', 'semana', 'hora', 'minuto', 'segundo',
    'mano', 'cabeza', 'ojo', 'ojos', 'cara', 'voz', 'cuerpo', 'corazón',
    'cosa', 'forma', 'vez', 'momento', 'punto', 'lugar', 'parte', 'casa',

    // Family
    'padre', 'madre', 'hermano', 'hermana', 'hijo', 'hija', 'amigo', 'amiga',
    'familia', 'padres', 'abuelo', 'abuela', 'tío', 'tía', 'primo', 'prima',

    // Common adjectives
    'bueno', 'buena', 'malo', 'mala', 'grande', 'pequeño', 'pequeña',
    'nuevo', 'nueva', 'viejo', 'vieja', 'joven', 'primero', 'último',
    'mismo', 'otra', 'otro', 'cada', 'mucho', 'poco', 'todo', 'alguno',
    'bonito', 'bonita', 'feo', 'fea', 'largo', 'corto', 'alto', 'bajo',
    'rápido', 'lento', 'fácil', 'difícil', 'importante', 'posible',

    // Numbers
    'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'veinte', 'treinta',
    'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa', 'cien', 'mil',

    // Colors
    'rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco', 'gris', 'rosa',
    'naranja', 'morado', 'violeta', 'marrón', 'café',

    // Time and dates
    'hoy', 'mañana', 'ayer', 'ahora', 'siempre', 'nunca', 'a veces',
    'todavía', 'ya', 'pronto', 'tarde', 'temprano', 'luego', 'después', 'antes',
    'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo',
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre',

    // Common verbs (longer)
    'trabajar', 'jugar', 'aprender', 'enseñar', 'comprar', 'vender',
    'comer', 'beber', 'dormir', 'escuchar', 'mirar', 'entender',
    'explicar', 'empezar', 'terminar', 'abrir', 'cerrar', 'entrar', 'salir',

    // Places
    'ciudad', 'país', 'calle', 'camino', 'plaza', 'puerta', 'ventana',
    'habitación', 'cocina', 'sala', 'escuela', 'iglesia', 'tienda', 'mercado',

    // Technology
    'computadora', 'ordenador', 'internet', 'teléfono', 'móvil', 'celular',
    'correo', 'email', 'sitio', 'programa', 'archivo', 'carpeta', 'pantalla',

    // Nature
    'árbol', 'flor', 'hierba', 'montaña', 'valle', 'río', 'lago', 'mar',
    'sol', 'luna', 'estrella', 'cielo', 'nube', 'lluvia', 'nieve', 'viento',

    // Food and drink
    'pan', 'queso', 'carne', 'pescado', 'verdura', 'fruta', 'manzana', 'pera',
    'agua', 'leche', 'café', 'té', 'vino', 'cerveza', 'jugo', 'zumo',

    // Body parts
    'cabeza', 'pelo', 'cara', 'nariz', 'boca', 'oreja', 'cuello', 'brazo',
    'pierna', 'pie', 'dedo', 'corazón', 'estómago', 'espalda', 'mano',

    // Longer/complex words
    'españa', 'español', 'española', 'inglés', 'alemán', 'francés',
    'italiano', 'portugués', 'ruso', 'chino', 'japonés',
    'universidad', 'biblioteca', 'museo', 'hospital', 'farmacia',
    'restaurante', 'supermercado', 'aeropuerto', 'estación', 'autobús',

    // Words with ñ (important for Spanish typing practice)
    'año', 'niño', 'niña', 'señor', 'señora', 'señorita', 'mañana',
    'español', 'española', 'pequeño', 'pequeña', 'montaña', 'baño',
    'enseñar', 'sueño', 'dueño', 'diseño', 'caña', 'uña', 'peña',

    // Words with accents
    'más', 'está', 'están', 'qué', 'cómo', 'dónde', 'cuándo', 'quién',
    'así', 'aquí', 'allí', 'ahí', 'también', 'después', 'además',
    'café', 'mamá', 'papá', 'sofá', 'José', 'María', 'Jesús',
    'inglés', 'francés', 'alemán', 'japonés', 'portugués',
    'rápido', 'fácil', 'difícil', 'útil', 'móvil', 'débil',

    // Inverted punctuation practice words
    '¿qué?', '¿cómo?', '¿dónde?', '¿cuándo?', '¿quién?', '¿por qué?',
    '¡hola!', '¡adiós!', '¡gracias!', '¡bien!', '¡perfecto!',

    // Common expressions
    'hola', 'adiós', 'buenos días', 'buenas tardes', 'buenas noches',
    'gracias', 'por favor', 'perdón', 'disculpe', 'de nada',
    'mucho', 'poco', 'bastante', 'demasiado', 'nada', 'algo', 'alguien', 'nadie',
];
