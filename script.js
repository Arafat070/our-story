// ==========================================================
// ⚙️ НАСТРОЙКИ — ЗАМЕНИ НА СВОИ ЗНАЧЕНИЯ!
// ==========================================================
const TELEGRAM_BOT_TOKEN = "8943646784:AAHGSWpQDa6O1DH32N4dHD49P9-pZbKWdx8";
const TELEGRAM_CHAT_ID = "992638774";

// 📅 Дата начала отношений
const START_DATE = new Date(2025, 1, 14, 0, 0, 0);

// 🎂 Годовщина
const ANNIVERSARY_MONTH = 1;
const ANNIVERSARY_DAY = 14;

// 💬 Комплименты для дартса
const DARTS_COMPLIMENTS = [
  "Твоя улыбка — моё любимое зрелище в мире 💖",
  "Ты самая красивая, когда просто смеёшься 💘",
  "С тобой каждый день — это праздник 💝",
  "Твои глаза ярче всех звёзд 💗",
  "Ты делаешь меня лучше каждый день 💓",
  "Я люблю тебя больше, чем вчера, но меньше, чем завтра ❤️",
];

// 🔮 Предсказания для карт
const FORTUNES = [
  "Скоро вас ждёт незабываемое путешествие вдвоём ✈️",
  "Ваша любовь будет расти с каждым днём 📈💕",
  "Вас ждёт много тёплых вечеров вместе 🌙",
  "Следующий год принесёт вам много радостных моментов 🎉",
  "Вы станете ещё ближе друг к другу 💞",
  "Вас ждёт романтический сюрприз 💐",
  "Ваша история будет долгой и счастливой 📖",
  "Скоро сбудется мечта, о которой вы говорили 🌟",
  "Вы будете смеяться вместе до самого утра 😄",
  "Судьба приготовила вам что-то особенное 🎁",
  "Ваша любовь пройдёт через все испытания 💪❤️",
  "Каждый день с тобой — это подарок 🎀",
];

// ==========================================================
// 💝 ОТКРЫТКА ПРИ ВХОДЕ + МУЗЫКА
// ==========================================================
const greetingCard = document.getElementById("greetingCard");
const envelope = document.getElementById("envelope");
const musicBtn = document.getElementById("musicBtn");
let bgMusic = null;
let musicStarted = false;

// Блокируем скролл пока открытка открыта
document.body.classList.add("locked");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  // Запускаем музыку сразу после клика
  if (!bgMusic) {
    bgMusic = new Audio("music/letali.mp3");
    bgMusic.loop = true;

    bgMusic.addEventListener("ended", () => {
      musicBtn.textContent = "🎵";
      musicBtn.classList.remove("playing");
    });
  }

  if (bgMusic.paused) {
    bgMusic
      .play()
      .then(() => {
        musicBtn.textContent = "⏸";
        musicBtn.classList.add("playing");
        musicStarted = true;
      })
      .catch((err) => {
        console.log("Автовоспроизведение не сработало:", err);
      });
  }

  // Через секунду закрываем открытку
  setTimeout(() => {
    greetingCard.classList.add("hidden");
    document.body.classList.remove("locked");

    // Через ещё 0.8 сек полностью удаляем из DOM (по желанию)
    setTimeout(() => {
      greetingCard.style.display = "none";
    }, 800);
  }, 1400);
});

// Кнопка музыки (работает и после открытки)
musicBtn.addEventListener("click", () => {
  if (!bgMusic) {
    bgMusic = new Audio("music/letali.mp3");
    bgMusic.loop = true;
  }

  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicBtn.textContent = "⏸";
      musicBtn.classList.add("playing");
    });
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🎵";
    musicBtn.classList.remove("playing");
  }
});

// ==========================================================
// 🎨 ПАДАЮЩИЕ СЕРДЕЧКИ
// ==========================================================
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💓", "🌸"];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: -50,
    size: 12 + Math.random() * 18,
    speed: 0.5 + Math.random() * 1.2,
    swayPhase: Math.random() * Math.PI * 2,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    opacity: 0.4 + Math.random() * 0.5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.5,
  };
}

setInterval(() => {
  if (hearts.length < 25) hearts.push(createHeart());
}, 800);

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.swayPhase += 0.02;
    h.x += Math.sin(h.swayPhase) * 0.5;
    h.rotation += h.rotationSpeed;

    ctx.save();
    ctx.globalAlpha = h.opacity;
    ctx.translate(h.x, h.y);
    ctx.rotate((h.rotation * Math.PI) / 180);
    ctx.font = `${h.size}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(h.emoji, 0, 0);
    ctx.restore();

    if (h.y > canvas.height + 50) hearts.splice(i, 1);
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();

// ==========================================================
// 🌙 ТЕМА
// ==========================================================
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ==========================================================
// 📜 REVEAL
// ==========================================================
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ==========================================================
// ⏱️ СЧЁТЧИК ВМЕСТЕ
// ==========================================================
const daysCount = document.getElementById("daysCount");
const hoursCount = document.getElementById("hoursCount");
const minutesCount = document.getElementById("minutesCount");
const secondsCount = document.getElementById("secondsCount");
const togetherDateLabel = document.getElementById("togetherDateLabel");
const fmt = (n) => String(n).padStart(2, "0");

togetherDateLabel.textContent = `${fmt(START_DATE.getDate())}.${fmt(START_DATE.getMonth() + 1)}.${START_DATE.getFullYear()}`;

function updateTogetherCounter() {
  const now = new Date();
  const diff = now - START_DATE;
  if (diff < 0) return;

  const t = Math.floor(diff / 1000);
  daysCount.textContent = Math.floor(t / 86400);
  hoursCount.textContent = fmt(Math.floor((t % 86400) / 3600));
  minutesCount.textContent = fmt(Math.floor((t % 3600) / 60));
  secondsCount.textContent = fmt(t % 60);
}
updateTogetherCounter();
setInterval(updateTogetherCounter, 1000);

// ==========================================================
// 🎂 ТАЙМЕР ДО ГОДОВЩИНЫ
// ==========================================================
const annDays = document.getElementById("annDays");
const annHours = document.getElementById("annHours");
const annMinutes = document.getElementById("annMinutes");

function updateAnniversary() {
  const now = new Date();
  let target = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY);
  if (target < now)
    target = new Date(
      now.getFullYear() + 1,
      ANNIVERSARY_MONTH,
      ANNIVERSARY_DAY,
    );

  const t = Math.floor((target - now) / 1000);
  annDays.textContent = Math.floor(t / 86400);
  annHours.textContent = fmt(Math.floor((t % 86400) / 3600));
  annMinutes.textContent = fmt(Math.floor((t % 3600) / 60));
}
updateAnniversary();
setInterval(updateAnniversary, 60000);

// ==========================================================
// 🎠 СЛАЙДЕР
// ==========================================================
const track = document.getElementById("sliderTrack");
const slides = track ? Array.from(track.children) : [];
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dotsContainer = document.getElementById("sliderDots");
let currentSlide = 0;

if (slides.length > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function goToSlide(i) {
    currentSlide = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, idx) =>
      d.classList.toggle("active", idx === currentSlide),
    );
  }

  prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

  let startX = 0,
    isDragging = false;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50)
      goToSlide(diff > 0 ? currentSlide - 1 : currentSlide + 1);
    isDragging = false;
  });

  setInterval(() => goToSlide(currentSlide + 1), 6000);
}

// ==========================================================
// 💬 МОДАЛЬНОЕ ОКНО КАРТОЧЕК
// ==========================================================
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    modalText.textContent = card.dataset.message || "";
    const photo = card.dataset.photo || "";
    if (photo) {
      modalImage.src = photo;
      modalImage.style.display = "block";
      modalImage.onerror = () => (modalImage.style.display = "none");
    } else {
      modalImage.style.display = "none";
    }
    modal.classList.add("open");
  });
});

function closeModal() {
  modal.classList.remove("open");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ==========================================================
// 💌 КОНВЕРТ С ПИСЬМОМ
// ==========================================================
const letterEnvelope = document.getElementById("letterEnvelope");
letterEnvelope.addEventListener("click", () => {
  letterEnvelope.classList.toggle("open");
});

// ==========================================================
// 🎯 ДАРТС С СЕРДЕЧКАМИ
// ==========================================================
// ==========================================================
// 🎯 ДАРТС С СЕРДЕЧКАМИ
// ==========================================================
const dartTargets = document.querySelectorAll(".dart-target");
const dartsMessage = document.getElementById("dartsMessage");
const dartsScore = document.getElementById("dartsScore");
const dartsTotal = document.getElementById("dartsTotal");
const dartsResetBtn = document.getElementById("dartsResetBtn");

let hitCount = 0;
let totalCount = 0;
let usedCompliments = [];
let gameFinished = false;

dartsTotal.textContent = dartTargets.length;

function resetDartsGame() {
  hitCount = 0;
  totalCount = 0;
  usedCompliments = [];
  gameFinished = false;

  dartsScore.textContent = "0";
  dartsTotal.textContent = dartTargets.length;
  dartsMessage.textContent = "Нажми на любое сердечко 🎯";
  dartsResetBtn.style.display = "none";

  dartTargets.forEach((t) => {
    t.classList.remove("hit", "miss");
    t.style.pointerEvents = "auto";
    t.style.opacity = "1";
  });
}

dartTargets.forEach((target) => {
  target.addEventListener("click", () => {
    if (gameFinished) return;
    if (target.classList.contains("hit")) return;

    totalCount++;
    dartsTotal.textContent = totalCount;

    // 75% шанс попадания
    const isHit = Math.random() < 0.75;

    if (isHit) {
      target.classList.add("hit");
      hitCount++;
      dartsScore.textContent = hitCount;

      // Выбираем комплимент, который ещё не использовался
      let available = DARTS_COMPLIMENTS.filter(
        (c) => !usedCompliments.includes(c),
      );
      if (available.length === 0) {
        usedCompliments = [];
        available = DARTS_COMPLIMENTS;
      }
      const compliment =
        available[Math.floor(Math.random() * available.length)];
      usedCompliments.push(compliment);

      dartsMessage.textContent = compliment;
      dartsMessage.style.animation = "none";
      void dartsMessage.offsetWidth;
      dartsMessage.style.animation = "fadeInModal 0.5s ease";

      // Все мишени сбиты → финал
      if (hitCount === dartTargets.length) {
        gameFinished = true;
        setTimeout(() => {
          dartsMessage.textContent =
            "Ты попала в моё сердце с первого взгляда 💘";
          dartsResetBtn.style.display = "inline-block";
        }, 1200);
      }
    } else {
      target.classList.add("miss");
      setTimeout(() => target.classList.remove("miss"), 400);
      dartsMessage.textContent = "Ой, промах! Попробуй ещё раз 😊";
      dartsMessage.style.animation = "none";
      void dartsMessage.offsetWidth;
      dartsMessage.style.animation = "fadeInModal 0.5s ease";
    }
  });
});

dartsResetBtn.addEventListener("click", resetDartsGame);
// ==========================================================
// 🃏 КАРТЫ С ПРЕДСКАЗАНИЯМИ
// ==========================================================
const drawCardBtn = document.getElementById("drawCardBtn");
const fortuneCard = document.getElementById("fortuneCard");
const fortuneText = document.getElementById("fortuneText");
let usedFortunes = [];

drawCardBtn.addEventListener("click", () => {
  drawCardBtn.disabled = true;
  drawCardBtn.textContent = "🔮 Гадаю...";

  // Скрываем карту
  fortuneCard.classList.remove("show");

  setTimeout(() => {
    // Выбираем предсказание
    let available = FORTUNES.filter((f) => !usedFortunes.includes(f));
    if (available.length === 0) {
      usedFortunes = [];
      available = FORTUNES;
    }
    const fortune = available[Math.floor(Math.random() * available.length)];
    usedFortunes.push(fortune);

    fortuneText.textContent = fortune;
    fortuneCard.classList.add("show");

    drawCardBtn.disabled = false;
    drawCardBtn.textContent = "🃏 Вытянуть ещё";
  }, 700);
});

// ==========================================================
// 🎁 СЮРПРИЗ
// ==========================================================
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseContent = document.getElementById("surpriseContent");

surpriseBtn.addEventListener("click", () => {
  surpriseContent.classList.toggle("open");
  surpriseBtn.textContent = surpriseContent.classList.contains("open")
    ? "💝 Закрыть сюрприз"
    : "🎁 Открыть сюрприз";
});

// ==========================================================
// 📩 ФОРМА → TELEGRAM
// ==========================================================
const answerForm = document.getElementById("answerForm");
const formStatus = document.getElementById("formStatus");

answerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("answerText").value.trim();
  const submitBtn = answerForm.querySelector("button");

  if (!text) {
    formStatus.textContent = "Пожалуйста, напиши что-нибудь ❤️";
    formStatus.className = "form-status error";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Отправляю...";
  formStatus.textContent = "";

  const message = `💌 *Новый ответ с сайта "Наша история"*\n\n💬 *Сообщение:*\n${text}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );
    const data = await response.json();
    if (data.ok) {
      formStatus.textContent = "Спасибо! Твой ответ отправлен ❤️";
      formStatus.className = "form-status success";
      answerForm.reset();
    } else throw new Error(data.description);
  } catch (err) {
    console.error(err);
    formStatus.textContent = "Не удалось отправить 😔";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "❤️ Продолжить нашу историю";
  }
});
