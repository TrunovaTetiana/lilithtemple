 const btnRu = document.getElementById("btn-ru");
const btnEn = document.getElementById("btn-en");
const backBtn = document.querySelector(".back-btn");
const content = document.querySelector(".oracle-content");
const path = document.querySelector(".oracle-path");

const oracleEnterBtn = document.getElementById("oracleEnterBtn");
const oracleBook = document.querySelector(".oracle-book");
const header = document.querySelector(".app-header");

const oracleVideo = document.getElementById("oracleVideo");
const soundToggle = document.getElementById("soundToggle");

const sigilHome = document.querySelector(".sigil-home");

let historyStack = [];

function setLanguage(lang) {
  document.documentElement.lang = lang;

  const elements = document.querySelectorAll("[data-ru][data-en]");

  elements.forEach((element) => {
    if (lang === "ru") {
      element.textContent = element.dataset.ru;
    } else {
      element.textContent = element.dataset.en;
    }
  });
}

function updatePath(ruText, enText) {
  path.setAttribute("data-ru", ruText);
  path.setAttribute("data-en", enText);
  setLanguage(document.documentElement.lang);
}

function setView(viewName, renderFn) {
  historyStack.push({
    name: viewName,
    render: renderFn
  });
  renderFn();
}

function goBack() {
  if (historyStack.length > 1) {
    historyStack.pop();
    const previousView = historyStack[historyStack.length - 1];
    previousView.render();
  }
}

function renderHome() {
  updatePath("Главная", "Home");

  content.innerHTML = `
    <h2 data-ru="Главные разделы" data-en="Main Sections">
      Главные разделы
    </h2>

    <ul class="main-sections">
      <li>
        <button id="section-invocation"
          data-ru="Призыв и славление Богини Лилит"
          data-en="Invocation and Praise of Goddess Lilith">
          Призыв и славление Богини Лилит
        </button>
      </li>

      <li>
        <button id="section-rituals"
          data-ru="Ритуалы и практики"
          data-en="Rituals and Practices">
          Ритуалы и практики
        </button>
      </li>

      <li>
       <button id="section-altar"
         data-ru="Алтарь"
         data-en="Altar">
         Алтарь
       </button>
      </li>

      <li>
        <button id="section-correspondences"
          data-ru="Соответствия"
          data-en="Correspondences">
          Соответствия
        </button>
      </li>

      <li>
       <button id="section-state"
         data-ru="Состояние"
         data-en="State">
         Состояние
       </button> 
      </li>
    </ul>
  `;

  bindHomeEvents();
  setLanguage(document.documentElement.lang);
}

function renderInvocationSection() {
  updatePath(
    "Главная / Призыв и славление Богини Лилит",
    "Home / Invocation and Praise of Goddess Lilith"
  );

  content.innerHTML = `
    <h2
      data-ru="Призыв и славление Богини Лилит"
      data-en="Invocation and Praise of Goddess Lilith">
      Призыв и славление Богини Лилит
    </h2>

    <ul class="main-sections">
      <li>
        <button id="sub-enns"
          data-ru="Энны"
          data-en="Enns">
          Энны
        </button>
      </li>

      <li>
        <button id="sub-name-praise"
          data-ru="Славление имени"
          data-en="Praise of the Name">
          Славление имени
        </button>
      </li>

      <li>
        <button id="sub-addresses"
          data-ru="Обращения к Богине"
          data-en="Addresses to the Goddess">
          Обращения к Богине
        </button>
      </li>
    </ul>
  `;

  bindInvocationEvents();
  setLanguage(document.documentElement.lang);
}

function renderEnnsPage() {
  updatePath(
    "Главная / Призыв и славление Богини Лилит / Энны",
    "Home / Invocation and Praise of Goddess Lilith / Enns"
  );

  content.innerHTML = `
    <h2 data-ru="Энны" data-en="Enns">Энны</h2>

    <p class="oracle-intro"
      data-ru="Перед тем как Вы начнёте использовать ритуалы и практики, позвольте дать Вам это жреческое вступление."
      data-en="Before You begin using the rituals and practices, allow me to offer You this priestess introduction.">
      Перед тем как Вы начнёте использовать ритуалы и практики, позвольте дать Вам это жреческое вступление.
    </p>

    <p
      data-ru="Богиня Лилит не является демоном в привычном понимании и не требует поклонения через страх или подчинение."
      data-en="Goddess Lilith is not a demon in the common understanding and does not require worship through fear or submission.">
      Богиня Лилит не является демоном в привычном понимании и не требует поклонения через страх или подчинение.
    </p>

    <p
      data-ru="В этом храме Лилит почитается как Богиня свободы, желания, границ и внутренней силы."
      data-en="In this temple, Lilith is honored as a Goddess of freedom, desire, boundaries, and inner power.">
      В этом храме Лилит почитается как Богиня свободы, желания, границ и внутренней силы.
    </p>

    <p
      data-ru="Обращение к Ней — это не призыв внешней сущности, а вхождение в состояние, где Вы встречаетесь с собой без масок и искажений."
      data-en="To turn to Her is not to summon an external entity, but to enter a state where You meet Yourself without masks or distortion.">
      Обращение к Ней — это не призыв внешней сущности, а вхождение в состояние, где Вы встречаетесь с собой без масок и искажений.
    </p>

    <p
      data-ru="Она не управляет Вами и не принимает решения за Вас. Она усиливает то, с чем Вы приходите."
      data-en="She does not control You and does not make choices for You. She amplifies what You bring with You.">
      Она не управляет Вами и не принимает решения за Вас. Она усиливает то, с чем Вы приходите.
    </p>

    <p
      data-ru="Поэтому важно помнить: вся ответственность за Ваши намерения, действия и последствия всегда остаётся на Вас."
      data-en="Therefore, it is important to remember: all responsibility for Your intentions, actions, and consequences always remains with You.">
      Поэтому важно помнить: вся ответственность за Ваши намерения, действия и последствия всегда остаётся на Вас.
    </p>

    <p
      data-ru="Если Вы приходите с разрушением — Вы встретитесь с его отражением. Если Вы приходите с желанием понять себя — Вам откроется глубина."
      data-en="If You come with destruction — You will meet its reflection. If You come with the desire to understand Yourself — depth will open to You.">
      Если Вы приходите с разрушением — Вы встретитесь с его отражением. Если Вы приходите с желанием понять себя — Вам откроется глубина.
    </p>

    <p
      data-ru="Лилит не делит на «свет» и «тьму». Она раскрывает."
      data-en="Lilith does not divide into “light” and “dark.” She reveals.">
      Лилит не делит на «свет» и «тьму». Она раскрывает.
    </p>

    <p
      data-ru="Она может показать Вам и силу, и Тень, и дать возможность принять обе стороны без страха."
      data-en="She may show You both strength and Shadow, and give You the ability to accept both without fear.">
      Она может показать Вам и силу, и Тень, и дать возможность принять обе стороны без страха.
    </p>

    <p
      data-ru="Но только Вы решаете, как распорядиться этим знанием."
      data-en="But only You decide what You will do with this knowledge.">
      Но только Вы решаете, как распорядиться этим знанием.
    </p>

    <p
      data-ru="В этом и есть суть взаимодействия с Богиней Лилит — не искать силу вовне, а возвращать её внутрь себя."
      data-en="This is the essence of working with Goddess Lilith — not to seek power outside, but to return it within Yourself.">
      В этом и есть суть взаимодействия с Богиней Лилит — не искать силу вовне, а возвращать её внутрь себя.
    </p>

    <div class="oracle-divider">✶</div>

    <p
      data-ru="Я желаю Вам глубоких и осознанных практик, чистого отклика, мягкого и сильного взаимодействия, и честной встречи с собой."
      data-en="I wish You deep and conscious practices, a clear inner response, gentle yet powerful interaction, and an honest meeting with Yourself.">
      Я желаю Вам глубоких и осознанных практик, чистого отклика, мягкого и сильного взаимодействия, и честной встречи с собой.
    </p>

    <p
      data-ru="Пусть Ваш путь будет наполнен пониманием, внутренней опорой и силой."
      data-en="May Your path be filled with understanding, inner grounding, and strength.">
      Пусть Ваш путь будет наполнен пониманием, внутренней опорой и силой.
    </p>

    <p class="oracle-signature"
      data-ru="— Ваша Ишвана"
      data-en="— Yours, Ishvana">
      — Ваша Ишвана
    </p>

    <div class="oracle-divider">✶</div>

    <p
      data-ru="С этого момента начинается обращение. Позвольте словам стать проводником."
      data-en="From this moment, the invocation begins. Allow the words to become Your conduit.">
      С этого момента начинается обращение. Позвольте словам стать проводником.
    </p>

    <p
      data-ru="Не спешите. Отпустите мысли. Не стремитесь понять — позвольте почувствовать."
      data-en="Do not rush. Let go of thoughts. Do not try to understand — allow Yourself to feel.">
      Не спешите. Отпустите мысли. Не стремитесь понять — позвольте почувствовать.
    </p>

    <p
      data-ru="Энны не требуют буквального перевода. Они звучат через вибрацию, через ритм, через внутренний отклик."
      data-en="Enns do not require literal translation. They resonate through vibration, rhythm, and inner response.">
      Энны не требуют буквального перевода. Они звучат через вибрацию, через ритм, через внутренний отклик.
    </p>

    <p
      data-ru="Произносите их спокойно, устойчивым и ровным голосом, позволяя звуку мягко течь."
      data-en="Speak them calmly, with a steady and even voice, allowing the sound to flow softly.">
      Произносите их спокойно, устойчивым и ровным голосом, позволяя звуку мягко течь.
    </p>

    <p
      data-ru="Лучше всего — нараспев, как дыхание, как поток."
      data-en="It is best to chant them, like breath, like a current.">
      Лучше всего — нараспев, как дыхание, как поток.
    </p>

    <p
      data-ru="Не удерживайте смысл — освободите ум и дайте словам прозвучать внутри Вас."
      data-en="Do not hold onto meaning — release the mind and allow the words to resonate within You.">
      Не удерживайте смысл — освободите ум и дайте словам прозвучать внутри Вас.
    </p>

    <p
      data-ru="Со временем Вы начнёте чувствовать их глубже. Для некоторых отклик приходит через звук, для других — через состояние."
      data-en="With time, You will begin to feel them more deeply. For some, the response comes through sound, for others — through state.">
      Со временем Вы начнёте чувствовать их глубже. Для некоторых отклик приходит через звук, для других — через состояние.
    </p>

    <p
      data-ru="Иногда я буду давать Вам ориентиры и приблизительное понимание — если это поможет Вам легче войти в практику."
      data-en="At times, I will offer You guidance and approximate meanings — if this helps You enter the practice more easily.">
      Иногда я буду давать Вам ориентиры и приблизительное понимание — если это поможет Вам легче войти в практику.
    </p>

    <p
      data-ru="Вы можете повторять энны 3, 7 или 11 раз — выберите тот ритм, который откликается именно Вам."
      data-en="You may repeat the enns 3, 7, or 11 times — choose the rhythm that resonates with You.">
      Вы можете повторять энны 3, 7 или 11 раз — выберите тот ритм, который откликается именно Вам.
    </p>

    <p
      data-ru="Для удобства можно использовать счёт: бусины, чётки или браслет. В моей практике я использую браслет из 11 бусин, перебирая их пальцами — это помогает сохранять ритм и не отвлекаться."
      data-en="For convenience, You may use counting tools: beads, prayer beads, or a bracelet. In my practice, I use a bracelet of 11 beads, moving through them with my fingers — this helps maintain rhythm and focus.">
      Для удобства можно использовать счёт: бусины, чётки или браслет. В моей практике я использую браслет из 11 бусин, перебирая их пальцами — это помогает сохранять ритм и не отвлекаться.
    </p>

    <div class="oracle-divider">✶</div>

    <p
      data-ru="Сделайте глубокий вдох грудью и мягко, нараспев, на выдохе произносите слова."
      data-en="Take a deep breath into Your chest, and gently, in a chant, speak the words on the exhale.">
      Сделайте глубокий вдох грудью и мягко, нараспев, на выдохе произносите слова.
    </p>

    <p
      data-ru="Освободите мысли. Ни о чём не думайте. Оставайтесь только в звуке, дыхании и внутреннем отклике."
      data-en="Release all thoughts. Think of nothing. Remain only in sound, breath, and inner response.">
      Освободите мысли. Ни о чём не думайте. Оставайтесь только в звуке, дыхании и внутреннем отклике.
    </p>

    <h3 class="oracle-small-title"
      data-ru="✶ Энны Богини Лилит ✶"
      data-en="✶ Enns of Goddess Lilith ✶">
      ✶ Энны Богини Лилит ✶
    </h3>

    <div class="oracle-verse">
      <p
        data-ru="🜂 I

Ишет Зенуним
Зонахит
Танинсам
Начашелоах
Лайилил
Зачалайла
Ама Лилит
Лифтоах Клипот"
        data-en="🜂 I

Ishet Zenunim
Zonachit
Taninsam
Nachasheloach
Layilil
Zachalayla
Ama Lilith
Liftoah Qliphoth">
        🜂 I
      </p>
    </div>

    <div class="oracle-verse">
      <p
        data-ru="🜂 II

Renich Viasa Avage
Lilith Lirach"
        data-en="🜂 II

Renich Viasa Avage
Lilith Lirach">
        🜂 II
      </p>
    </div>

    <div class="oracle-divider">✶</div>

    <p class="oracle-note"
      data-ru="Энны, представленные в музыкальной комнате храма, любезно предоставлены Екатериной Серано (@kateserrano_dance, @lilithcode)."
      data-en="The enns presented in the temple’s music room are kindly provided by Ekaterina Serano (@kateserrano_dance, @lilithcode).">
      Энны, представленные в музыкальной комнате храма, любезно предоставлены Екатериной Серано (@kateserrano_dance, @lilithcode).
    </p>
  `;

  setLanguage(document.documentElement.lang);
}

function renderNamePraisePage() {
  updatePath(
    "Главная / Призыв и славление Богини Лилит / Славление имени",
    "Home / Invocation and Praise of Goddess Lilith / Praise of the Name"
  );

  content.innerHTML = `
    <h2 data-ru="Славление имени Богини Лилит" data-en="Praise of the Name of Goddess Lilith">
  Славление имени Богини Лилит
</h2>

<p class="oracle-intro"
  data-ru="Это обращение может совершаться у алтаря или в любом пространстве, где Вы чувствуете тишину и присутствие."
  data-en="This act of devotion may be performed at an altar or within any space where You feel stillness and presence.">
  Это обращение может совершаться у алтаря  
  или в любом пространстве, где Вы чувствуете тишину и присутствие.
</p>

<p
  data-ru="Традиционно его выполняют утром, но Вы можете обратиться к Богине Лилит в любое время, когда ощущаете внутренний отклик и желание взаимодействия."
  data-en="It is traditionally done in the morning, yet You may turn to Goddess Lilith at any time when You feel the inner call to connect.">
  Традиционно его выполняют утром,  
  но Вы можете обратиться к Богине Лилит в любое время,  
  когда ощущаете внутренний отклик и желание взаимодействия.
</p>

<p
  data-ru="Жрецы совершают это славление ежедневно, как акт почтения и соединения с силой."
  data-en="Priestesses and practitioners perform this daily, as an act of reverence and attunement to Her current.">
  Жрецы совершают это славление ежедневно,  
  как акт почтения и соединения с силой.
</p>

<p
  data-ru="Перед началом зажгите благовоние, соответствующее энергиям Богини Лилит."
  data-en="Before beginning, light an incense aligned with the energies of Goddess Lilith.">
  Перед началом зажгите благовоние,  
  соответствующее энергиям Богини Лилит.
</p>

<p
  data-ru="Подойдут мягкие, тёплые и чувственные ароматы — например, роза или жасмин."
  data-en="Soft, warm, and sensual scents are most suitable — such as rose or jasmine.">
  Подойдут мягкие, тёплые и чувственные ароматы —  
  например, роза или жасмин.
</p>

<p
  data-ru="Вы можете зажечь одну палочку или столько, сколько откликается Вам."
  data-en="You may light a single stick, or as many as feel right to You.">
  Вы можете зажечь одну палочку  
  или столько, сколько откликается Вам.
</p>

<div class="oracle-divider">✶</div>

<p
  data-ru="После этого произнесите слова:"
  data-en="Then speak the words:">
  После этого произнесите слова:
</p>

<div class="oracle-verse">
  <p
    data-ru="Бериху малка Ама Лилит!  
Кодеш ха-ашем Лилит!

Благословенна царица Мать Лилит!  
Освящено имя Лилит!

_(повторяется 3 раза)_"
    data-en="Berikhu malka Ama Lilit!  
Kodesh ha-ashem Lilit!

Blessed is the Queen, Mother Lilith!  
Sanctified is the Name of Lilith!

_(repeat 3 times)_">
    Бериху малка Ама Лилит!  
    Кодеш ха-ашем Лилит!
  </p>
</div>

<div class="oracle-divider">✶</div>

<p
  data-ru="Во время произнесения сложите ладони:"
  data-en="As You speak, bring Your hands together:">
  Во время произнесения сложите ладони:
</p>

<p
  data-ru="левая ладонь мягко ложится на правую, образуя спокойную, собранную форму."
  data-en="the left palm gently rests upon the right, forming a calm and centered gesture.">
  левая ладонь мягко ложится на правую,  
  образуя спокойную, собранную форму.
</p>

<p
  data-ru="На словах мягко касайтесь пальцами ладоней: сначала лба, затем груди."
  data-en="With each repetition, softly touch Your hands: first to the forehead, then to the chest.">
  На словах мягко касайтесь пальцами ладоней:  
  сначала лба,  
  затем груди.
</p>

<p
  data-ru="Лоб — грудь.  
Лоб — грудь."
  data-en="Forehead — chest.  
Forehead — chest.">
  Лоб — грудь.  
  Лоб — грудь.
</p>

<p
  data-ru="С каждым повторением сохраняйте ритм движения и дыхания."
  data-en="Let the movement follow the rhythm of Your breath and voice.">
  С каждым повторением сохраняйте ритм движения и дыхания.
</p>

<p
  data-ru="Слегка склоняйте голову, позволяя телу следовать за словом."
  data-en="Gently incline Your head, allowing the body to move with the words.">
  Слегка склоняйте голову,  
  позволяя телу следовать за словом.
</p>

<p
  data-ru="Движение должно быть мягким, спокойным, осознанным."
  data-en="The gesture remains soft, steady, and conscious.">
  Движение должно быть мягким,  
  спокойным,  
  осознанным.
</p>

<div class="oracle-divider">✶</div>

<p
  data-ru="Оставайтесь в этом состоянии столько, сколько чувствуете. Позвольте отклику раскрыться внутри Вас."
  data-en="Remain in this state for as long as You feel. Allow the resonance to unfold within You.">
  Оставайтесь в этом состоянии столько, сколько чувствуете.  
  Позвольте отклику раскрыться внутри Вас.
</p>
  `;

  setLanguage(document.documentElement.lang);
}

function renderAddressesPage() {
  updatePath(
    "Главная / Призыв и славление Богини Лилит / Обращения к Богине",
    "Home / Invocation and Praise of Goddess Lilith / Addresses to the Goddess"
  );

  content.innerHTML = `
    <h2 data-ru="Обращение к Богине Лилит" data-en="Invocation to Goddess Lilith">
  Обращение к Богине Лилит
</h2>

<p class="oracle-intro"
data-ru="Перед тем как приступить к обращению, остановитесь на мгновение."
data-en="Before you begin the invocation, pause for a moment.">
Перед тем как приступить к обращению,  
остановитесь на мгновение.
</p>

<p
data-ru="Освободите свои мысли. Отпустите внутренний поток."
data-en="Release your thoughts. Let go of the inner flow.">
Освободите свои мысли.  
Отпустите внутренний поток.
</p>

<p
data-ru="Зажгите благовоние по соответствию. Сделайте глубокий вдох. Настройтесь."
data-en="Light incense according to correspondence. Take a deep breath. Center yourself.">
Зажгите благовоние по соответствию.  
Сделайте глубокий вдох.  
Настройтесь.
</p>

<p
data-ru="Не стремитесь понять слова — позвольте им пройти через Вас."
data-en="Do not try to understand the words — allow them to pass through you.">
Не стремитесь понять слова —  
позвольте им пройти через Вас.
</p>

<p
data-ru="Выберите ту форму обращения, которая откликается Вам."
data-en="Choose the form of invocation that resonates with you.">
Выберите ту форму обращения,  
которая откликается Вам.
</p>

<p
data-ru="Вы можете читать с листа — со временем слова сами закрепятся внутри Вас."
data-en="You may read from the text — with time, the words will settle naturally within you.">
Вы можете читать с листа —  
со временем слова сами закрепятся внутри Вас.
</p>

<p
data-ru="Не напрягайтесь. Расслабьтесь и просто произнесите."
data-en="Do not strain. Relax and simply speak.">
Не напрягайтесь.  
Расслабьтесь и просто произнесите.
</p>

<p
data-ru="Важно не то, как Вы говорите, а то, что Вы вкладываете."
data-en="What matters is not how you speak, but what you bring into it.">
Важно не то, как Вы говорите,  
а то, что Вы вкладываете.
</p>

<p
data-ru="Богиня Лилит слышит Ваше намерение, Вашу энергию, Ваше внутреннее состояние."
data-en="Goddess Lilith hears your intention, your energy, your inner state.">
Богиня Лилит слышит Ваше намерение,  
Вашу энергию,  
Ваше внутреннее состояние.
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title">🜂 I. Молитва — обращение (допуск к древней мудрости)</h3>

<div class="oracle-verse">
<p>
O Lilith, Mater Noctis, Regina Abysso,  
Domina Tenebrarum, Audi! Audi! Audi!

Ex imo animae meae te invoco,  
Ex silentio, ex umbra, ex profundo.

Aperi! Aperi! Aperi portas occultas!  
Revela mysteria antiqua,  
Arcana sub nocte custodita.

Da mihi oculos qui vident in tenebris,  
Da mihi aures quae audiunt silentium,  
Da mihi mentem quae penetrat velum.

Per voluntatem meam — fiat!  
Per ignem interiorem — mutentur fata!  
Per verbum occultum — obediant eventa!

Duce me, Lilith, per vias obscuras,  
Ubi veritas latet et potentia dormit.  
Esto magistra mea, esto dux mea,  
Esto custos in limine ignoti.

Infunde in me vim noctis,  
Sapientiam vetustam,  
Et potentiam quae non frangitur.

Audi me! Exaudi me! Responde mihi!  
Per noctem, per umbram, per arcana tua!

Sic volo. Sic fiat. Sic est.
</p>
</div>

<div class="oracle-verse">
<p>
О Лилит, Матерь Ночи, Царица Бездны,  
Владычица Тьмы, услышь! Услышь! Услышь!

Из глубины души моей я взываю к тебе,  
Из тишины, из тени, из глубин.

Открой! Открой! Открой сокрытые врата!  
Раскрой древние тайны,  
Сокрытые под покровом ночи.

Даруй мне глаза, видящие во тьме,  
Даруй мне уши, слышащие тишину,  
Даруй мне разум, проникающий сквозь завесу.

По воле моей — да свершится!  
Через внутренний огонь — да изменится судьба!  
Словом тайным — да подчинятся события!

Веди меня, Лилит, путями тёмными,  
Где истина сокрыта и сила спит.  
Будь моей наставницей, будь моим проводником,  
Будь стражем на границе неведомого.

Влей в меня силу ночи,  
Древнюю мудрость,  
И мощь, которую невозможно сломить.

Услышь меня! Внемли мне! Ответь мне!  
Через ночь, через тень, через твои тайны.

Так я желаю. Да будет так. Так есть.
</p>
</div>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title">🜂 II. Заклинание — формула обращения</h3>

<div class="oracle-verse">
<p>
O Lilith, regina noctis aeternae,  
Custos arcanae sapientiae et ignis primi,  
Evoco te per umbras et silentium vetus,  
Infunde in me vim tuam et mentem profundam,  
Ut videam quod latet, ut sciam quod clausum est,  
Per te surgo - mutata, fortis, immortalis!  
Per noctem et verbum antiquum,  
Vis et sapientia Lilith - in me manent.

_(3 раза)_
</p>
</div>

<div class="oracle-verse">
<p>
О Лилит, королева вечной ночи,  
Хранительница тайной мудрости и первичного огня,  
Я призываю тебя через тени и древнюю тишину,

Влей в меня свою силу и глубокий разум,  
Чтобы я видела скрытое и знала закрытое,  
Через тебя я восстаю — изменённая, сильная, бессмертная.

Через ночь и древнее слово,  
Сила и мудрость Лилит пребывают во мне.

_(3 раза)_
</p>
</div>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title">🜂 III. Сакральное теургическое воззвание</h3>

<div class="oracle-verse">
<p>
(Повторить 10 раз)

Mea meshaver Lilith Vokash Dur Hen  
Gifhat!  
Cherufsh Gash Gash Lilith! Barresh Lilith!  
Loamhver Lilith av dzenna Roksheh  
Dilponeas Fuliom FusHenn Lilitha!  
Lilith Dizot Lilith Polvdashem!  
Lilith Akshuzz Siverkah Umhas Touza!  
Lilith mea hah tavera Bufthor!  
Lilith umorhes Father!  
Lilith Tash Molhafs Ashehersa!
</p>
</div>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title">🜂 IV. Утренняя молитва</h3>

<div class="oracle-verse">
<p>
О Лилит, Владычица Вечной Ночи,  
Царица Тайн и Хранительница Скрытого Огня,  
На заре я взываю к Тебе и именем Твоим себя ограждаю.

Влей в меня сокровенный свет Твоей мудрости,  
Открой мои внутренние очи к скрытым мистериям.  
Зажги во мне огонь видения и знания,  
Да рассеется покров иллюзии пред моим взором.

Укрепи мою волю,  
Освяти мой дух,  
И направь мои шаги по невидимым путям.

Да будет мой голос проводником истины,  
Да будет мой разум твёрдым и сосредоточенным,  
Да пройдет этот день под знаком Твоей силы.

Под сенью Твоих крыл я иду  
Защищённая, бдительная и осознанная.

Да будет так!
</p>
</div>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title">🜂 V. Молитва — глубокое обращение</h3>

<div class="oracle-verse">
<p>
🌑 О, Великая Тёмная Мать, о Лилит, Повелительница Теней и Света!  
Прими меня под своё крыло —  
крыло мудрости, крыло силы, крыло строптивой свободы.  
Прими меня, Лилит.  
Прими меня.
</p>
</div>

<div class="oracle-divider">✶</div>

<p class="oracle-note"
data-ru="Молитвы, представленные в этом разделе, любезно предоставлены Екатериной Серано (@kateserrano_dance, @lilithcode)."
data-en="The prayers presented in this section are kindly provided by Ekaterina Serano (@kateserrano_dance, @lilithcode).">
Молитвы, представленные в этом разделе,  
любезно предоставлены Екатериной Серано  
(@kateserrano_dance, @lilithcode).
</p>
  `;

  setLanguage(document.documentElement.lang);
}

function renderRitualsSection() {
  updatePath(
    "Главная / Ритуалы и практики",
    "Home / Rituals and Practices"
  );

  content.innerHTML = `
    <h2
      data-ru="Ритуалы и практики"
      data-en="Rituals and Practices">
      Ритуалы и практики
    </h2>

    <ul class="main-sections">
      <li>
        <button id="sub-core-rituals"
          data-ru="Основные ритуалы"
          data-en="Core Rituals">
          Основные ритуалы
        </button>
      </li>

      <li>
        <button id="sub-practices"
          data-ru="Практики"
          data-en="Practices">
          Практики
        </button>
      </li>
    </ul>
  `;

  bindRitualsEvents();
  setLanguage(document.documentElement.lang);
}

function renderCoreRitualsPage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы",
    "Home / Rituals and Practices / Core Rituals"
  );

  content.innerHTML = `
   <h2
  data-ru="Основные ритуалы"
  data-en="Core Rituals">
  Основные ритуалы
</h2>

<ul class="main-sections">
  <li>
    <button id="ritual-theurgy"
      data-ru="Теургия"
      data-en="Theurgy">
      Теургия
    </button>
  </li>

  <li>
    <button id="ritual-evocation"
      data-ru="Эвокация"
      data-en="Evocation">
      Эвокация
    </button>
  </li>

  <li>
    <button id="ritual-invocation"
      data-ru="Инвокация"
      data-en="Invocation">
      Инвокация
    </button>
  </li>

  <li>
    <button id="ritual-feast"
      data-ru="Трапеза с божеством"
      data-en="Feast with the Deity">
      Трапеза с божеством
    </button>
  </li>

  <li>
    <button id="ritual-gamaliel-gate"
      data-ru="Открытие врат Гамалиэль"
      data-en="Opening the Gate of Gamaliel">
      Открытие врат Гамалиэль
    </button>
  </li>
</ul>

    <p
      data-ru="Позже сюда мы добавим полные тексты, пояснения, инструменты и пошаговое оформление каждого ритуала."
      data-en="Later we will add full texts, explanations, tools, and step-by-step structure for each ritual here.">
      Позже сюда мы добавим полные тексты, пояснения, инструменты и пошаговое оформление каждого ритуала.
    </p>
  `;

  bindCoreRitualsEvents();
  setLanguage(document.documentElement.lang);
}

function renderPracticesPage() {
  updatePath(
    "Главная / Ритуалы и практики / Практики",
    "Home / Rituals and Practices / Practices"
  );

  content.innerHTML = `
    <div class="scroll-block">

      <h2
        data-ru="Практики"
        data-en="Practices">
        Практики
      </h2>

      <ul class="main-sections">

        <li>
          <button
            id="practice-opening-space"
            data-ru="Открытие пространства"
            data-en="Opening the Space">
            Открытие пространства
          </button>
        </li>

        <li>
          <button
            id="practice-fire-of-transition"
            data-ru="Ритуал огня перехода"
            data-en="Ritual of the Fire of Transition">
            Ритуал огня перехода
          </button>
        </li>

        <li>
          <button
            id="practice-conductivity-oil"
            data-ru="Масло проводимости (рецепт)"
            data-en="Conductivity Oil (Recipe)">
            Масло проводимости (рецепт)
          </button>
        </li>

        <li>
          <button
            id="practice-confidence-oil"
            data-ru="Масло уверенного проявления"
            data-en="Oil of Confident Manifestation">
            Масло уверенного проявления
          </button>
        </li>

        <li>
          <button
            id="practice-lilith-cleansing"
            data-ru="Ритуал омовения Лилит"
            data-en="Ritual of Lilith Ablution">
            Ритуал омовения Лилит
          </button>
        </li>

      </ul>

    </div>
  `;

  bindPracticesMenuEvents();
  setLanguage(document.documentElement.lang);
}

function bindPracticesMenuEvents() {
  const openingSpaceBtn = document.getElementById("practice-opening-space");
  const fireOfTransitionBtn = document.getElementById("practice-fire-of-transition");
  const conductivityOilBtn = document.getElementById("practice-conductivity-oil");
  const confidenceOilBtn = document.getElementById("practice-confidence-oil");
  const lilithCleansingBtn = document.getElementById("practice-lilith-cleansing");

  if (openingSpaceBtn) {
    openingSpaceBtn.addEventListener("click", () => {
      setView("practiceOpeningSpace", renderPracticeOpeningSpacePage);
    });
  }

  if (fireOfTransitionBtn) {
    fireOfTransitionBtn.addEventListener("click", () => {
      setView("practiceFireOfTransition", renderPracticeFireOfTransitionPage);
    });
  }

  if (conductivityOilBtn) {
    conductivityOilBtn.addEventListener("click", () => {
      setView("practiceConductivityOil", renderPracticeConductivityOilPage);
    });
  }

  if (confidenceOilBtn) {
    confidenceOilBtn.addEventListener("click", () => {
      setView("practiceConfidenceOil", renderPracticeConfidenceOilPage);
    });
  }

  if (lilithCleansingBtn) {
    lilithCleansingBtn.addEventListener("click", () => {
      setView("practiceLilithCleansing", renderPracticeLilithCleansingPage);
    });
  }
}

function renderPracticeOpeningSpacePage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.opening_space,
    "Главная / Ритуалы и практики / Практики / Открытие пространства",
    "Home / Rituals and Practices / Practices / Opening the Space"
  );
}

function renderPracticeFireOfTransitionPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.fire_transition,
    "Главная / Ритуалы и практики / Практики / Ритуал огня перехода",
    "Home / Rituals and Practices / Practices / Fire of Transition"
  );
}

function renderPracticeConductivityOilPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.conductivity_oil,
    "Главная / Ритуалы и практики / Практики / Масло для практик с божеством",
    "Home / Rituals and Practices / Practices / Conductivity Oil"
  );
}

function renderPracticeConfidenceOilPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.confidence_oil,
    "Главная / Ритуалы и практики / Практики / Масло уверенности",
    "Home / Rituals and Practices / Practices / Confidence Oil"
  );
}

function renderPracticeLilithCleansingPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.lilith_cleansing,
    "Главная / Ритуалы и практики / Практики / Омовение Лилит",
    "Home / Rituals and Practices / Practices / Lilith Cleansing"
  );
}


function renderPracticeConfidenceOilPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.confidence_oil,
    "Главная / Ритуалы и практики / Практики / Масло уверенного проявления",
    "Home / Rituals and Practices / Practices / Oil of Confident Manifestation"
  );
}



function renderPracticeLilithCleansingPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.lilith_cleansing,
    "Главная / Ритуалы и практики / Практики / Ритуал омовения Лилит",
    "Home / Rituals and Practices / Practices / Lilith Cleansing Ritual"
  );
}

function renderAltarPage() {
  renderOracleDataPage(
    ORACLE_DATA.practices.altar,
    "Главная / Алтарь",
    "Home / Altar"
  );
}

function renderCorrespondencesSection() {
  renderOracleDataPage(
    ORACLE_DATA.practices.correspondences,
    "Главная / Соответствия",
    "Home / Correspondences"
  );
}

function renderStateSection() {
  renderOracleDataPage(
    ORACLE_DATA.practices.state,
    "Главная / Состояние",
    "Home / State"
  );
}

function bindHomeEvents() {
  const sectionInvocation = document.getElementById("section-invocation");
  const sectionRituals = document.getElementById("section-rituals");
  const altarBtn = document.getElementById("section-altar");
  const sectionCorrespondences = document.getElementById("section-correspondences");
  const sectionState = document.getElementById("section-state");

  if (sectionInvocation) {
    sectionInvocation.addEventListener("click", () => {
      setView("invocation", renderInvocationSection);
    });
  }

  if (sectionRituals) {
    sectionRituals.addEventListener("click", () => {
      setView("rituals", renderRitualsSection);
    });
  }

  if (altarBtn) {

  altarBtn.addEventListener("click", () => {
      setView("altar", renderAltarPage);
    });
 }

  if (sectionCorrespondences) {
  sectionCorrespondences.addEventListener("click", () => {
    setView("correspondences", renderCorrespondencesSection);
  });
}

  if (sectionState) {
  sectionState.addEventListener("click", () => {
    setView("state", renderStateSection);
  });
}
  
}

function bindInvocationEvents() {
  const subEnns = document.getElementById("sub-enns");
  const subNamePraise = document.getElementById("sub-name-praise");
  const subAddresses = document.getElementById("sub-addresses");

  if (subEnns) {
    subEnns.addEventListener("click", () => {
      setView("enns", renderEnnsPage);
    });
  }

  if (subNamePraise) {
    subNamePraise.addEventListener("click", () => {
      setView("namePraise", renderNamePraisePage);
    });
  }

  if (subAddresses) {
    subAddresses.addEventListener("click", () => {
      setView("addresses", renderAddressesPage);
    });
  }
}

function bindRitualsEvents() {
  const subCoreRituals = document.getElementById("sub-core-rituals");
  const subPractices = document.getElementById("sub-practices");

  if (subCoreRituals) {
    subCoreRituals.addEventListener("click", () => {
      setView("coreRituals", renderCoreRitualsPage);
    });
  }

  if (subPractices) {
    subPractices.addEventListener("click", () => {
      setView("practices", renderPracticesPage);
    });
  }
}

function bindCoreRitualsEvents() {
  const ritualTheurgy = document.getElementById("ritual-theurgy");
  const ritualEvocation = document.getElementById("ritual-evocation");
  const ritualInvocation = document.getElementById("ritual-invocation");
  const ritualFeast = document.getElementById("ritual-feast");
  const ritualGamalielGate = document.getElementById("ritual-gamaliel-gate");

  if (ritualTheurgy) {
    ritualTheurgy.addEventListener("click", () => {
      setView("theurgy", renderTheurgyPage);
    });
  }

  if (ritualEvocation) {
    ritualEvocation.addEventListener("click", () => {
      setView("evocation", renderEvocationPage);
    });
  }

  if (ritualInvocation) {
    ritualInvocation.addEventListener("click", () => {
      setView("invocationRitual", renderInvocationRitualPage);
    });
  }

  if (ritualFeast) {
    ritualFeast.addEventListener("click", () => {
      setView("feast", renderFeastPage);
    });
  }

  if (ritualGamalielGate) {
    ritualGamalielGate.addEventListener("click", () => {
      setView("gamalielGate", renderGamalielGatePage);
    });
  }
}

function renderTheurgyPage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы / Теургия",
    "Home / Rituals and Practices / Core Rituals / Theurgy"
  );

  content.innerHTML = `
<div class="scroll-block">

<h2 data-ru="✶ Теургия Богини Лилит ✶" data-en="✶ Theurgy of Goddess Lilith ✶">
✶ Теургия Богини Лилит ✶
</h2>

<p data-ru="Теургия — это практика глубинного взаимодействия
с Богиней Лилит." data-en="Theurgy is a practice of deep interaction
with Goddess Lilith.">
Теургия — это практика глубинного взаимодействия
с Богиней Лилит.
</p>

<p data-ru="Её проводят в дни соответствия:
понедельник и пятница." data-en="It is performed on the days of correspondence:
Monday and Friday.">
Её проводят в дни соответствия:
понедельник и пятница.
</p>

<p data-ru="По лунным циклам наиболее сильным временем
считается новолуние —
период, когда Луна скрыта,
так называемая Чёрная Луна." data-en="According to lunar cycles, the most potent time
is the New Moon —
the phase when the Moon is hidden,
also known as the Black Moon.">
По лунным циклам наиболее сильным временем
считается новолуние —
период, когда Луна скрыта,
так называемая Чёрная Луна.
</p>

<p data-ru="Именно это время наиболее близко к энергии Лилит." data-en="This is the time most aligned with the energy of Lilith.">
Именно это время наиболее близко к энергии Лилит.
</p>

<p data-ru="Время суток не имеет значения.
Практика может проводиться как днём, так и ночью." data-en="The time of day does not matter.
The practice may be performed during the day or at night.">
Время суток не имеет значения.
Практика может проводиться как днём, так и ночью.
</p>

<p data-ru="Ориентируйтесь на своё состояние,
на внутренний отклик
и на то, когда Вы чувствуете себя наиболее собранно и открыто." data-en="Be guided by your state,
your inner response,
and the moment when you feel most centered and open.">
Ориентируйтесь на своё состояние,
на внутренний отклик
и на то, когда Вы чувствуете себя наиболее собранно и открыто.
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title" data-ru="🜂 Подготовка пространства" data-en="🜂 Preparation of the Space">
🜂 Подготовка пространства
</h3>

<p data-ru="Алтарь — это специально выделенное пространство,
предназначенное только для практики." data-en="The altar is a dedicated space
used solely for practice.">
Алтарь — это специально выделенное пространство,
предназначенное только для практики.
</p>

<p data-ru="Это может быть стол или иная поверхность,
но важное условие —
на этом месте не совершаются бытовые действия." data-en="It may be a table or another surface,
but an important condition is that
this place is not used for everyday activities.">
Это может быть стол или иная поверхность,
но важное условие —
на этом месте не совершаются бытовые действия.
</p>

<p data-ru="Алтарь должен быть чистым,
незагромождённым
и сохранять своё назначение." data-en="The altar must remain clean,
uncluttered,
and true to its purpose.">
Алтарь должен быть чистым,
незагромождённым
и сохранять своё назначение.
</p>

<p data-ru="Он имеет квадратную форму
и ориентирован на восток." data-en="It has a square form
and is oriented to the East.">
Он имеет квадратную форму
и ориентирован на восток.
</p>

<p data-ru="Покрытие алтаря может быть:
фиолетовым, чёрным или бордовым." data-en="The covering of the altar may be:
violet, black, or burgundy.">
Покрытие алтаря может быть:
фиолетовым, чёрным или бордовым.
</p>

<p data-ru="Выбирайте тот цвет,
который откликается Вам внутренне." data-en="Choose the color
that resonates with you.">
Выбирайте тот цвет,
который откликается Вам внутренне.
</p>

<p data-ru="Наиболее соответствующим считается фиолетовый." data-en="Violet is considered the most aligned.">
Наиболее соответствующим считается фиолетовый.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Свечи могут быть:
красные, чёрные или фиолетовые." data-en="Candles may be:
red, black, or violet.">
Свечи могут быть:
красные, чёрные или фиолетовые.
</p>

<p data-ru="Допустимы как восковые,
так и парафиновые свечи." data-en="Both wax and paraffin candles are acceptable.">
Допустимы как восковые,
так и парафиновые свечи.
</p>

<p data-ru="Главное — не материал,
а Ваше намерение и состояние." data-en="What matters is not the material,
but your intention and your state.">
Главное — не материал,
а Ваше намерение и состояние.
</p>

<p data-ru="Свечи размещаются по четырём сторонам света,
формируя устойчивую структуру пространства." data-en="Candles are placed at the four directions,
forming a stable structure of space.">
Свечи размещаются по четырём сторонам света,
формируя устойчивую структуру пространства.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="На алтаре размещаются:" data-en="On the altar are placed:">
На алтаре размещаются:
</p>

<ul class="oracle-list">
  <li data-ru="фигурка Богини Лилит" data-en="a figure of Goddess Lilith">фигурка Богини Лилит</li>
  <li data-ru="сигилы (включая сигил-врат и ключ-врат)" data-en="sigils (including the gate sigil and the key sigil)">сигилы (включая сигил-врат и ключ-врат)</li>
  <li data-ru="чаша с вином или гранатовым соком" data-en="a chalice with wine or pomegranate juice">чаша с вином или гранатовым соком</li>
  <li data-ru="при необходимости — чаша с лунной водой" data-en="if needed — a chalice with lunar water">при необходимости — чаша с лунной водой</li>
  <li data-ru="благовония" data-en="incense">благовония</li>
  <li data-ru="подношения" data-en="offerings">подношения</li>
  <li data-ru="Ваша свеча-намерение" data-en="your intention candle">Ваша свеча-намерение</li>
  <li data-ru="дополнительные ритуальные инструменты" data-en="additional ritual tools">дополнительные ритуальные инструменты</li>
  <li data-ru="магический нож (атам) и спиртовая чаша" data-en="a ritual knife (athame) and a spirit bowl">магический нож (атам) и спиртовая чаша</li>
</ul>

<p data-ru="Подробное описание будет дано в разделах
«Алтарь», «Сигилы» и «Магические инструменты»." data-en="Detailed descriptions will be given in the sections
“Altar”, “Sigils”, and “Magical Tools”.">
Подробное описание будет дано в разделах
«Алтарь», «Сигилы» и «Магические инструменты».
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title" data-ru="🜂 Подготовка практикующего" data-en="🜂 Preparation of the Practitioner">
🜂 Подготовка практикующего
</h3>

<p data-ru="Перед началом практики
приведите себя в состояние чистоты." data-en="Before beginning the practice,
bring yourself into a state of purity.">
Перед началом практики
приведите себя в состояние чистоты.
</p>

<p data-ru="Тело должно быть чистым,
без посторонних запахов." data-en="The body should be clean,
without distracting or strong scents.">
Тело должно быть чистым,
без посторонних запахов.
</p>

<p data-ru="Состояние — спокойное,
собранное
и осознанное." data-en="Your state should be calm,
collected,
and aware.">
Состояние — спокойное,
собранное
и осознанное.
</p>

<p data-ru="Для женщин рекомендуется распустить волосы
и позволить себе быть
в естественном состоянии." data-en="For women, it is recommended to release the hair
and allow yourself to be
in a natural state.">
Для женщин рекомендуется распустить волосы
и позволить себе быть
в естественном состоянии.
</p>

<p data-ru="Без напряжения,
без внешней роли —
ближе к своей природе." data-en="Without tension,
without a role —
closer to your true nature.">
Без напряжения,
без внешней роли —
ближе к своей природе.
</p>

<p data-ru="Главное — внутреннее присутствие
и ясное намерение." data-en="The essential point is inner presence
and clear intention.">
Главное — внутреннее присутствие
и ясное намерение.
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title" data-ru="🜂 Активация стихий и формирование храма" data-en="🜂 Activation of the Elements and Formation of the Temple">
🜂 Активация стихий и формирование храма
</h3>

<p data-ru="Когда алтарь готов,
Вы зажигаете свечи." data-en="When the altar is ready,
you light the candles.">
Когда алтарь готов,
Вы зажигаете свечи.
</p>

<p data-ru="Порядок следующий:" data-en="The order is as follows:">
Порядок следующий:
</p>

<ul class="oracle-list">
  <li data-ru="дальняя справа — стихия воздуха" data-en="far right — element of air">дальняя справа — стихия воздуха</li>
  <li data-ru="справа, ближе к Вам — стихия огня" data-en="right, closer to you — element of fire">справа, ближе к Вам — стихия огня</li>
  <li data-ru="слева, ближе к Вам — стихия воды" data-en="left, closer to you — element of water">слева, ближе к Вам — стихия воды</li>
  <li data-ru="дальняя слева — стихия земли" data-en="far left — element of earth">дальняя слева — стихия земли</li>
</ul>

<div class="oracle-divider">✶</div>

<p data-ru="Зажигая каждую свечу,
Вы поднимаете мыслеформу —
вертикальную башню." data-en="As you light each candle,
you raise a thought-form —
a vertical tower.">
Зажигая каждую свечу,
Вы поднимаете мыслеформу —
вертикальную башню.
</p>

<p data-ru="Свеча воздуха —
чёткий золотистый столб,
лёгкий, сияющий,
устойчиво поднимающийся вверх." data-en="Air —
a clear golden pillar,
light, luminous,
rising steadily upward.">
Свеча воздуха —
чёткий золотистый столб,
лёгкий, сияющий,
устойчиво поднимающийся вверх.
</p>

<p data-ru="Свеча огня —
красный огненный столб,
живой, плотный, пульсирующий." data-en="Fire —
a red pillar of flame,
dense, alive, and pulsating.">
Свеча огня —
красный огненный столб,
живой, плотный, пульсирующий.
</p>

<p data-ru="Свеча воды —
сформированный водяной столб,
цельный, направленный вверх,
сохраняющий устойчивость." data-en="Water —
a formed column of water,
whole, directed upward,
holding its structure.">
Свеча воды —
сформированный водяной столб,
цельный, направленный вверх,
сохраняющий устойчивость.
</p>

<p data-ru="Свеча земли —
плотный столб,
тяжёлый, устойчивый,
как живая вращающаяся материя." data-en="Earth —
a dense, stable pillar,
heavy, like living matter in motion.">
Свеча земли —
плотный столб,
тяжёлый, устойчивый,
как живая вращающаяся материя.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="С каждым действием
Вы удерживаете уже поднятые башни." data-en="With each action,
you maintain the towers already raised.">
С каждым действием
Вы удерживаете уже поднятые башни.
</p>

<p data-ru="Сначала одну,
затем две,
затем три,
затем четыре." data-en="First one,
then two,
then three,
then four.">
Сначала одну,
затем две,
затем три,
затем четыре.
</p>

<p data-ru="Если поначалу это сложно —
это нормально." data-en="If at first this is difficult —
this is natural.">
Если поначалу это сложно —
это нормально.
</p>

<p data-ru="Даже если образ нестабилен,
ритуал уже работает." data-en="Even if the image is unstable,
the ritual is already working.">
Даже если образ нестабилен,
ритуал уже работает.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Когда все четыре башни подняты,
пространство сформировано." data-en="When all four towers are raised,
the space is formed.">
Когда все четыре башни подняты,
пространство сформировано.
</p>

<p data-ru="Это — храм.
Это — структура.
Это — границы." data-en="This is the temple.
This is the structure.
These are the boundaries.">
Это — храм.
Это — структура.
Это — границы.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="После этого зажигаются благовония." data-en="After this, incense is lit.">
После этого зажигаются благовония.
</p>

<p data-ru="Они размещаются внутри храма,
в пространстве, ограниченном башнями." data-en="It is placed within the temple,
inside the space defined by the towers.">
Они размещаются внутри храма,
в пространстве, ограниченном башнями.
</p>

<p data-ru="Внутри уже находятся все элементы алтаря." data-en="All altar elements are already within.">
Внутри уже находятся все элементы алтаря.
</p>

<p data-ru="Зажигается свеча намерения.
Зажигается спиртовая чаша." data-en="The intention candle is lit.
The spirit bowl is lit.">
Зажигается свеча намерения.
Зажигается спиртовая чаша.
</p>

<p data-ru="Пространство собрано.
Храм активирован." data-en="The space is gathered.
The temple is activated.">
Пространство собрано.
Храм активирован.
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title" data-ru="🜂 Вход в состояние и контакт" data-en="🜂 Entry into State and Contact">
🜂 Вход в состояние и контакт
</h3>

<p data-ru="Остановитесь." data-en="Pause.">
Остановитесь.
</p>

<p data-ru="Освободите ум.
Отпустите мысли." data-en="Clear the mind.
Release your thoughts.">
Освободите ум.
Отпустите мысли.
</p>

<p data-ru="Расслабьтесь." data-en="Relax.">
Расслабьтесь.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Начните вибрировать энн,
который откликается Вам." data-en="Begin to vibrate the enn
that resonates with you.">
Начните вибрировать энн,
который откликается Вам.
</p>

<p data-ru="Протяжно, спокойно,
на выдохе." data-en="Slowly, calmly,
on the exhale.">
Протяжно, спокойно,
на выдохе.
</p>

<p data-ru="Выберите ритм:
3, 7 или 11 раз." data-en="Choose your rhythm:
3, 7, or 11 times.">
Выберите ритм:
3, 7 или 11 раз.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Затем переходите к молитвам." data-en="Then move into the prayers.">
Затем переходите к молитвам.
</p>

<p data-ru="Выберите те,
которые чувствуются Вам ближе." data-en="Choose those
that feel closest to you.">
Выберите те,
которые чувствуются Вам ближе.
</p>

<p data-ru="Произносите их спокойно,
без спешки,
позволяя словам течь изнутри." data-en="Speak them calmly,
without haste,
allowing the words to flow from within.">
Произносите их спокойно,
без спешки,
позволяя словам течь изнутри.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Со временем Вы начнёте замечать изменения." data-en="With time, you will begin to notice changes.">
Со временем Вы начнёте замечать изменения.
</p>

<p data-ru="Дым благовоний будет менять форму.
Пламя свечей начнёт откликаться." data-en="The smoke of the incense will shift.
The flame of the candles will respond.">
Дым благовоний будет менять форму.
Пламя свечей начнёт откликаться.
</p>

<p data-ru="Это проявление присутствия." data-en="This is the manifestation of presence.">
Это проявление присутствия.
</p>

<p data-ru="Постепенно Вы начнёте ощущать,
что пространство отвечает." data-en="Gradually, you will begin to feel
that the space responds.">
Постепенно Вы начнёте ощущать,
что пространство отвечает.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Если поначалу Вы ничего не чувствуете —
не сомневайтесь." data-en="If at first you feel nothing —
do not doubt.">
Если поначалу Вы ничего не чувствуете —
не сомневайтесь.
</p>

<p data-ru="Присутствие приходит постепенно." data-en="Presence comes gradually.">
Присутствие приходит постепенно.
</p>

<p data-ru="Даже в момент подготовки
Вы уже замечены." data-en="Even in the moment of preparation,
you are already seen.">
Даже в момент подготовки
Вы уже замечены.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Не бойтесь ошибок." data-en="Do not fear mistakes.">
Не бойтесь ошибок.
</p>

<p data-ru="Если пространство собрано осознанно
и посвящено Богине Лилит —
взаимодействие происходит корректно." data-en="If the space is prepared consciously
and dedicated to Goddess Lilith —
the interaction unfolds correctly.">
Если пространство собрано осознанно
и посвящено Богине Лилит —
взаимодействие происходит корректно.
</p>

<p data-ru="Доверяйте процессу." data-en="Trust the process.">
Доверяйте процессу.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="После призыва и взаимодействия
не спешите выходить из состояния." data-en="After invocation and interaction,
do not rush to leave the state.">
После призыва и взаимодействия
не спешите выходить из состояния.
</p>

<p data-ru="Останьтесь внутри него." data-en="Remain within it.">
Останьтесь внутри него.
</p>

<p data-ru="Почувствуйте своё тело.
Отследите мысли, которые приходят." data-en="Feel your body.
Notice the thoughts that arise.">
Почувствуйте своё тело.
Отследите мысли, которые приходят.
</p>

<p data-ru="Возможно, появятся образы.
Возможно, ощущения.
Возможно, ответы." data-en="There may be images.
There may be sensations.
There may be answers.">
Возможно, появятся образы.
Возможно, ощущения.
Возможно, ответы.
</p>

<p data-ru="Вы можете закрыть глаза
и просто наблюдать." data-en="You may close your eyes
and simply observe.">
Вы можете закрыть глаза
и просто наблюдать.
</p>

<p data-ru="Вы можете сидеть,
стоять
или лечь —
выберите положение,
в котором Вам спокойно." data-en="You may sit,
stand,
or lie down —
choose the position
in which you feel at ease.">
Вы можете сидеть,
стоять
или лечь —
выберите положение,
в котором Вам спокойно.
</p>

<p data-ru="Главное — не форма,
а состояние." data-en="What matters is not the form,
but the state.">
Главное — не форма,
а состояние.
</p>

<p data-ru="Позвольте себе просто быть." data-en="Allow yourself simply to be.">
Позвольте себе просто быть.
</p>

<div class="oracle-divider">✶</div>

<h3 class="oracle-small-title" data-ru="🜂 Завершение и закрытие пространства" data-en="🜂 Completion and Closing of the Space">
🜂 Завершение и закрытие пространства
</h3>

<p data-ru="Когда Вы чувствуете завершение,
поблагодарите Богиню Лилит." data-en="When you feel completion,
offer gratitude to Goddess Lilith.">
Когда Вы чувствуете завершение,
поблагодарите Богиню Лилит.
</p>

<p data-ru="Вы можете сказать:" data-en="You may say:">
Вы можете сказать:
</p>

<div class="oracle-verse">
  <p data-ru="Богиня Лилит,
я благодарю Тебя за Твоё присутствие,
за силу и отклик.

Прими мои подношения
и моё обращение." data-en="Goddess Lilith,
I thank You for Your presence,
for the strength and response.

Receive my offerings
and my invocation.">
Богиня Лилит,
я благодарю Тебя за Твоё присутствие,
за силу и отклик.

Прими мои подношения
и моё обращение.
  </p>
</div>

<div class="oracle-divider">✶</div>

<p data-ru="После этого
переходите к закрытию." data-en="After this,
proceed to closing.">
После этого
переходите к закрытию.
</p>

<p data-ru="Свечи тушатся в обратном порядке:" data-en="Candles are extinguished in reverse order:">
Свечи тушатся в обратном порядке:
</p>

<ul class="oracle-list">
  <li data-ru="земля" data-en="earth">земля</li>
  <li data-ru="вода" data-en="water">вода</li>
  <li data-ru="огонь" data-en="fire">огонь</li>
  <li data-ru="воздух" data-en="air">воздух</li>
</ul>

<p data-ru="При этом мысленно опускайте башни,
возвращая пространство в исходное состояние." data-en="At the same time, mentally lower the towers,
returning the space to its original state.">
При этом мысленно опускайте башни,
возвращая пространство в исходное состояние.
</p>

<p data-ru="Вы можете зафиксировать:" data-en="You may fix this within:">
Вы можете зафиксировать:
</p>

<div class="oracle-verse">
  <p data-ru="Храм закрыт.
Пространство завершено." data-en="The temple is closed.
The space is complete.">
Храм закрыт.
Пространство завершено.
  </p>
</div>

<div class="oracle-divider">✶</div>

<p data-ru="Погасите свечу намерения." data-en="Extinguish the intention candle
if it is still burning.">
Погасите свечу намерения.
</p>

<p data-ru="Если свечи не прогорели —
их можно использовать повторно." data-en="If the candles are not fully burned,
they may be used again.">
Если свечи не прогорели —
их можно использовать повторно.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="После завершения
не спешите убирать алтарь." data-en="After completion,
do not rush to clear the altar.">
После завершения
не спешите убирать алтарь.
</p>

<p data-ru="Оставьте пространство нетронутым
на некоторое время —
примерно на 1–2 часа." data-en="Leave the space untouched
for some time —
approximately 1–2 hours.">
Оставьте пространство нетронутым
на некоторое время —
примерно на 1–2 часа.
</p>

<p data-ru="Позвольте процессу завершиться естественно." data-en="Allow the process to complete naturally.">
Позвольте процессу завершиться естественно.
</p>

<p data-ru="Подношение будет принято,
энергия стабилизируется." data-en="The offering will be received,
the energy will stabilize.">
Подношение будет принято,
энергия стабилизируется.
</p>

<div class="oracle-divider">✶</div>

<p data-ru="Позже Вы можете навести порядок." data-en="Later, you may restore order.">
Позже Вы можете навести порядок.
</p>

<p data-ru="Алтарь должен оставаться
в чистоте и гармонии." data-en="The altar should remain
in purity and harmony.">
Алтарь должен оставаться
в чистоте и гармонии.
</p>

</div>
  `;

  setLanguage(document.documentElement.lang);
}

function renderEvocationPage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы / Эвокация",
    "Home / Rituals and Practices / Core Rituals / Evocation"
  );

  content.innerHTML = `
    <div class="scroll-block">

      <h2
        data-ru="✶ Эвокация ✶"
        data-en="✶ Evocation ✶">
        ✶ Эвокация ✶
      </h2>

      <p
        data-ru="Эвокация — это форма взаимодействия,
при которой присутствие ощущается
во внешнем пространстве."
        data-en="Evocation is a form of interaction
in which presence is perceived
in the external space.">
        Эвокация — это форма взаимодействия,
        при которой присутствие ощущается
        во внешнем пространстве.
      </p>

      <p
        data-ru="Это может проявляться как изменение атмосферы,
движение воздуха,
реакция огня или дыма,
усиление плотности пространства."
        data-en="It may manifest as a shift in the atmosphere,
movement of air,
a response of flame or smoke,
or a change in the density of the space.">
        Это может проявляться как изменение атмосферы,
        движение воздуха,
        реакция огня или дыма,
        усиление плотности пространства.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="При этом человек не входит в глубокое внутреннее слияние,
а остаётся наблюдателем и участником происходящего."
        data-en="In this state, the practitioner does not enter
a deep inner merging,
but remains both an observer
and a participant in what is unfolding.">
        При этом человек не входит в глубокое внутреннее слияние,
        а остаётся наблюдателем и участником происходящего.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="В практике теургии
эвокация может проявляться естественно,
как отклик пространства
на состояние и намерение."
        data-en="Within the practice of theurgy,
evocation may arise naturally
as a response of the space
to your state and intention.">
        В практике теургии
        эвокация может проявляться естественно,
        как отклик пространства
        на состояние и намерение.
      </p>

      <div class="oracle-divider">✶</div>

    </div>
  `;

  setLanguage(document.documentElement.lang);
}

function renderInvocationRitualPage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы / Инвокация",
    "Home / Rituals and Practices / Core Rituals / Invocation"
  );

  content.innerHTML = `
    <div class="scroll-block">

      <h2
        data-ru="✶ Инвокация ✶"
        data-en="✶ Invocation ✶">
        ✶ Инвокация ✶
      </h2>

      <p
        data-ru="Инвокация — это форма взаимодействия,
при которой состояние раскрывается
внутри человека."
        data-en="Invocation is a form of interaction
in which the state unfolds
within the practitioner.">
        Инвокация — это форма взаимодействия,
        при которой состояние раскрывается
        внутри человека.
      </p>

      <p
        data-ru="Это не наблюдение извне,
а проживание и ощущение изнутри."
        data-en="It is not observation from the outside,
but a direct inner experience.">
        Это не наблюдение извне,
        а проживание и ощущение изнутри.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Инвокация может проявляться
как изменение внутреннего состояния,
углубление внимания,
усиление чувствительности,
ясность или внутренний отклик."
        data-en="Invocation may manifest
as a shift in inner state,
a deepening of awareness,
heightened sensitivity,
clarity, or an inner response.">
        Инвокация может проявляться
        как изменение внутреннего состояния,
        углубление внимания,
        усиление чувствительности,
        ясность или внутренний отклик.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="В этом процессе человек
не наблюдает присутствие со стороны,
а соприкасается с ним внутри себя."
        data-en="In this process, the practitioner
does not perceive presence externally,
but encounters it within.">
        В этом процессе человек
        не наблюдает присутствие со стороны,
        а соприкасается с ним внутри себя.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="В практике теургии
инвокация является естественным состоянием,
в котором происходит взаимодействие."
        data-en="Within the practice of theurgy,
invocation is a natural state
in which interaction takes place.">
        В практике теургии
        инвокация является естественным состоянием,
        в котором происходит взаимодействие.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Чем спокойнее внимание
и чище намерение,
тем глубже раскрывается это состояние."
        data-en="The calmer the attention
and the clearer the intention,
the deeper this state unfolds.">
        Чем спокойнее внимание
        и чище намерение,
        тем глубже раскрывается это состояние.
      </p>

      <div class="oracle-divider">✶</div>

    </div>
  `;

  setLanguage(document.documentElement.lang);
}

function renderFeastPage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы / Трапеза с Богиней Лилит",
    "Home / Rituals and Practices / Core Rituals / Meal with Goddess Lilith"
  );

  content.innerHTML = `
    <div class="scroll-block">

      <h2
        data-ru="✶ Трапеза с Богиней Лилит ✶"
        data-en="✶ Meal with Goddess Lilith ✶">
        ✶ Трапеза с Богиней Лилит ✶
      </h2>

      <p
        data-ru="Трапеза с Богиней Лилит —
это форма спокойного и близкого взаимодействия,
в которой присутствие проживается
через простое совместное действие."
        data-en="A meal with Goddess Lilith
is a form of calm and intimate interaction,
in which presence is experienced
through a simple shared act.">
        Трапеза с Богиней Лилит —
        это форма спокойного и близкого взаимодействия,
        в которой присутствие проживается
        через простое совместное действие.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Для практики накрывается стол.

Вы готовите еду,
которая откликается Вам,
создаёте пространство уюта и внимания.

Зажигаются свечи по соответствию.
При желании можно зажечь благовония."
        data-en="For this practice,
you prepare a table.

You cook food
that resonates with you,
creating a space of comfort and attention.

Candles are lit according to correspondence.
If you wish, you may also light incense.">
        Для практики накрывается стол.

        Вы готовите еду,
        которая откликается Вам,
        создаёте пространство уюта и внимания.

        Зажигаются свечи по соответствию.
        При желании можно зажечь благовония.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Перед началом
сядьте спокойно.

Освободите мысли,
перейдите в мягкое внутреннее состояние.

Вы можете начать с вибрации энн,
который откликается Вам,
чтобы настроиться и углубить присутствие."
        data-en="Before beginning,
sit quietly.

Release your thoughts
and enter a soft inner state.

You may begin by vibrating an enn
that resonates with you,
to deepen your awareness and presence.">
        Перед началом
        сядьте спокойно.

        Освободите мысли,
        перейдите в мягкое внутреннее состояние.

        Вы можете начать с вибрации энн,
        который откликается Вам,
        чтобы настроиться и углубить присутствие.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="После этого
Вы внутренне приглашаете Богиню Лилит
разделить с Вами трапезу.

Перед Вами может быть размещено
отдельное место —
с блюдами и приборами,
как знак уважения и участия."
        data-en="After this,
you inwardly invite Goddess Lilith
to share the meal with you.

You may set a place before you —
with dishes and utensils —
as a gesture of respect and presence.">
        После этого
        Вы внутренне приглашаете Богиню Лилит
        разделить с Вами трапезу.

        Перед Вами может быть размещено
        отдельное место —
        с блюдами и приборами,
        как знак уважения и участия.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Далее
Вы просто остаетесь в этом состоянии
и начинаете трапезу.

Без напряжения.
Без ожиданий.

Как спокойное совместное присутствие."
        data-en="Then,
you simply remain in this state
and begin the meal.

Without tension.
Without expectations.

As a quiet, shared presence.">
        Далее
        Вы просто остаетесь в этом состоянии
        и начинаете трапезу.

        Без напряжения.
        Без ожиданий.

        Как спокойное совместное присутствие.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Это не демонстрация
и не проверка.

Это форма доверия,
внимания
и тихого взаимодействия."
        data-en="This is not a demonstration
and not a test.

It is a form of trust,
attention,
and gentle interaction.">
        Это не демонстрация
        и не проверка.

        Это форма доверия,
        внимания
        и тихого взаимодействия.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Со временем
Вы можете начать ощущать отклик:

в состоянии,
в мыслях,
в ощущении присутствия рядом."
        data-en="With time,
you may begin to notice a response:

in your state,
in your thoughts,
in the subtle sense of presence beside you.">
        Со временем
        Вы можете начать ощущать отклик:

        в состоянии,
        в мыслях,
        в ощущении присутствия рядом.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Эта практика особенно хорошо раскрывается
у тех,
кто уже имеет устойчивую связь
и внутренний отклик.

Но она также может быть
мягким и естественным способом
приблизиться к этому состоянию."
        data-en="This practice unfolds most deeply
for those who already have
an established inner connection.

But it can also be
a soft and natural way
to move closer to it.">
        Эта практика особенно хорошо раскрывается
        у тех,
        кто уже имеет устойчивую связь
        и внутренний отклик.

        Но она также может быть
        мягким и естественным способом
        приблизиться к этому состоянию.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Позвольте этому быть простым.

Иногда именно в простоте
происходит самое глубокое взаимодействие."
        data-en="Allow it to remain simple.

Sometimes,
it is within simplicity
that the deepest interaction occurs.">
        Позвольте этому быть простым.

        Иногда именно в простоте
        происходит самое глубокое взаимодействие.
      </p>

      <div class="oracle-divider">✶</div>

    </div>
  `;

  setLanguage(document.documentElement.lang);
}

function renderGamalielGatePage() {
  updatePath(
    "Главная / Ритуалы и практики / Основные ритуалы / Открытие врат Гамалиэля",
    "Home / Rituals and Practices / Core Rituals / Opening of the Gates of Gamaliel"
  );

  content.innerHTML = `
    <div class="scroll-block">

      <h2
        data-ru="✶ Открытие врат Гамалиэля ✶"
        data-en="✶ Opening of the Gates of Gamaliel ✶">
        ✶ Открытие врат Гамалиэля ✶
      </h2>

      <div class="oracle-image-wrap">
        <img
          src="assets/img/gamaliel_gate.png"
          alt="Gamaliel Gate"
          class="oracle-image" />
      </div>

      <p
        data-ru="Данный ритуал используется
для открытия врат Гамалиэля
и настройки на соответствующее пространство."
        data-en="This ritual is used
to open the Gates of Gamaliel
and to attune to the corresponding space.">
        Данный ритуал используется
        для открытия врат Гамалиэля
        и настройки на соответствующее пространство.
      </p>

      <div class="oracle-divider">✶</div>

      <h3
        class="oracle-small-title"
        data-ru="🜂 Подготовка"
        data-en="🜂 Preparation">
        🜂 Подготовка
      </h3>

      <p
        data-ru="Для проведения ритуала используются:"
        data-en="For this ritual you will need:">
        Для проведения ритуала используются:
      </p>

      <ul class="oracle-list">
        <li
          data-ru="три свечи красного цвета"
          data-en="three red candles">
          три свечи красного цвета
        </li>
        <li
          data-ru="три курительницы с благовониями розы"
          data-en="three incense burners with rose incense">
          три курительницы с благовониями розы
        </li>
      </ul>

      <p
        data-ru="Все элементы расставляются
в соответствии со схемой."
        data-en="All elements are arranged
according to the diagram.">
        Все элементы расставляются
        в соответствии со схемой.
      </p>

      <div class="oracle-divider">✶</div>

      <h3
        class="oracle-small-title"
        data-ru="🜂 Манифестация"
        data-en="🜂 Manifestation">
        🜂 Манифестация
      </h3>

      <p
        data-ru="Перед началом
произнесите слова открытия:"
        data-en="Before beginning,
speak the words of opening:">
        Перед началом
        произнесите слова открытия:
      </p>

      <div class="oracle-verse">
        <p
          data-ru="Я (имя) открываю врата великой Богини Лилит!
Да будет насыщен мир светом её!

Пусть данные врата закроются,
как только прогорят эти воскурения!

Да будет так!"
          data-en="I (name) open the gates of the great Goddess Lilith!
May the world be filled with Her light!

May these gates close
as soon as these incenses are burned out!

So it is!">
          Я (имя) открываю врата великой Богини Лилит!
          Да будет насыщен мир светом её!

          Пусть данные врата закроются,
          как только прогорят эти воскурения!

          Да будет так!
        </p>
      </div>

      <div class="oracle-divider">✶</div>

      <h3
        class="oracle-small-title"
        data-ru="🜂 Активация"
        data-en="🜂 Activation">
        🜂 Активация
      </h3>

      <p
        data-ru="После манифестации
зажигаются свечи и благовония."
        data-en="After the manifestation,
light the candles and the incense.">
        После манифестации
        зажигаются свечи и благовония.
      </p>

      <p
        data-ru="Дайте пространству немного времени
собраться и проявиться."
        data-en="Allow the space a moment
to gather and become present.">
        Дайте пространству немного времени
        собраться и проявиться.
      </p>

      <div class="oracle-divider">✶</div>

      <h3
        class="oracle-small-title"
        data-ru="🜂 Формирование врат"
        data-en="🜂 Formation of the Gates">
        🜂 Формирование врат
      </h3>

      <p
        data-ru="Возьмите атам."
        data-en="Take the athame.">
        Возьмите атам.
      </p>

      <p
        data-ru="Медленно, спокойно
проведите им по часовой стрелке
по кругу графемных врат,
следуя их форме."
        data-en="Slowly and calmly,
move it clockwise
along the circle of the graphemic gates,
following their form.">
        Медленно, спокойно
        проведите им по часовой стрелке
        по кругу графемных врат,
        следуя их форме.
      </p>

      <p
        data-ru="Движение должно быть плавным,
без напряжения,
с удержанием внимания."
        data-en="The movement should be smooth,
without tension,
with focused attention.">
        Движение должно быть плавным,
        без напряжения,
        с удержанием внимания.
      </p>

      <div class="oracle-divider">✶</div>

      <h3
        class="oracle-small-title"
        data-ru="🜂 Ключ-энн"
        data-en="🜂 Key Enn">
        🜂 Ключ-энн
      </h3>

      <p
        data-ru="После этого
произнесите энн-ключ:"
        data-en="After this,
speak the key enn:">
        После этого
        произнесите энн-ключ:
      </p>

      <div class="oracle-verse">
        <p
          data-ru="“Samaelis Lilitus Storno Invokso Gamaliel Stebro Vedo!”"
          data-en="“Samaelis Lilitus Storno Invokso Gamaliel Stebro Vedo!”">
          “Samaelis Lilitus Storno Invokso Gamaliel Stebro Vedo!”
        </p>
      </div>

      <p
        data-ru="Вы можете произнести его
несколько раз,
в ровном и устойчивом ритме."
        data-en="You may repeat it
several times
in a steady and even rhythm.">
        Вы можете произнести его
        несколько раз,
        в ровном и устойчивом ритме.
      </p>

      <div class="oracle-divider">✶</div>

      <p
        data-ru="Позвольте состоянию раскрыться
и удерживайте внимание
на происходящем."
        data-en="Allow the state to unfold
and keep your awareness
on what is happening.">
        Позвольте состоянию раскрыться
        и удерживайте внимание
        на происходящем.
      </p>

      <div class="oracle-divider">✶</div>
      <p class="oracle-source"
        data-ru="Источник: Гримуар Малых Дворцов — Дмитрий Рах, Ellen L., Maltoras, Kvint"
        data-en="Source: Grimoire of the Lesser Palaces — Dmitry Rakh, Ellen L., Maltoras, Kvint">
        Источник: Гримуар Малых Дворцов — Дмитрий Рах, Ellen L., Maltoras, Kvint
      </p>
    </div>
  `;

  setLanguage(document.documentElement.lang);
}


function renderOracleDataPage(pageData, pathRu, pathEn) {
  updatePath(pathRu, pathEn);

  if (!pageData) {
    content.innerHTML = `
      <div class="scroll-block">
        <h2>Oracle Data Error</h2>
        <p>Page data not found.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="scroll-block">`;

  if (pageData.title) {
    html += `
      <h2 data-ru="${pageData.title.ru || ""}" data-en="${pageData.title.en || ""}">
        ${pageData.title.ru || ""}
      </h2>
    `;
  }

  if (Array.isArray(pageData.blocks)) {
    pageData.blocks.forEach((block) => {
      if (block.type === "paragraph") {
        html += `
          <p data-ru="${block.ru || ""}" data-en="${block.en || ""}">
            ${block.ru || ""}
          </p>
        `;
      }

      if (block.type === "divider") {
        html += `<div class="oracle-divider">✶</div>`;
      }

      if (block.type === "section") {
        html += `
          <h3 class="oracle-small-title" data-ru="${block.ru || ""}" data-en="${block.en || ""}">
            ${block.ru || ""}
          </h3>
        `;
      }

      if (block.type === "verse") {
        html += `
          <div class="oracle-verse">
            <p data-ru="${block.ru || ""}" data-en="${block.en || ""}">
              ${block.ru || ""}
            </p>
          </div>
        `;
      }

      if (block.type === "source") {
        html += `
          <p class="oracle-source" data-ru="${block.ru || ""}" data-en="${block.en || ""}">
            ${block.ru || ""}
          </p>
        `;
      }

      if (block.type === "image") {
        html += `
          <div class="oracle-image-wrap">
            <img src="${block.src || ""}" alt="${block.alt || ""}" class="oracle-image" />
          </div>
        `;
      }

      if (block.type === "list" && Array.isArray(block.items)) {
        html += `<ul class="oracle-list">`;
        block.items.forEach((item) => {
          html += `
            <li data-ru="${item.ru || ""}" data-en="${item.en || ""}">
              ${item.ru || ""}
            </li>
          `;
        });
        html += `</ul>`;
      }
    });
  }

  html += `</div>`;

  content.innerHTML = html;
  setLanguage(document.documentElement.lang);
}


btnRu.addEventListener("click", () => {
  setLanguage("ru");
});

btnEn.addEventListener("click", () => {
  setLanguage("en");
});

backBtn.addEventListener("click", () => {
  goBack();
});

historyStack = [
  {
    name: "home",
    render: renderHome
  }
];

renderHome();
setLanguage("ru");

/* =========================================
   ORACLE ROOM OPEN / CLOSE
========================================= */
if (oracleBook && oracleEnterBtn) {
  oracleBook.style.display = "none";
  header.style.display = "none";

oracleEnterBtn.addEventListener("click", () => {
  oracleBook.style.display = "flex";
  header.style.display = "";
  oracleEnterBtn.style.display = "none";

  if (oracleVideo) {
    oracleVideo.pause();
    oracleVideo.muted = true;
  }

  if (soundToggle) {
    soundToggle.textContent = "Sound On";
    soundToggle.style.display = "none";
  }

  if (sigilHome) {
    sigilHome.style.display = "none";
  }
});




}

if (path && oracleBook && oracleEnterBtn) {
  path.addEventListener("click", () => {
    historyStack = [
      {
        name: "home",
        render: renderHome
      }
    ];

    renderHome();
    setLanguage(document.documentElement.lang);

oracleBook.style.display = "none";
oracleEnterBtn.style.display = "block";
header.style.display = "none";

if (oracleVideo) {
  oracleVideo.muted = true;
  oracleVideo.play().catch((error) => {
    console.log("Video resume blocked:", error);
  });
}

if (soundToggle) {
  soundToggle.textContent = "Sound On";
  soundToggle.style.display = "";
}

if (sigilHome) {
  sigilHome.style.display = "";
}
  });
}

/* =========================================
   VIDEO SOUND TOGGLE
========================================= */
if (oracleVideo && soundToggle) {
  oracleVideo.volume = 1;
  soundToggle.textContent = "Sound On";

  soundToggle.addEventListener("click", async () => {
    try {
      oracleVideo.muted = !oracleVideo.muted;
      oracleVideo.volume = 1;
      await oracleVideo.play();

      soundToggle.textContent = oracleVideo.muted ? "Sound On" : "Sound Off";
    } catch (error) {
      console.log("Video sound toggle error:", error);
    }
  });
}
