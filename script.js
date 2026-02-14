let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '5-9C08-N090', // Café Tacvba - Quiero Ver
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': '5-9C08-N090' }
    });
}

function startStory() {
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        player.setVolume(100);
    }
    nextStep(2);
}

function nextStep(step) {
    document.querySelector('.scene.active').classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById('progressBar').style.width = `${(step / 8) * 100}%`;
}

const noBtn = document.getElementById('noBtn');
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + 'px';
});

document.getElementById('yesBtn').addEventListener('click', () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    document.getElementById('customModal').style.display = 'flex';
});

function closeModal() { document.getElementById('customModal').style.display = 'none'; }

// Fondo de corazones
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let hearts = [];
class Heart {
    constructor() { this.x = Math.random() * canvas.width; this.y = canvas.height + 10; this.size = Math.random() * 8 + 4; this.speed = Math.random() * 2 + 1; }
    draw() { ctx.fillStyle = 'rgba(255, 77, 109, 0.4)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    update() { this.y -= this.speed; if (this.y < -10) this.y = canvas.height + 10; }
}
for (let i = 0; i < 20; i++) hearts.push(new Heart());
function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); hearts.forEach(h => { h.draw(); h.update(); }); requestAnimationFrame(animate); }
animate();