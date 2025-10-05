document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const titleEl = document.getElementById("title");
  const bodyEl  = document.getElementById("body");

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

  // Điều chỉnh vị trí phong bì trên mobile
  function adjustEnvelopePosition() {
    if (window.innerWidth <= 768) {
      document.body.style.paddingTop = '20vh';
    } else {
      document.body.style.paddingTop = '0';
    }
  }
  
  adjustEnvelopePosition();
  window.addEventListener('resize', adjustEnvelopePosition);

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

  const fallingImages = [
    "z7055032716090_626f3ef4a55fd7d586ccbfb7cd69b78c.jpg",
    "z7056991361414_70d2f4f6fda77b7141c7246ac51be021.jpg",
    "z7055045764829_06b5e26dc636c1f7cfd9718129bbc4fa.jpg",
    "z7057340576470_daec71520152c9ce9e82d80d1b7aeec1.jpg",
    "z7058159796001_001af9cffde1402cb73c134ce1f3457e.jpg",
    "z7057355303240_8356b02f6d73468937cd8393e9a871df.jpg",
    "z7057354208534_4752961c81280dcd8721966a36404f8d.jpg",
    "z7057353132952_2ade12be933f0165818bb741879af052.jpg",
    "z7056580663882_344efe4c6fee4456b29d3ee6e6cf3c40.jpg",
    "z7058725890064_3e7d55db610ac2f8d7215e9ddd5e2a92.jpg",
    "z7078697923262_b536583a821dcaa90406ac708e137e21.jpg"
  ];
  
  function createPhoto() {
    const img = document.createElement("img");
    img.className = "photo";
    img.src = fallingImages[Math.floor(Math.random() * fallingImages.length)];
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

  const overlay = document.getElementById("overlay");
  const galleryBtn = document.getElementById("galleryBtn");
  const bgMusic = document.getElementById("bgMusic");

  let noCount = 0;

  function showValentineScreen() {
    overlay.classList.add("open");
    overlay.innerHTML = `
      <button id="closeBtn" aria-label="Đóng" style="position: fixed; top: 20px; right: 30px; font-size: 2.5rem; color: #d5678f; background: transparent; border: none; cursor: pointer; z-index: 10; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); transition: transform 0.2s;">×</button>
      
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd5e8 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
        
        <canvas id="valentineCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></canvas>
        
        <div id="questionBox" style="position: relative; z-index: 5; text-align: center; background: rgba(255, 255, 255, 0.7); padding: 50px 60px; border-radius: 30px; box-shadow: 0 15px 50px rgba(0,0,0,0.2); backdrop-filter: blur(10px); animation: floatBox 3s ease-in-out infinite; max-width: 90vw;">
          <h2 style="color: #d5678f; font-size: clamp(1.5rem, 5vw, 2rem); margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); font-weight: bold; animation: pulse 2s ease-in-out infinite;">Bạn có yêu mẹ của bạn không?</h2>
          <p id="pleaseText" style="color: #e91e63; font-size: clamp(1rem, 3vw, 1.3rem); margin-bottom: 40px; font-style: italic; transition: all 0.5s ease;">Please?</p>
          
          <div style="display: flex; gap: 25px; justify-content: center; align-items: center; flex-wrap: wrap;">
            <button id="yesBtn" style="background: #4CAF50; color: white; border: none; padding: 18px 40px; font-size: clamp(1rem, 3vw, 1.3rem); border-radius: 25px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3); font-weight: bold;">CÓ</button>
            <button id="noBtn" style="background: #f44336; color: white; border: none; padding: 18px 40px; font-size: clamp(0.9rem, 2.5vw, 1.1rem); border-radius: 25px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 10px rgba(244, 67, 54, 0.3); font-weight: bold;">KHÔNG</button>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes floatBox {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        #yesBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(76, 175, 80, 0.4); }
        #yesBtn:active { transform: scale(0.95); }
        #noBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(244, 67, 54, 0.4); }
        #noBtn:active { transform: scale(0.95); }
        
        @media (max-width: 768px) {
          #questionBox {
            padding: 30px 20px !important;
          }
        }
      </style>
    `;
    
    const canvas = document.getElementById('valentineCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    
    class FloatingParticle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(new FloatingParticle());
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const newCloseBtn = document.getElementById("closeBtn");
    const pleaseText = document.getElementById("pleaseText");

    newCloseBtn.addEventListener("mouseenter", () => {
      newCloseBtn.style.transform = "scale(1.2) rotate(90deg)";
    });
    newCloseBtn.addEventListener("mouseleave", () => {
      newCloseBtn.style.transform = "scale(1) rotate(0deg)";
    });

    yesBtn.addEventListener("click", () => {
      showHeartAnimation();
    });

    noBtn.addEventListener("click", () => {
      noCount++;
      
      if (noCount === 1) {
        pleaseText.style.opacity = '0';
        pleaseText.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          pleaseText.textContent = 'Hãy trả lời thật lòng nhé';
          pleaseText.style.opacity = '1';
          pleaseText.style.transform = 'translateY(0)';
        }, 300);
      }
      
      const newSize = 1 + noCount * 0.25;
      yesBtn.style.transform = `scale(${newSize})`;
      noBtn.style.transform = `scale(${1 - noCount * 0.08})`;
      if (noCount >= 5) {
        noBtn.style.display = "none";
      }
    });

    newCloseBtn.addEventListener("click", hideOverlay);
  }

  function showHeartAnimation() {
    overlay.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
        <canvas id="heartCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></canvas>
        <h1 id="mainText" style="position: relative; z-index: 10; color: rgba(255,235,200,0); font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 200; letter-spacing: clamp(6px, 2vw, 12px); text-align: center; padding: 0 40px; transform: translateY(50px) scale(0.9); text-shadow: none; line-height: 1.8; font-family: 'Great Vibes', cursive; opacity: 0; filter: blur(10px);">Cảm ơn vì tất cả</h1>
      </div>
    `;

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const heartPoints = [];
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      heartPoints.push({ x: x * 8, y: y * 8 });
    }

    let drawProgress = 0;
    const drawSpeed = 0.003;
    let glowIntensity = 0;
    let pulsePhase = 0;
    let heartOpacity = 1;
    
    const particles = [];
    const sparkles = [];
    const floatingHearts = [];
    const magicDust = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1;
        this.size = Math.random() * 5 + 2;
        this.hue = 320 + Math.random() * 40;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.life -= 0.006;
        this.vy += 0.02;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    class Sparkle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.size = Math.random() * 3 + 1.5;
        this.life = 1;
      }
      update() {
        this.life -= 0.012;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.shadowBlur = 25;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.life})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    class FloatingHeart {
      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 100;
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.size = Math.random() * 15 + 10;
        this.life = 1;
        this.opacity = 0;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }
      update() {
        this.rotation += this.rotationSpeed;
        if (this.opacity < 0.6) this.opacity += 0.01;
        this.y -= 0.3;
        this.life -= 0.003;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = 'rgba(255, 105, 180, 0.9)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('❤', -this.size/2, this.size/2);
        ctx.restore();
      }
    }
    
    class MagicDust {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.5;
        this.life = 1;
        this.size = Math.random() * 2 + 1;
        this.hue = Math.random() * 60 + 300;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= 0.01;
        this.life -= 0.008;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.7;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 80%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        floatingHearts.push(new FloatingHeart());
      }, i * 200);
    }

    function drawHeart() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      if (glowIntensity < 1) glowIntensity += 0.004;
      pulsePhase += 0.02;
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.08;
      
      if (drawProgress > 0.7) {
        const ringProgress = Math.min((drawProgress - 0.7) / 0.3, 1);
        
        ctx.save();
        ctx.globalAlpha = ringProgress * 0.4 * pulseScale * heartOpacity;
        ctx.strokeStyle = 'rgba(255, 105, 180, 0.8)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(255, 105, 180, 1)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      
      ctx.save();
      ctx.globalAlpha = heartOpacity;
      ctx.shadowBlur = 50 * glowIntensity * pulseScale * heartOpacity;
      ctx.shadowColor = `rgba(255, 20, 147, ${0.9 * glowIntensity * heartOpacity})`;
      
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(centerX - 100, centerY - 100, centerX + 100, centerY + 100);
      gradient.addColorStop(0, `rgba(255, 105, 180, ${Math.min(drawProgress * 2, 1) * heartOpacity})`);
      gradient.addColorStop(0.5, `rgba(255, 20, 147, ${Math.min(drawProgress * 2, 1) * heartOpacity})`);
      gradient.addColorStop(1, `rgba(255, 105, 180, ${Math.min(drawProgress * 2, 1) * heartOpacity})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const pointsToShow = Math.floor(heartPoints.length * drawProgress);
      
      for (let i = 0; i < pointsToShow; i++) {
        const point = heartPoints[i];
        const x = centerX + point.x;
        const y = centerY + point.y;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        if (i === pointsToShow - 1 && heartOpacity > 0.5) {
          if (Math.random() > 0.5) particles.push(new Particle(x, y));
          if (Math.random() > 0.7) sparkles.push(new Sparkle(x, y));
          if (Math.random() > 0.6) magicDust.push(new MagicDust(x, y));
        }
      }
      
      ctx.stroke();
      ctx.restore();
      
      particles.forEach((p, index) => {
        p.update();
        if (p.life <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.min(p.life, heartOpacity);
          p.draw();
          ctx.restore();
        }
      });
      
      sparkles.forEach((s, index) => {
        s.update();
        if (s.life <= 0) {
          sparkles.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.min(s.life, heartOpacity);
          s.draw();
          ctx.restore();
        }
      });
      
      floatingHearts.forEach((h, index) => {
        h.update();
        if (h.life <= 0) {
          floatingHearts.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.min(h.life * h.opacity, heartOpacity);
          h.draw();
          ctx.restore();
        }
      });
      
      magicDust.forEach((m, index) => {
        m.update();
        if (m.life <= 0) {
          magicDust.splice(index, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.min(m.life * 0.7, heartOpacity);
          m.draw();
          ctx.restore();
        }
      });
      
      if (drawProgress > 0.5 && Math.random() > 0.97 && heartOpacity > 0.5) {
        floatingHearts.push(new FloatingHeart());
      }
      
      if (drawProgress < 1.5) {
        drawProgress += drawSpeed;
      }
      
      requestAnimationFrame(drawHeart);
    }
    
    drawHeart();

    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        if (heartOpacity > 0) {
          heartOpacity -= 0.005;
        } else {
          clearInterval(fadeInterval);
        }
      }, 30);
      
      const mainText = document.getElementById('mainText');
      if (mainText) {
        mainText.style.transition = 'all 4s cubic-bezier(0.19, 1, 0.22, 1)';
        mainText.style.color = 'rgba(255,235,200,0.95)';
        mainText.style.transform = 'translateY(0) scale(1)';
        mainText.style.opacity = '1';
        mainText.style.filter = 'blur(0px)';
        
        setTimeout(() => {
          mainText.style.transition = 'text-shadow 2.5s ease';
          mainText.style.textShadow = '0 0 30px rgba(255, 105, 180, 0.6), 0 0 60px rgba(255, 20, 147, 0.4), 0 0 90px rgba(255, 20, 147, 0.2)';
        }, 2500);
      }
    }, 2500);

    setTimeout(() => {
      const container = overlay.querySelector('div');
      if (container) {
        container.style.transition = 'opacity 3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        container.style.opacity = '0';
        container.style.transform = 'scale(1.05)';
      }
      
      setTimeout(() => {
        overlay.innerHTML = `
          <button id="closeBtn" aria-label="Đóng" style="position: fixed; top: 30px; right: 40px; font-size: 2.5rem; color: #fff; background: rgba(0,0,0,0.5); border: none; cursor: pointer; z-index: 10; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 2s ease;">×</button>
          
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 2.5s cubic-bezier(0.4, 0.0, 0.2, 1); transform: scale(0.98);">
            <video autoplay controls playsinline preload="auto" style="width: 100%; height: 100%; object-fit: contain;">
              <source src="7083816879639.mp4" type="video/mp4">
              Trình duyệt không hỗ trợ video.
            </video>
          </div>
        `;
        
        setTimeout(() => {
          const videoContainer = overlay.querySelector('div');
          const videoCloseBtn = document.getElementById("closeBtn");
          
          if (videoContainer) {
            videoContainer.style.opacity = '1';
            videoContainer.style.transform = 'scale(1)';
          }
          
          if (videoCloseBtn) {
            videoCloseBtn.style.opacity = '1';
            videoCloseBtn.addEventListener("click", hideOverlay);
          }
        }, 100);
      }, 3000);
    }, 9000);
  }

  function hideOverlay() {
    overlay.classList.remove("open");
    overlay.innerHTML = `
      <button id="closeBtn" aria-label="Đóng">×</button>
      <img id="overlayImg" src="" alt="Ảnh kỷ niệm" />
      <div id="caption"></div>
    `;
    noCount = 0;
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  galleryBtn.addEventListener("click", () => {
    showValentineScreen();
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const env = document.getElementById("envelope");
  if (env) {
    const rect = env.getBoundingClientRect();

    const sketchCanvas = document.createElement("canvas");
    sketchCanvas.width = rect.width;
    sketchCanvas.height = rect.height;
    sketchCanvas.style.position = "absolute";
    sketchCanvas.style.top = "0";
    sketchCanvas.style.left = "0";
    sketchCanvas.style.pointerEvents = "none";
    sketchCanvas.style.zIndex = "3";
    env.appendChild(sketchCanvas);

    const rc = rough.canvas(sketchCanvas);

    const padding = 12;
    rc.rectangle(padding, padding, rect.width - padding * 2, rect.height - padding * 2, {
      roughness: 3.2,
      stroke: "rgba(0, 0, 0, 0.55)",
      strokeWidth: 1.5,
      fill: "transparent"
    });

    rc.line(padding + 15, padding + 15, padding + 40, padding + 15, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });
    rc.line(padding + 15, padding + 15, padding + 15, padding + 40, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });

    rc.line(rect.width - padding - 15, padding + 15, rect.width - padding - 40, padding + 15, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });
    rc.line(rect.width - padding - 15, padding + 15, rect.width - padding - 15, padding + 40, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });

    rc.line(padding + 15, rect.height - padding - 15, padding + 40, rect.height - padding - 15, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });
    rc.line(padding + 15, rect.height - padding - 15, padding + 15, rect.height - padding - 40, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });

    rc.line(rect.width - padding - 15, rect.height - padding - 15, rect.width - padding - 40, rect.height - padding - 15, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });
    rc.line(rect.width - padding - 15, rect.height - padding - 15, rect.width - padding - 15, rect.height - padding - 40, {
      roughness: 3,
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: 1.3
    });
  }
});