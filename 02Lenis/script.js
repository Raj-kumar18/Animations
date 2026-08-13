// Initialize Lenis
const lenis = new Lenis({
  lerp: 0.1, // Optional: Thoda smoother scroll (default 0.1)
  smooth: true, // Optional: Touch device par smooth scrolling
  direction: "vertical", // Optional: vertical ya horizontal
  gestureDirection: "both", // Optional: both, vertical, ya horizontal
  lerp: 0.1, // Optional: Thoda smoother scroll (default 0.1)
  smooth: true, // Optional: Touch device par smooth scrolling
  direction: "vertical", // Optional: vertical ya horizontal
  gestureDirection: "both", // Optional: both, vertical, ya horizontal
  lerp: 0.1, // Optional: Thoda smoother scroll (default 0.1)
  smooth: true, // Optional: Touch device par smooth scrolling
  direction: "vertical", // Optional: vertical ya horizontal
  gestureDirection: "both", // Optional: both, vertical, ya horizontal
  lerp: 0.1, // Optional: Thoda smoother scroll (default 0.1)
  smooth: true, // Optional: Touch device par smooth scrolling
  direction: "vertical", // Optional: vertical ya horizontal
  gestureDirection: "both", // Optional: both, vertical, ya horizontal
  lerp: 0.1, // Optional: Thoda smoother scroll (default 0.1)
  smooth: true, // Optional: Touch device par smooth scrolling
  direction: "vertical", // Optional: vertical ya horizontal
  gestureDirection: "both", // Optional: both, vertical, ya horizontal
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP Register
gsap.registerPlugin(ScrollTrigger);

// Loop through each element
document.querySelectorAll(".elem").forEach((elem) => {
  // Yahan fix: 'elem' ke andar ki image select karo
  let image = elem.querySelector("img");
  let tl = gsap.timeline();

  let xTransform = gsap.utils.random(-100, 100);
  console.log(xTransform)
  tl.set(image, {
    transformOrigin: `${xTransform < 0 ? 0 : "100%"}`,
  }, "start")
    .to(image, {
      scale: 0,
      ease: "none", // Yahan fix: quotes add kiye
      scrollTrigger: {
        trigger: image,
        start: "top top",
        end: "bottom top", // Yahan 'top bottom' ki jagah 'bottom top' shayad better dikhega
        scrub: true
      }
    }, "start")
    .to(elem, {
      xPercent: xTransform,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top", // Yahan 'top bottom' ki jagah 'bottom top' shayad better dikhega
        scrub: true
      }
    })
});