// ==========================================================
// ⚙️ НАСТРОЙКИ — ЗАМЕНИ НА СВОИ ЗНАЧЕНИЯ!
// ==========================================================
const TELEGRAM_BOT_TOKEN = "ВСТАВЬ_СЮДА_ТОКЕН_БОТА";
const TELEGRAM_CHAT_ID = "ВСТАВЬ_СЮДА_CHAT_ID";

// 📅 Дата начала отношений (ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАС, МИНУТА)
// Внимание: месяц считается с 0 (январь = 0, февраль = 1)
const START_DATE = new Date(2025, 1, 14, 0, 0, 0); // 14 февраля 2025

// 🎂 Месяц и день годовщины
const ANNIVERSARY_MONTH = 1; // февраль = 1
const ANNIVERSARY_DAY = 14;

// ==========================================================
// 🎨 ПАДАЮЩИЕ СЕРДЕЧКИ (Canvas)
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
    sway: Math.random() * 2 - 1,
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
// 🌙 ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
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
// 🎵 МУЗЫКА — «Летали» (Ulukmanapo)
// ==========================================================
const musicBtn = document.getElementById("musicBtn");
let bgMusic = null;

musicBtn.addEventListener("click", () => {
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
      })
      .catch((err) => {
        console.log("Ошибка воспроизведения:", err);
      });
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🎵";
    musicBtn.classList.remove("playing");
  }
});

// ==========================================================
// 📜 АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ
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
// ⏱️ СЧЁТЧИК ДНЕЙ ВМЕСТЕ
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

  if (diff < 0) {
    daysCount.textContent = "0";
    hoursCount.textContent = "0";
    minutesCount.textContent = "0";
    secondsCount.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysCount.textContent = days;
  hoursCount.textContent = fmt(hours);
  minutesCount.textContent = fmt(minutes);
  secondsCount.textContent = fmt(seconds);
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

  const diff = target - now;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  annDays.textContent = days;
  annHours.textContent = fmt(hours);
  annMinutes.textContent = fmt(minutes);
}

updateAnniversary();
setInterval(updateAnniversary, 60000);

// ==========================================================
// 🎠 СЛАЙДЕР ФОТО
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
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentSlide - 1 : currentSlide + 1);
    }
    isDragging = false;
  });

  setInterval(() => goToSlide(currentSlide + 1), 6000);
}

// ==========================================================
// 💬 МОДАЛЬНОЕ ОКНО ДЛЯ КАРТОЧЕК (с фото)
// ==========================================================
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const message = card.dataset.message || "";
    const photo = card.dataset.photo || "";

    modalText.textContent = message;

    if (photo) {
      modalImage.src = photo;
      modalImage.style.display = "block";
      modalImage.onerror = () => {
        modalImage.style.display = "none";
      };
    } else {
      modalImage.style.display = "none";
      modalImage.src = "";
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
// 🎁 СЮРПРИЗ-КНОПКА
// ==========================================================
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseContent = document.getElementById("surpriseContent");

surpriseBtn.addEventListener("click", () => {
  surpriseContent.classList.toggle("open");
  if (surpriseContent.classList.contains("open")) {
    surpriseBtn.textContent = "💝 Закрыть сюрприз";
  } else {
    surpriseBtn.textContent = "🎁 Открыть сюрприз";
  }
});

// ==========================================================
// 📩 ФОРМА ОТВЕТА → TELEGRAM
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
    } else {
      throw new Error(data.description || "Ошибка отправки");
    }
  } catch (err) {
    console.error(err);
    formStatus.textContent = "Не удалось отправить. Попробуй позже 😔";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "❤️ Продолжить нашу историю";
  }
});

// ==========================================================
// 📱 QR-КОД
// ==========================================================
