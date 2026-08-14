
// ============================================
// UTILITIES
// ============================================

const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

const dist = (x1, y1, x2, y2) =>
    Math.hypot(x2 - x1, y2 - y1);


// ============================================
// GLOBAL MOUSE STATE
// ============================================

let mouseX = 9999;
let mouseY = 9999;

let lastMouseX = mouseX;
let lastMouseY = mouseY;


// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector(".cursor");

let cursorX = mouseX;
let cursorY = mouseY;

function animateCursor() {
    // Smooth cursor movement
    cursorX = lerp(cursorX, mouseX, 0.18);
    cursorY = lerp(cursorY, mouseY, 0.18);

    // Mouse velocity
    const velocityX = mouseX - lastMouseX;
    const velocityY = mouseY - lastMouseY;

    // Speed
    const speed = clamp(
        Math.hypot(velocityX, velocityY),
        0,
        40
    );

    // Stretch
    const stretch = 1 + speed / 60;

    // Movement direction
    const angle =
        Math.atan2(velocityY, velocityX) *
        (180 / Math.PI);

    cursor.style.transform = `
    translate3d(${cursorX}px, ${cursorY}px, 0)
    rotate(${angle}deg)
    scaleX(${stretch})
    scaleY(${1 / (stretch * 0.4 + 0.6)})
  `;

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    requestAnimationFrame(animateCursor);
}

animateCursor();


// ============================================
// HERO TITLE POINTER FIELD
// ============================================

const title = document.getElementById("hero-title");
// Split every word into characters
title.querySelectorAll(".word").forEach((word) => {
    const text = word.textContent;

    word.textContent = "";

    [...text].forEach((character) => {
        const span = document.createElement("span");

        span.className = "ch";
        span.textContent = character;

        word.appendChild(span);
    });
});


const chars = [...title.querySelectorAll(".ch")];


// Each character has:
// x/y  → current position
// tx/ty → target position

const charState = chars.map(() => ({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
}));


let charRects = [];


// --------------------------------------------
// Measure character positions
// --------------------------------------------

function measureCharacters() {
    charRects = chars.map((char) => {
        const rect = char.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    });
}

measureCharacters();

window.addEventListener(
    "resize",
    measureCharacters
);


// --------------------------------------------
// Pointer field settings
// --------------------------------------------

const POINTER_RADIUS = 240;
const POINTER_STRENGTH = 34;


// --------------------------------------------
// Animate characters
// --------------------------------------------

function animateText() {
    for (let i = 0; i < chars.length; i++) {

        const rect = charRects[i];
        const state = charState[i];

        // Distance from mouse to character
        const distance = dist(
            mouseX,
            mouseY,
            rect.x,
            rect.y
        );


        if (distance < POINTER_RADIUS) {

            // 1 = mouse is on character
            // 0 = mouse is at radius edge

            const falloff =
                1 - distance / POINTER_RADIUS;


            // Direction away from mouse

            const angle = Math.atan2(
                rect.y - mouseY,
                rect.x - mouseX
            );


            // Target position

            state.tx =
                Math.cos(angle) *
                POINTER_STRENGTH *
                falloff;

            state.ty =
                Math.sin(angle) *
                POINTER_STRENGTH *
                falloff;

        } else {

            // Return to original position

            state.tx = 0;
            state.ty = 0;
        }


        // Smooth movement

        state.x = lerp(
            state.x,
            state.tx,
            0.14
        );

        state.y = lerp(
            state.y,
            state.ty,
            0.14
        );


        chars[i].style.transform =
            `translate3d(${state.x}px, ${state.y}px, 0)`;
    }

    requestAnimationFrame(animateText);
}

// animateText();


// ============================================
// IMAGE TRAIL
// ============================================

const zone =
    document.querySelector("[data-trail-zone]");

const layer =
    document.getElementById("trail-layer");


const images = [
    "https://images.unsplash.com/photo-1785780224408-57cfbb7fe70c?q=80&w=987&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1785819338932-c8b4387b2b9a?q=80&w=1638&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1768541089409-7d3c0bc386eb?q=80&w=987&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1770064319727-7a5361023791?q=80&w=1674&auto=format&fit=crop"
];


// --------------------------------------------
// Image pool
// --------------------------------------------

const POOL_SIZE = 8;

const trailPool = [];

for (let i = 0; i < POOL_SIZE; i++) {

    const item = document.createElement("div");
    item.className = "trail-item";

    const img = document.createElement("img");

    img.src = images[i % images.length];
    img.alt = "";

    item.appendChild(img);
    layer.appendChild(item);

    trailPool.push(item);
}


let poolIndex = 0;

let trailLastX = null;
let trailLastY = null;

let pointerInsideZone = false;


// --------------------------------------------
// Zone events
// --------------------------------------------

zone.addEventListener("mouseenter", () => {
    pointerInsideZone = true;
});

zone.addEventListener("mouseleave", () => {
    pointerInsideZone = false;

    trailLastX = null;
    trailLastY = null;
});


// --------------------------------------------
// Image trail handler
// --------------------------------------------

function handleImageTrail(x, y) {

    if (!pointerInsideZone) return;


    // First mouse position
    if (trailLastX === null) {
        trailLastX = x;
        trailLastY = y;
        return;
    }


    // Minimum distance between images

    const distance = dist(
        x,
        y,
        trailLastX,
        trailLastY
    );

    if (distance < 70) return;


    trailLastX = x;
    trailLastY = y;


    // Get reusable element

    const item =
        trailPool[poolIndex % POOL_SIZE];

    poolIndex++;


    // Random rotation

    const rotation =
        (Math.random() * 16 - 8).toFixed(1);


    // Reset

    item.classList.remove("show");

    item.style.transition = "none";

    item.style.transform = `
    translate3d(
      ${x - 75}px,
      ${y - 95}px,
      0
    )
    scale(0.6)
    rotate(${rotation}deg)
  `;


    // Force browser to recognize initial state

    void item.offsetWidth;


    // Animate in

    item.style.transition = "";

    requestAnimationFrame(() => {

        item.classList.add("show");

        item.style.transform = `
      translate3d(
        ${x - 75}px,
        ${y - 95}px,
        0
      )
      scale(1)
      rotate(${rotation}deg)
    `;
    });


    // Remove after animation

    clearTimeout(item._hideTimer);

    item._hideTimer = setTimeout(() => {

        item.classList.remove("show");

        item.style.transform = `
      translate3d(
        ${x - 75}px,
        ${y - 95}px,
        0
      )
      scale(0.8)
      rotate(${rotation}deg)
    `;

    }, 820);
}


// ============================================
// SINGLE MOUSEMOVE LISTENER
// ============================================

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    handleImageTrail(
        event.clientX,
        event.clientY
    );
});