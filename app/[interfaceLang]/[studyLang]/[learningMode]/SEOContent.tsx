import { translations } from "@/translations";
import type { InterfaceLanguage } from "@/translations";
import type { ContentType } from "@/utils/url";

interface SEOContentProps {
  interfaceLang: string;
  studyLang: string;
  learningMode: ContentType;
}

// SEO content templates for different modes
const seoContent = {
  words: {
    en: {
      heading: "Practice Touch Typing with Individual Words",
      intro:
        "Master the fundamentals of touch typing by practicing individual words. This mode is perfect for beginners who want to build muscle memory for common letter combinations and improve finger placement accuracy. Focus on typing single words correctly before progressing to more complex phrases and sentences.",
      about:
        "Word-based typing practice helps you concentrate on proper finger positioning without the complexity of sentence structure. By repeatedly typing common words, you develop automatic responses to letter patterns, which is essential for achieving higher typing speeds. Our word practice mode presents carefully selected vocabulary that covers all keys on the keyboard, ensuring balanced practice across all fingers.",
      benefits:
        "Practicing with individual words allows you to focus entirely on technique and accuracy. You can identify which specific letter combinations cause difficulty and practice them repeatedly. This targeted approach accelerates learning and helps you master the home row keys (ASDF JKL;) and the reaches to upper and lower rows. As you progress, you'll notice improved speed and reduced errors when transitioning to phrase-based practice.",
      howTo:
        "Start by typing each word carefully, focusing on using the correct finger for each key. Don't look at the keyboard - use the visual keyboard guide if needed to learn proper finger placement. Begin with shorter words and gradually progress to longer ones as your confidence grows. Practice for short 10-15 minute sessions multiple times per day for best results.",
      tips: "Maintain proper hand position on the home row between words. Type at a comfortable pace - speed will come naturally with practice. If you make a mistake, slow down and focus on accuracy. Our correction mode can help you develop proper technique by requiring you to correct errors before continuing.",
    },
    es: {
      heading: "Practica Mecanografía al Tacto con Palabras Individuales",
      intro:
        "Domina los fundamentos de la mecanografía al tacto practicando palabras individuales. Este modo es perfecto para principiantes que desean desarrollar memoria muscular para combinaciones comunes de letras y mejorar la precisión en la colocación de los dedos. Concéntrate en escribir palabras individuales correctamente antes de avanzar a frases y oraciones más complejas.",
      about:
        "La práctica de mecanografía basada en palabras te ayuda a concentrarte en la posición adecuada de los dedos sin la complejidad de la estructura de las oraciones. Al escribir repetidamente palabras comunes, desarrollas respuestas automáticas a patrones de letras, lo cual es esencial para alcanzar velocidades de escritura más altas. Nuestro modo de práctica de palabras presenta vocabulario cuidadosamente seleccionado que cubre todas las teclas del teclado, asegurando práctica equilibrada en todos los dedos.",
      benefits:
        "Practicar con palabras individuales te permite concentrarte completamente en la técnica y precisión. Puedes identificar qué combinaciones específicas de letras causan dificultad y practicarlas repetidamente. Este enfoque dirigido acelera el aprendizaje y te ayuda a dominar las teclas de la fila base (ASDF JKL;) y los alcances a las filas superior e inferior. A medida que progresas, notarás mayor velocidad y menos errores al pasar a la práctica basada en frases.",
      howTo:
        "Comienza escribiendo cada palabra cuidadosamente, enfocándote en usar el dedo correcto para cada tecla. No mires el teclado - usa la guía visual del teclado si es necesario para aprender la colocación adecuada de los dedos. Empieza con palabras más cortas y avanza gradualmente a las más largas a medida que crece tu confianza. Practica en sesiones cortas de 10-15 minutos varias veces al día para obtener mejores resultados.",
      tips: "Mantén la posición adecuada de las manos en la fila base entre palabras. Escribe a un ritmo cómodo - la velocidad vendrá naturalmente con la práctica. Si cometes un error, reduce la velocidad y concéntrate en la precisión. Nuestro modo de corrección puede ayudarte a desarrollar la técnica adecuada al requerir que corrijas los errores antes de continuar.",
    },
    id: {
      heading: "Latihan Mengetik Buta dengan Kata-kata Individual",
      intro:
        "Kuasai dasar-dasar mengetik buta dengan berlatih kata-kata individual. Mode ini sempurna untuk pemula yang ingin membangun memori otot untuk kombinasi huruf umum dan meningkatkan akurasi penempatan jari. Fokus pada mengetik kata-kata tunggal dengan benar sebelum melanjutkan ke frasa dan kalimat yang lebih kompleks.",
      about:
        "Latihan mengetik berbasis kata membantu Anda berkonsentrasi pada posisi jari yang tepat tanpa kompleksitas struktur kalimat. Dengan mengetik kata-kata umum secara berulang, Anda mengembangkan respons otomatis terhadap pola huruf, yang penting untuk mencapai kecepatan mengetik yang lebih tinggi. Mode latihan kata kami menyajikan kosakata yang dipilih dengan cermat yang mencakup semua tombol pada keyboard, memastikan latihan seimbang di semua jari.",
      benefits:
        "Berlatih dengan kata-kata individual memungkinkan Anda fokus sepenuhnya pada teknik dan akurasi. Anda dapat mengidentifikasi kombinasi huruf spesifik mana yang menyebabkan kesulitan dan melatihnya berulang kali. Pendekatan yang ditargetkan ini mempercepat pembelajaran dan membantu Anda menguasai tombol baris home (ASDF JKL;) dan jangkauan ke baris atas dan bawah. Seiring kemajuan Anda, Anda akan melihat peningkatan kecepatan dan pengurangan kesalahan saat beralih ke latihan berbasis frasa.",
      howTo:
        "Mulailah dengan mengetik setiap kata dengan hati-hati, fokus pada penggunaan jari yang benar untuk setiap tombol. Jangan melihat keyboard - gunakan panduan keyboard visual jika diperlukan untuk mempelajari penempatan jari yang tepat. Mulailah dengan kata-kata yang lebih pendek dan secara bertahap maju ke yang lebih panjang seiring kepercayaan Anda bertumbuh. Berlatihlah dalam sesi singkat 10-15 menit beberapa kali per hari untuk hasil terbaik.",
      tips: "Pertahankan posisi tangan yang tepat pada baris home di antara kata-kata. Ketik dengan kecepatan yang nyaman - kecepatan akan datang secara alami dengan latihan. Jika Anda membuat kesalahan, perlambat dan fokus pada akurasi. Mode koreksi kami dapat membantu Anda mengembangkan teknik yang tepat dengan mengharuskan Anda memperbaiki kesalahan sebelum melanjutkan.",
    },
    ko: {
      heading: "개별 단어로 터치 타이핑 연습하기",
      intro:
        "개별 단어를 연습하여 터치 타이핑의 기초를 마스터하세요. 이 모드는 일반적인 문자 조합에 대한 근육 기억을 구축하고 손가락 배치 정확도를 향상시키려는 초보자에게 완벽합니다. 더 복잡한 구문과 문장으로 진행하기 전에 단일 단어를 올바르게 입력하는 데 집중하세요.",
      about:
        "단어 기반 타이핑 연습은 문장 구조의 복잡성 없이 적절한 손가락 위치에 집중하는 데 도움이 됩니다. 일반적인 단어를 반복적으로 입력함으로써 문자 패턴에 대한 자동 반응을 개발하며, 이는 더 높은 타이핑 속도를 달성하는 데 필수적입니다. 우리의 단어 연습 모드는 키보드의 모든 키를 다루는 신중하게 선택된 어휘를 제공하여 모든 손가락에서 균형잡힌 연습을 보장합니다.",
      benefits:
        "개별 단어로 연습하면 기술과 정확도에 완전히 집중할 수 있습니다. 어떤 특정 문자 조합이 어려움을 야기하는지 식별하고 반복적으로 연습할 수 있습니다. 이 목표 지향적 접근 방식은 학습을 가속화하고 홈 로우 키(ASDF JKL;)와 위아래 행으로의 도달을 마스터하는 데 도움이 됩니다. 진행함에 따라 구문 기반 연습으로 전환할 때 향상된 속도와 줄어든 오류를 느낄 것입니다.",
      howTo:
        "각 단어를 주의 깊게 입력하는 것으로 시작하여 각 키에 올바른 손가락을 사용하는 데 집중하세요. 키보드를 보지 마세요 - 적절한 손가락 배치를 배우기 위해 필요한 경우 시각적 키보드 가이드를 사용하세요. 짧은 단어로 시작하여 자신감이 커짐에 따라 점차 긴 단어로 진행하세요. 최상의 결과를 위해 하루에 여러 번 짧은 10-15분 세션으로 연습하세요.",
      tips: "단어 사이에 홈 로우에서 적절한 손 위치를 유지하세요. 편안한 속도로 타이핑하세요 - 속도는 연습과 함께 자연스럽게 올 것입니다. 실수를 하면 속도를 늦추고 정확도에 집중하세요. 우리의 수정 모드는 계속하기 전에 오류를 수정하도록 요구함으로써 적절한 기술을 개발하는 데 도움이 될 수 있습니다.",
    },
    zh: {
      heading: "通过单词练习触摸打字",
      intro:
        "通过练习单个单词来掌握触摸打字的基础知识。此模式非常适合想要为常见字母组合建立肌肉记忆并提高手指放置准确性的初学者。在进入更复杂的短语和句子之前，专注于正确输入单个单词。",
      about:
        "基于单词的打字练习帮助您专注于正确的手指定位，而不会受到句子结构的复杂性影响。通过反复输入常见单词，您可以对字母模式形成自动反应，这对于实现更高的打字速度至关重要。我们的单词练习模式精心挑选了涵盖键盘所有按键的词汇，确保所有手指的均衡练习。",
      benefits:
        "练习单个单词使您能够完全专注于技术和准确性。您可以识别哪些特定的字母组合会造成困难，并反复练习它们。这种针对性的方法加速学习，并帮助您掌握主键行键（ASDF JKL;）以及向上下行的延伸。随着您的进步，您会注意到在转换到基于短语的练习时速度提高且错误减少。",
      howTo:
        "从仔细输入每个单词开始，专注于为每个键使用正确的手指。不要看键盘 - 如果需要，请使用可视键盘指南来学习正确的手指放置。从较短的单词开始，随着信心的增长逐渐进入较长的单词。为获得最佳效果，每天多次进行10-15分钟的短时间练习。",
      tips: "在单词之间保持主键行上的正确手部位置。以舒适的速度打字 - 速度会随着练习自然而然地提高。如果您犯了错误，请放慢速度并专注于准确性。我们的纠正模式可以通过要求您在继续之前纠正错误来帮助您培养正确的技术。",
    },
  },
  phrases: {
    en: {
      heading: "Improve Typing Speed with Common Phrases",
      intro:
        "Enhance your touch typing skills by practicing complete sentences and common phrases. This mode simulates real-world typing scenarios, helping you develop rhythm, flow, and the ability to type continuously without breaks. Perfect for intermediate typists ready to move beyond individual words.",
      about:
        "Phrase-based typing practice introduces the complexity of punctuation, capitalization, and natural sentence flow. By practicing complete sentences, you learn to maintain consistent typing speed across word boundaries and handle the full range of keyboard characters. Our phrase practice mode uses commonly used expressions, idioms, and sentence structures that you'll encounter in everyday typing.",
      benefits:
        "Typing full phrases develops your ability to think ahead while your fingers execute previous keystrokes - a crucial skill for achieving high typing speeds. You'll learn to handle spaces, punctuation marks, and capital letters smoothly without breaking your rhythm. This practice mode also improves your reading comprehension and eye-hand coordination as you learn to read ahead while maintaining accurate typing.",
      howTo:
        "Type each phrase exactly as shown, including all punctuation and capitalization. Focus on maintaining a steady rhythm rather than rushing. Use the shift key with the opposite hand when capitalizing letters. Keep your eyes on the text, not your fingers. Practice reading ahead so you know what's coming next while your fingers type the current word.",
      tips: "Don't pause between words - develop a smooth, continuous typing rhythm. Practice using the space bar with your thumb without looking down. When you encounter punctuation, use the correct finger (typically the pinky for periods and commas). As your confidence grows, try to increase your speed while maintaining 95%+ accuracy.",
    },
    es: {
      heading: "Mejora la Velocidad de Escritura con Frases Comunes",
      intro:
        "Mejora tus habilidades de mecanografía al tacto practicando oraciones completas y frases comunes. Este modo simula escenarios de escritura del mundo real, ayudándote a desarrollar ritmo, fluidez y la capacidad de escribir continuamente sin pausas. Perfecto para mecanógrafos intermedios listos para avanzar más allá de palabras individuales.",
      about:
        "La práctica de mecanografía basada en frases introduce la complejidad de la puntuación, mayúsculas y el flujo natural de las oraciones. Al practicar oraciones completas, aprendes a mantener una velocidad de escritura consistente a través de los límites de las palabras y manejar toda la gama de caracteres del teclado. Nuestro modo de práctica de frases utiliza expresiones comúnmente usadas, modismos y estructuras de oraciones que encontrarás en la escritura cotidiana.",
      benefits:
        "Escribir frases completas desarrolla tu capacidad de pensar adelante mientras tus dedos ejecutan pulsaciones previas - una habilidad crucial para alcanzar altas velocidades de escritura. Aprenderás a manejar espacios, signos de puntuación y letras mayúsculas sin problemas sin romper tu ritmo. Este modo de práctica también mejora tu comprensión lectora y coordinación ojo-mano mientras aprendes a leer adelante mientras mantienes escritura precisa.",
      howTo:
        "Escribe cada frase exactamente como se muestra, incluyendo toda la puntuación y mayúsculas. Concéntrate en mantener un ritmo constante en lugar de apresurarte. Usa la tecla shift con la mano opuesta al poner letras en mayúscula. Mantén tus ojos en el texto, no en tus dedos. Practica leer adelante para que sepas qué viene después mientras tus dedos escriben la palabra actual.",
      tips: "No hagas pausas entre palabras - desarrolla un ritmo de escritura suave y continuo. Practica usar la barra espaciadora con tu pulgar sin mirar hacia abajo. Cuando encuentres puntuación, usa el dedo correcto (típicamente el meñique para puntos y comas). A medida que crece tu confianza, intenta aumentar tu velocidad mientras mantienes más del 95% de precisión.",
    },
    id: {
      heading: "Tingkatkan Kecepatan Mengetik dengan Frasa Umum",
      intro:
        "Tingkatkan keterampilan mengetik buta Anda dengan berlatih kalimat lengkap dan frasa umum. Mode ini mensimulasikan skenario mengetik dunia nyata, membantu Anda mengembangkan ritme, aliran, dan kemampuan mengetik terus-menerus tanpa jeda. Sempurna untuk pengetik tingkat menengah yang siap untuk melanjutkan dari kata-kata individual.",
      about:
        "Latihan mengetik berbasis frasa memperkenalkan kompleksitas tanda baca, kapitalisasi, dan aliran kalimat alami. Dengan berlatih kalimat lengkap, Anda belajar mempertahankan kecepatan mengetik yang konsisten melintasi batas kata dan menangani seluruh rentang karakter keyboard. Mode latihan frasa kami menggunakan ekspresi yang umum digunakan, idiom, dan struktur kalimat yang akan Anda temui dalam mengetik sehari-hari.",
      benefits:
        "Mengetik frasa lengkap mengembangkan kemampuan Anda untuk berpikir ke depan sementara jari Anda mengeksekusi penekanan tombol sebelumnya - keterampilan penting untuk mencapai kecepatan mengetik tinggi. Anda akan belajar menangani spasi, tanda baca, dan huruf kapital dengan lancar tanpa memutus ritme Anda. Mode latihan ini juga meningkatkan pemahaman membaca dan koordinasi mata-tangan Anda saat Anda belajar membaca ke depan sambil mempertahankan pengetikan yang akurat.",
      howTo:
        "Ketik setiap frasa persis seperti yang ditampilkan, termasuk semua tanda baca dan kapitalisasi. Fokus pada mempertahankan ritme yang stabil daripada terburu-buru. Gunakan tombol shift dengan tangan yang berlawanan saat mengkapitalisasi huruf. Jaga agar mata Anda pada teks, bukan pada jari Anda. Berlatihlah membaca ke depan sehingga Anda tahu apa yang akan datang berikutnya sementara jari Anda mengetik kata saat ini.",
      tips: "Jangan berhenti di antara kata-kata - kembangkan ritme mengetik yang lancar dan terus-menerus. Berlatihlah menggunakan bilah spasi dengan ibu jari Anda tanpa melihat ke bawah. Ketika Anda menemukan tanda baca, gunakan jari yang benar (biasanya jari kelingking untuk titik dan koma). Seiring kepercayaan Anda bertumbuh, cobalah untuk meningkatkan kecepatan Anda sambil mempertahankan akurasi 95%+.",
    },
    ko: {
      heading: "일반적인 구문으로 타이핑 속도 향상하기",
      intro:
        "완전한 문장과 일반적인 구문을 연습하여 터치 타이핑 기술을 향상시키세요. 이 모드는 실제 타이핑 시나리오를 시뮬레이션하여 리듬, 흐름 및 중단 없이 지속적으로 타이핑하는 능력을 개발하는 데 도움이 됩니다. 개별 단어를 넘어 준비된 중급 타이피스트에게 완벽합니다.",
      about:
        "구문 기반 타이핑 연습은 구두점, 대문자화 및 자연스러운 문장 흐름의 복잡성을 소개합니다. 완전한 문장을 연습함으로써 단어 경계를 넘어 일관된 타이핑 속도를 유지하고 키보드 문자의 전체 범위를 처리하는 방법을 배웁니다. 우리의 구문 연습 모드는 일상적인 타이핑에서 만날 일반적으로 사용되는 표현, 관용구 및 문장 구조를 사용합니다.",
      benefits:
        "전체 구문을 타이핑하면 손가락이 이전 키 입력을 실행하는 동안 미리 생각하는 능력이 개발됩니다 - 높은 타이핑 속도를 달성하는 데 중요한 기술입니다. 리듬을 깨지 않고 공백, 구두점 및 대문자를 매끄럽게 처리하는 방법을 배웁니다. 이 연습 모드는 또한 정확한 타이핑을 유지하면서 미리 읽는 방법을 배우면서 독해력과 눈-손 협응을 향상시킵니다.",
      howTo:
        "모든 구두점과 대문자화를 포함하여 표시된 대로 각 구문을 정확히 입력하세요. 서두르기보다는 안정적인 리듬을 유지하는 데 집중하세요. 문자를 대문자화할 때 반대 손으로 shift 키를 사용하세요. 손가락이 아닌 텍스트에 눈을 유지하세요. 손가락이 현재 단어를 타이핑하는 동안 다음에 무엇이 올지 알 수 있도록 미리 읽는 연습을 하세요.",
      tips: "단어 사이에 멈추지 마세요 - 부드럽고 지속적인 타이핑 리듬을 개발하세요. 아래를 보지 않고 엄지손가락으로 스페이스바를 사용하는 연습을 하세요. 구두점을 만나면 올바른 손가락을 사용하세요 (일반적으로 마침표와 쉼표는 새끼손가락). 자신감이 커짐에 따라 95% 이상의 정확도를 유지하면서 속도를 높이려고 노력하세요.",
    },
    zh: {
      heading: "通过常见短语提高打字速度",
      intro:
        "通过练习完整的句子和常见短语来增强您的触摸打字技能。此模式模拟真实世界的打字场景，帮助您培养节奏、流畅性以及无中断连续打字的能力。非常适合准备超越单个单词的中级打字者。",
      about:
        "基于短语的打字练习引入了标点符号、大小写和自然句子流的复杂性。通过练习完整的句子，您可以学习在单词边界之间保持一致的打字速度，并处理键盘字符的全部范围。我们的短语练习模式使用您在日常打字中会遇到的常用表达、成语和句子结构。",
      benefits:
        "输入完整的短语可以培养您在手指执行先前按键操作时提前思考的能力 - 这是实现高打字速度的关键技能。您将学会流畅地处理空格、标点符号和大写字母而不会打断节奏。此练习模式还可以提高您的阅读理解能力和眼手协调能力，因为您学会在保持准确打字的同时提前阅读。",
      howTo:
        "完全按照所示输入每个短语，包括所有标点符号和大小写。专注于保持稳定的节奏而不是匆忙。在大写字母时用另一只手使用shift键。保持您的眼睛在文本上，而不是手指上。练习提前阅读，这样您就知道接下来会发生什么，而您的手指正在输入当前单词。",
      tips: "不要在单词之间暂停 - 培养平稳、连续的打字节奏。练习使用拇指按空格键而不低头看。当您遇到标点符号时，使用正确的手指（通常是小指用于句号和逗号）。随着信心的增长，尝试在保持95%以上准确率的同时提高速度。",
    },
  },
};

// Helper to get localized content (fallback to English if translation not available)
function getLocalizedContent(mode: ContentType, lang: string) {
  const modeKey = mode === "custom" ? "words" : mode;
  const modeContent = seoContent[modeKey];

  // Check if the language exists in the content, otherwise use English
  if (lang in modeContent) {
    return modeContent[lang as keyof typeof modeContent];
  }

  return modeContent.en;
}

export function SEOContent({
  interfaceLang,
  studyLang,
  learningMode,
}: SEOContentProps) {
  // Validate interfaceLang to prevent errors from invalid routes (e.g., .well-known paths)
  const t = translations[interfaceLang as InterfaceLanguage] || translations.en;
  const content = getLocalizedContent(learningMode, interfaceLang);
  const studyLangName =
    t.languageNames && studyLang in t.languageNames
      ? t.languageNames[studyLang as keyof typeof t.languageNames]
      : studyLang.toUpperCase();
  const modeName = learningMode === "words" ? t.words : t.phrases;

  // Popular cross-language combinations for sr-only links
  const popularCombinations = [
    // Same language (always include)
    { interfaceLang, studyLang, mode: "words" as const },
    { interfaceLang, studyLang, mode: "phrases" as const },
    { interfaceLang, studyLang, mode: "custom" as const },
    // Popular cross-language combinations
    { interfaceLang, studyLang: "en", mode: "words" as const },
    { interfaceLang, studyLang: "en", mode: "phrases" as const },
    { interfaceLang, studyLang: "es", mode: "words" as const },
    { interfaceLang, studyLang: "es", mode: "phrases" as const },
    { interfaceLang, studyLang: "fr", mode: "words" as const },
    { interfaceLang, studyLang: "fr", mode: "phrases" as const },
    { interfaceLang, studyLang: "de", mode: "words" as const },
    { interfaceLang, studyLang: "de", mode: "phrases" as const },
    { interfaceLang, studyLang: "pt", mode: "words" as const },
    { interfaceLang, studyLang: "ru", mode: "words" as const },
    { interfaceLang, studyLang: "zh", mode: "words" as const },
    { interfaceLang, studyLang: "ja", mode: "words" as const },
  ].filter(
    // Remove duplicates and current page
    (combo, index, self) =>
      self.findIndex(
        (c) =>
          c.interfaceLang === combo.interfaceLang &&
          c.studyLang === combo.studyLang &&
          c.mode === combo.mode,
      ) === index &&
      !(
        combo.interfaceLang === interfaceLang &&
        combo.studyLang === studyLang &&
        combo.mode === learningMode
      ),
  );

  return (
    <article className="sr-only">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {studyLangName} {modeName} - {t.title}
      </h1>

      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
        {t.seoDescription}
      </p>

      {/* Internal navigation links for SEO */}
      <nav aria-label="Practice mode navigation">
        <h2>Related Practice Modes</h2>
        <ul>
          {popularCombinations.map((combo) => {
            const targetLang =
              combo.studyLang in t.languageNames
                ? t.languageNames[
                    combo.studyLang as keyof typeof t.languageNames
                  ]
                : combo.studyLang.toUpperCase();
            const targetMode =
              combo.mode === "words"
                ? t.words
                : combo.mode === "phrases"
                  ? t.phrases
                  : "Custom";
            return (
              <li
                key={`${combo.interfaceLang}-${combo.studyLang}-${combo.mode}`}
              >
                <a
                  href={`/${combo.interfaceLang}/${combo.studyLang}/${combo.mode}`}
                >
                  {targetLang} {targetMode}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {content.heading}
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.intro}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        About {modeName} Typing Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.about}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Benefits of {modeName} Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {content.benefits}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        How to Practice Effectively
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.howTo}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Practice Tips
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.tips}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Practice Tips
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{content.tips}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Features of Our Typing Tutor
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          Real-time typing speed measurement (WPM - Words Per Minute) and
          accuracy tracking
        </li>
        <li>
          Visual keyboard with finger position guidance and color-coded keys
        </li>
        <li>
          Support for 28+ keyboard layouts including QWERTY, AZERTY, QWERTZ,
          Dvorak, and more
        </li>
        <li>
          Practice in multiple languages: English, Spanish, French, German,
          Russian, Chinese, Japanese, Korean, Arabic, and many others
        </li>
        <li>
          Three practice modes: individual words, common phrases, and custom
          text
        </li>
        <li>Sound feedback for correct and incorrect keystrokes</li>
        <li>
          Dark mode support for comfortable practice in low-light conditions
        </li>
        <li>
          Detailed statistics including mistakes heat map and finger usage
          analysis
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Track Your Progress
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Monitor your improvement with detailed statistics. View your typing
        speed (WPM), accuracy percentage, total characters typed, and mistakes
        made. The mistakes heat map shows which keys you struggle with most,
        allowing you to focus your practice where it's needed. Character
        statistics reveal your typing patterns and help identify areas for
        improvement.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Free Online Typing Practice
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        This typing tutor is completely free to use with no registration
        required. Practice as much as you want, whenever you want. All features
        are available immediately - no premium subscriptions or locked content.
        We believe everyone should have access to quality typing education tools
        to improve their skills.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        Multilingual Support
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Our typing tutor supports practice in over 28 languages with native
        keyboard layouts. Whether you're learning English typing on a QWERTY
        layout, French on AZERTY, German on QWERTZ, or practicing Cyrillic,
        Arabic, Chinese, or Japanese characters, our tool provides the
        appropriate keyboard layout and practice content.
      </p>
    </article>
  );
}
