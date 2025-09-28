document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const titleEl = document.getElementById("title");
  const bodyEl  = document.getElementById("body");

  // Nội dung thư
  const fullTitle = " Gửi Mẹ yêu dấu ";
  const fullBody = [
    "Mẹ kính yêu,",
    "Cảm ơn mẹ vì tất cả tình yêu thương và sự hy sinh.",
    "Con luôn tự hào khi có mẹ ở bên cạnh,",
    "những lời dạy dỗ của mẹ chính là hành trang quý giá nhất.",
    "Con chúc mẹ luôn mạnh khỏe, hạnh phúc và thật nhiều niềm vui 🌸💖",
    "Yêu mẹ rất nhiều!"
  ].join("\n");

  const titleSpeed = 90, bodySpeed = 60;
  let typingInterval = null, currentTimers = [];

  function clearTyping() {
    currentTimers.forEach(t => clearTimeout(t));
    currentTimers = [];
    if (typingInterval) clearInterval(typingInterval);
    typingInterval = null;
    titleEl.classList.remove("typing");
    bodyEl.classList.remove("typing");
    titleEl.innerHTML = "";
    bodyEl.innerHTML = "";
  }

  function typeText(el, text, perCharMs) {
    return new Promise(resolve => {
      el.classList.add("typing");
      let i = 0;
      typingInterval = setInterval(() => {
        i++;
        el.innerHTML = text.slice(0, i).replace(/\n/g, "<br>");
        if (i >= text.length) {
          clearInterval(typingInterval);
          typingInterval = null;
          el.classList.remove("typing");
          resolve();
        }
      }, perCharMs);
      currentTimers.push(typingInterval);
    });
  }

  async function startTypingSequence() {
    clearTyping();
    await typeText(titleEl, fullTitle, titleSpeed);
    await new Promise(r => currentTimers.push(setTimeout(r, 250)));
    await typeText(bodyEl, fullBody, bodySpeed);
  }

  envelope.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("open");
    if (isOpen) {
      clearTyping();
      currentTimers.push(setTimeout(startTypingSequence, 300));
    } else clearTyping();
  });

  /* --- Tim rơi --- */
  const heartColors = ["#ffc1e3", "#ffb6d9", "#ff99cc", "#ff80ab"];
  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 20 + "px"; 
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    heart.style.animationDuration = (10 + Math.random() * 4) + "s";
    document.getElementById("petals").appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
  }
  setInterval(createHeart, 220);

  /* --- Ảnh rơi --- */
  const images = [
    "z7055032716090_626f3ef4a55fd7d586ccbfb7cd69b78c.jpg",
    "z7056991361414_70d2f4f6fda77b7141c7246ac51be021.jpg",
    "z7055045764829_06b5e26dc636c1f7cfd9718129bbc4fa.jpg",
    "z7057340576470_daec71520152c9ce9e82d80d1b7aeec1.jpg",
    "z7058159796001_001af9cffde1402cb73c134ce1f3457e.jpg",
    "z7056580663882_344efe4c6fee4456b29d3ee6e6cf3c40.jpg",
    "z7057355303240_8356b02f6d73468937cd8393e9a871df.jpg",
    "z7057354208534_4752961c81280dcd8721966a36404f8d.jpg",
    "z7057353132952_2ade12be933f0165818bb741879af052.jpg",
    "z7058355727615_51c538442e97e4066bb0cb832194f143.jpg",
    ".jpg",



  ];
  function createPhoto() {
    const img = document.createElement("img");
    img.className = "photo";
    img.src = images[Math.floor(Math.random() * images.length)];
    img.style.left = Math.random() * 100 + "vw";
    const size = 80 + Math.random() * 100;
    img.style.width = size + "px";
    img.style.height = size + "px";
    img.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");
    img.style.animationDuration = (10 + Math.random() * 4) + "s";
    document.getElementById("photos").appendChild(img);
    setTimeout(() => img.remove(), 16000);
  }
  setInterval(createPhoto, 1700);

  /* --- Gallery ảnh (có caption + slideshow + nhạc) --- */
  let currentIndex = 0;
  const overlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlayImg");
  const galleryBtn = document.getElementById("galleryBtn");
  const closeBtn = document.getElementById("closeBtn");
  const captionEl = document.getElementById("caption");
  const bgMusic = document.getElementById("bgMusic"); // ✅ thêm nhạc

  const captions = [
    "Kỷ niệm 1 ",
    "Kỷ niệm 2 ",
    "Kỷ niệm 3 ",
    "Kỷ niệm 4 "
  ];

  let slideTimer = null;
  let captionTimer = null;

  function typeCaption(text) {
    captionEl.innerText = "";
    captionEl.classList.add("typing");
    let i = 0;
    clearInterval(captionTimer);
    captionTimer = setInterval(() => {
      captionEl.innerText = text.slice(0, i);
      i++;
      if (i > text.length) {
        clearInterval(captionTimer);
        captionEl.classList.remove("typing");
      }
    }, 80);
  }

  function showImage(index) {
    overlay.classList.add("open");
    overlayImg.classList.remove("show");
    setTimeout(() => {
      overlayImg.src = images[index];
      overlayImg.classList.add("show");
      typeCaption(captions[index] || "");
    }, 200);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function startSlideshow() {
    slideTimer = setInterval(nextImage, 6000);
  }
  function stopSlideshow() {
    clearInterval(slideTimer);
    slideTimer = null;
  }

  function hideOverlay() {
    overlay.classList.remove("open");
    overlayImg.classList.remove("show");
    overlayImg.src = "";
    captionEl.innerText = "";
    stopSlideshow();

    // ⏹ Dừng nhạc
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  galleryBtn.addEventListener("click", () => {
    currentIndex = 0;
    showImage(currentIndex);
    startSlideshow();

    // ▶️ Phát nhạc
    bgMusic.currentTime = 0;
    bgMusic.volume = 1.0;
    bgMusic.play().catch(err => console.log("Không phát nhạc:", err));
  });
  overlayImg.addEventListener("click", () => nextImage());
  closeBtn.addEventListener("click", hideOverlay);
  document.addEventListener("keydown", e => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") hideOverlay();
    if (e.key === "ArrowRight") nextImage();
  });
});

/* ---------- Thêm hiệu ứng Rough.js ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const env = document.getElementById("envelope");
  if (env) {
    const sketchCanvas = document.createElement("canvas");
    sketchCanvas.width = 500;
    sketchCanvas.height = 350;
    sketchCanvas.style.position = "absolute";
    sketchCanvas.style.left = "50%";
    sketchCanvas.style.top = "50%";
    sketchCanvas.style.transform = "translate(-50%, -50%)";
    sketchCanvas.style.pointerEvents = "none";
    document.body.appendChild(sketchCanvas);

    const rc = rough.canvas(sketchCanvas);
    rc.rectangle(50, 50, 400, 250, {
      roughness: 2.5,
      stroke: "black",
      fill: "beige",
      fillStyle: "hachure"
    });
  }
});
