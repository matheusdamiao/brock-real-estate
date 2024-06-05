"use client";
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface PropTypes {
  imagens: string[];
}

export default function CarouselImages(props: PropTypes) {

  const modal = useRef<HTMLDialogElement>(null);


  const [emblaRef, emblaApi] = useEmblaCarousel()

  return (
    <div className="relative max-h-[600px]">
      <div
        className="lg:flex overflow-hidden relative max-h-[600px] carousel"
        ref={emblaRef}
      >
        <div className='flex w-full h-full gap-6'>
          {props &&
            props.imagens &&
            props.imagens.map((img) => {
              return (
                <a
                  className="carousel-item lg:h-[600px] lg:max-w-[800px] flex-[0_0_100%] min-w-0  "
                  key={img}
                  onClick={() => modal.current?.showModal()}
                >
                  <Image
                    className="object-cover w-full h-[600px] lg:w-full"
                    key={img}
                    width={500}
                    height={400}
                    alt=""
                    src={img}
                  />
                  

                </a>
              );
            })}
          </div>
      </div>
      <div className="flex z-[888] absolute gap-2 bg-transparent bottom-0 right-0 w-full lg:w-min justify-center lg:right-24 h-min lg:absolute">
        <button
          onClick={()=> emblaApi?.scrollNext()}
          className="bg-[#ECEFF7] rounded-full pr-1 py-4 flex items-center justify-center  w-[60px] h-[60px]"
        >
          <Image width={15} height={15} alt="arrow" src="/icons/arrow.svg"   className="rotate-180"/>
        </button>
        <button
          onClick={()=> emblaApi?.scrollPrev()}  
          className="bg-[#ECEFF7] pl-1 rounded-full w-[60px] h-[60px] flex items-center justify-center"
        >
          <Image
            width={15}
            height={15}
            alt="arrow"
            src="/icons/arrow.svg"
          />
        </button>
      </div>
    </div>
  );
}
