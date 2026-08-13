import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)
const Card = () => {

    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
        "/images/6.png"
    ]




    const topOffsets = [
        "top-[15vh]",
        "top-[19vh]",
        "top-[23vh]",
        "top-[27vh]",
        "top-[31vh]",
        "top-[35vh]"
    ]


    useEffect(() => {
        gsap.utils.toArray(".card").forEach((card) => {
            gsap.to(card, {
                scale: 0.7,
                opacity: 0,
                scrollTrigger: {
                    trigger: card,
                    start: "top 15%",
                    end: "bottom 15%",
                    markers: true,
                    scrub: true
                }
            })
        })
    }, [])


    return (
        <main className="min-h-screen text-white text-center w-full flex flex-col items-center gap-[30vh] py-[15vh]">
            {images.map((image, index) => (
                <div
                    key={index}
                    style={{ zIndex: index + 1 }}
                    className="card-collapse card sticky top-[15vh] origin-top flex flex-col w-[90vw] md:w-[30vw] px-5 py-[15vh] rounded-lg gap-4 items-center bg-[#2e251e] shadow-2xl"
                >
                    <img src={image} alt={`project-${index + 1}`} className="w-[180px] aspect-square object-cover rounded-md" />
                    <h1 className="text-4xl font-thin">
                        The <br />
                        <span className="font-bold">Algorithm</span>
                    </h1>
                    <p className="text-sm md:text-base text-white/80 px-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, modi.</p>
                </div>
            ))}
        </main>
    )
}

export default Card