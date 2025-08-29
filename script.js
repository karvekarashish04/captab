// Show name from URL
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
document.getElementById("gallery-title").textContent = name + "'s Gallery";

// Different image sets for each name
const imageSets = {
  John: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3"
  ],
  Alice: [
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5",
    "https://picsum.photos/800/600?random=6"
  ],
  David: [
    "https://picsum.photos/800/600?random=7",
    "https://picsum.photos/800/600?random=8",
    "https://picsum.photos/800/600?random=9"
  ]
};

// Select the right set (default empty if name not found)
const images = imageSets[name] || [];
const gallery = document.querySelector(".gallery");

// Insert images into gallery
images.forEach(src => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `<img src="${src}" alt="${name} Image">`;
  gallery.appendChild(slide);
});

// Smooth scroll function with custom duration
function smoothScrollBy(element, distance, duration = 800) {
  const start = element.scrollLeft;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 → 1
    element.scrollLeft = start + distance * progress;
    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Navigation buttons (slower scroll)
document.querySelector(".prev").addEventListener("click", () => {
  smoothScrollBy(gallery, -gallery.clientWidth, 1000);
});
document.querySelector(".next").addEventListener("click", () => {
  smoothScrollBy(gallery, gallery.clientWidth, 1000);
});

// Home button → always go to index.html
document.querySelector(".home-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Fullscreen handling
const galleryContainer = document.getElementById("galleryContainer");
const controls = document.querySelector(".gallery-controls");
const exitBtn = document.querySelector(".exit-btn");
let controlsVisible = true;

// Open fullscreen
function openFullscreen() {
  if (galleryContainer.requestFullscreen) {
    galleryContainer.requestFullscreen();
  } else if (galleryContainer.webkitRequestFullscreen) {
    galleryContainer.webkitRequestFullscreen();
  } else if (galleryContainer.msRequestFullscreen) {
    galleryContainer.msRequestFullscreen();
  }
  controls.classList.remove("hidden"); 
  exitBtn.style.display = "block";
}

// Close fullscreen
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  controls.classList.remove("hidden");
  exitBtn.style.display = "none";
}

// Exit button click
exitBtn.addEventListener("click", closeFullscreen);

// Hide/show controls on tap inside fullscreen (exit button stays visible)
galleryContainer.addEventListener("click", (e) => {
  if (!document.fullscreenElement) return; 
  if (e.target === exitBtn) return;
  controlsVisible = !controlsVisible;
  controls.classList.toggle("hidden", !controlsVisible);
});

// Reset controls when fullscreen changes (like ESC)
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    controls.classList.remove("hidden");
    exitBtn.style.display = "none";
  }
});

