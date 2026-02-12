const wrapper = document.querySelector('.envelope-wrapper');
const openBtn = document.getElementById('openBtn');
const musicBtn = document.getElementById('musicBtn');
const music = document.getElementById('bgMusic');
const heartLayer = document.getElementById('hearts');
const flowerLayer = document.getElementById('flowers');

let opened = false;
let musicPlaying = false;

const symbols = {
  heart: ['❤', '💖', '💗', '💘'],
  flower: ['✿', '❀', '🌸', '🌹'],
};

function createFloatItem(type) {
  const item = document.createElement('span');
  item.className = `float-item ${type}`;
  item.textContent = symbols[type][Math.floor(Math.random() * symbols[type].length)];
  item.style.left = `${Math.random() * 100}vw`;
  item.style.fontSize = `${18 + Math.random() * 28}px`;
  item.style.animationDuration = `${4 + Math.random() * 6}s`;
  item.style.animationDelay = `${Math.random() * 1.2}s`;
  return item;
}

function burstEffects() {
  for (let i = 0; i < 18; i += 1) {
    const h = createFloatItem('heart');
    const f = createFloatItem('flower');
    heartLayer.appendChild(h);
    flowerLayer.appendChild(f);

    setTimeout(() => h.remove(), 11000);
    setTimeout(() => f.remove(), 11000);
  }
}

function startAmbientEffects() {
  setInterval(() => {
    const type = Math.random() > 0.5 ? 'heart' : 'flower';
    const node = createFloatItem(type);
    (type === 'heart' ? heartLayer : flowerLayer).appendChild(node);
    setTimeout(() => node.remove(), 12000);
  }, 500);
}

async function toggleMusic() {
  if (!musicPlaying) {
    try {
      await music.play();
      musicPlaying = true;
      musicBtn.textContent = '⏸️ Tạm dừng nhạc';
    } catch {
      musicBtn.textContent = '⚠️ Trình duyệt chặn tự phát nhạc';
    }
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = '🎵 Bật nhạc';
  }
}

openBtn.addEventListener('click', async () => {
  if (opened) return;
  opened = true;
  wrapper.classList.add('open');
  openBtn.setAttribute('disabled', 'true');
  burstEffects();
  await toggleMusic();
});

musicBtn.addEventListener('click', toggleMusic);

startAmbientEffects();
