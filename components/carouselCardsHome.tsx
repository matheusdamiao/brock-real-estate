'use client'
import React, { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import arrow from './../public/icons/arrow.svg'

interface Props {
    images: string[]
}


const CarouselCardsHome = (props: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    

      return (
      <div className="overflow-hidden h-full w-full lg:h-[400px] relative z-[8888]" ref={emblaRef}>
        <div className="flex">
          {props && props.images.map((img)=>{
            return(
                <div key={img} className='flex-[0_0_100%] min-w-0 w-full'>
                    <img src={img} alt="" className='object-contain w-full'/>
                </div>
            )
          })}
        </div>
        <div className='w-full h-full z-[8889999] absolute top-0'>
            <button onClick={()=> emblaApi?.scrollPrev()} className='absolute left-0 top-[45%] z-[9999999] p-4'> 
                <img
                    width={20}
                    height={20}
                    alt="arrow"
                    src={arrow.src}
                    className="rotate-180"
                    
                />
            </button>
            <button onClick={()=> emblaApi?.scrollNext()} className='absolute right-0 top-[45%] z-[9999999] p-4'>
                <img
                    width={20}
                    height={20}
                    alt="arrow"
                    src={arrow.src}
                />
            </button>

        </div>
      </div>
    )
}

export default CarouselCardsHome
