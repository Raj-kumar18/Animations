import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const App = () => {
  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Cleanup function to stop Lenis when component unmounts
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);


  useGSAP(() => {
    document.querySelectorAll(".elem").forEach((elem) => {
      // Yahan fix: 'elem' ke andar ki image select karo
      let image = elem.querySelector("img");
      let tl = gsap.timeline();

      let xTransform = gsap.utils.random(-100, 100);

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
  })

  return (
    <div className="w-full bg-zinc-900">
      <div className="grid grid-cols-8 grid-rows-[repeat(10,minmax(0,1fr))] gap-4 pb-20">
        {/* Changed style="" to style={{}} and used camelCase */}
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 1, gridColumn: 7 }}><img src="./02_images/2.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 1, gridColumn: 3 }}><img src="./02_images/1.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 2, gridColumn: 2 }}><img src="./02_images/3.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 2, gridColumn: 6 }}><img src="./02_images/4.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 3, gridColumn: 4 }}><img src="./02_images/5.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 3, gridColumn: 8 }}><img src="./02_images/6.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 4, gridColumn: 1 }}><img src="./02_images/7.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 4, gridColumn: 4 }}><img src="./02_images/8.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 5, gridColumn: 2 }}><img src="./02_images/9.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 5, gridColumn: 6 }}><img src="./02_images/10.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 6, gridColumn: 3 }}><img src="./02_images/11.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 6, gridColumn: 7 }}><img src="./02_images/12.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 7, gridColumn: 5 }}><img src="./02_images/13.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 7, gridColumn: 8 }}><img src="./02_images/14.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 8, gridColumn: 1 }}><img src="./02_images/15.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 8, gridColumn: 4 }}><img src="./02_images/16.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 9, gridColumn: 2 }}><img src="./02_images/17.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 9, gridColumn: 6 }}><img src="./02_images/18.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 10, gridColumn: 3 }}><img src="./02_images/19.jpg" alt="" /></div>
        <div className="elem col-span-1 row-span-1" style={{ gridRow: 10, gridColumn: 7 }}><img src="./02_images/20.jpg" alt="" /></div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center  text-white">
        <h1 className="text-6xl mb-4">Biggest Text Field</h1>
        <h2 className="text-4xl">Smaller Text Field</h2>
      </div>

      <div className="w-full flex items-center justify-center h-screen bg-[#D1D1D1] mx-auto py-96 z-[1] relative text-center">
        <p className="text-black text-4xl text-center w-3/4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ducimus rerum excepturi quae, necessitatibus sed unde ipsam tempore optio consequatur deserunt, vitae nam ex reiciendis magnam alias laudantium est maiores.
        </p>
      </div>
    </div>
  )
}

export default App