const ROSE_DATA = {
    hero: { title: "To My One and Only", desc: "Each rose represents a beautiful moment we've shared. Happy Rose Day!", btn: "Scroll Our Memories" },
    config: {
        heroPath: "./images/",   // 1-12
        galPath: "./gallery/",   // 13-19
        memPath: "./memories/",  // 20-26
        extensions: ['jpg', 'jpeg', 'png', 'JPG', 'PNG']
    },
    memories: [
        { title: "The Beginning", date: "Moment 1🤭", desc: "Where it all started..." },
        { title: "Deeper Connection", date: "Moment 2🫂", desc: "Finding pieces of myself in you." },
        { title: "The Heart Opens", date: "Moment 3🤗", desc: "Shared a secret no one knew.👀" },
        { title: "Infinite Love", date: "Forever", desc: "To the girl who changed everything." }
        // You can add up to 7 memories here for images 20-26
    ],
    secret: "I’ve never met anyone who made me feel so much like myself. You’re my favorite place to be.🫂💗🌸"
};

function smartLoad(imgElement, folder, fileName) {
    let extIndex = 0;
    const tryNext = () => {
        if (extIndex < ROSE_DATA.config.extensions.length) {
            imgElement.src = `${folder}${fileName}.${ROSE_DATA.config.extensions[extIndex]}`;
            extIndex++;
        }
    };
    imgElement.onerror = tryNext;
    tryNext();
}

function renderRoseDay() {
    // 1. Hero Text
    document.getElementById('main-heading').textContent = ROSE_DATA.hero.title;
    document.getElementById('sub-heading').textContent = ROSE_DATA.hero.desc;
    document.getElementById('action-btn').textContent = ROSE_DATA.hero.btn;

    // 2. Slideshow (1-12)
    const heroSection = document.querySelector('.rose-hero');
    const slideshowDiv = document.createElement('div');
    slideshowDiv.id = 'slideshow';
    heroSection.prepend(slideshowDiv);
    for (let i = 1; i <= 12; i++) {
        const img = document.createElement('img');
        img.className = 'slide';
        img.onload = function() { this.classList.add('loaded'); if (i === 1) this.classList.add('active'); };
        smartLoad(img, ROSE_DATA.config.heroPath, i);
        slideshowDiv.appendChild(img);
    }

    // 3. Memories (20-26)
    const storyFeed = document.getElementById('story-feed');
    ROSE_DATA.memories.forEach((memory, index) => {
        const photoNum = 20 + index;
        const memoryHtml = `
            <div class="memory-item reveal ${index % 2 !== 0 ? 'reverse' : ''}">
                <div class="memory-text"><h3>${memory.title}</h3><p>${memory.desc}</p></div>
                <div class="memory-visual"><img id="mem-${photoNum}" src=""></div>
            </div>`;
        storyFeed.innerHTML += memoryHtml;
        setTimeout(() => smartLoad(document.getElementById(`mem-${photoNum}`), ROSE_DATA.config.memPath, photoNum), 0);
    });

    // 4. Gallery (13-19) - Show 3 Random initially
    const galleryGrid = document.getElementById('gallery-grid');
    const showMoreBtn = document.getElementById('show-more-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    let galIndices = [13, 14, 15, 16, 17, 18, 19].sort(() => Math.random() - 0.5);

    galIndices.forEach((num, i) => {
        const gImg = document.createElement('img');
        gImg.className = i < 3 ? 'gallery-item' : 'gallery-item hidden';
        smartLoad(gImg, ROSE_DATA.config.galPath, num);
        gImg.onclick = () => { lightboxImg.src = gImg.src; lightbox.classList.add('open'); };
        galleryGrid.appendChild(gImg);
    });

    showMoreBtn.onclick = () => {
        document.querySelectorAll('.gallery-item.hidden').forEach(el => el.classList.remove('hidden'));
        showMoreBtn.style.display = 'none';
    };

    // Close Lightbox
    lightbox.onclick = (e) => { if(e.target !== lightboxImg) lightbox.classList.remove('open'); };

    // Slideshow Logic
    let current = 0;
    setInterval(() => {
        const slides = document.querySelectorAll('.slide.loaded');
        if (slides.length > 1) {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }
    }, 3000);

    // Secret Message
    document.getElementById('rose-trigger').onclick = () => {
        const msg = document.getElementById('secret-message');
        msg.textContent = ROSE_DATA.secret;
        msg.classList.add('show');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', renderRoseDay);
document.getElementById('rose-trigger').onclick = function() {
    const msgContainer = document.getElementById('secret-message');
    const text = ROSE_DATA.secret;
    
    // Prevent re-triggering while typing
    if (this.classList.contains('active')) return;
    this.classList.add('active');

    msgContainer.classList.add('show');
    msgContainer.innerHTML = '<span class="typing-cursor"></span>';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            // Insert text before the cursor span
            msgContainer.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
            i++;
            setTimeout(typeWriter, 50); // Speed of typing (ms)
        } else {
            // Remove cursor once finished
            msgContainer.innerHTML = text;
        }
    }
    
    typeWriter();
};
window.onscroll = function() { moveProgress(); };

function moveProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
// Add this inside the for-loop where you create gImg
let lastTap = 0;
gImg.addEventListener('touchend', function (e) {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
        // Create a floating heart at the touch position
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'touch-heart';
        heart.style.left = e.changedTouches[0].pageX + 'px';
        heart.style.top = e.changedTouches[0].pageY + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 800);
        e.preventDefault();
    }
    lastTap = currentTime;
});

// This pushes a dummy state so the first "Back" click doesn't close the site
window.history.pushState(null, null, window.location.href);

window.onpopstate = function () {
    // When she hits back, instead of leaving, we show a final cute alert
    const confirmLeave = confirm("Wait! Muskann, I have one more rose for you. Stay a little longer? ❤️");
    
    if (confirmLeave) {
        // Stay on page and scroll to the secret message
        window.history.pushState(null, null, window.location.href);
        document.getElementById('rose-trigger').scrollIntoView({behavior: 'smooth'});
    } else {
        // Let her leave if she really wants to
        window.history.back();
    }
};