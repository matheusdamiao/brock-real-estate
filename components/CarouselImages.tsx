"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface PropTypes {
  imagens: string[];
}

export default function CarouselImages(props: PropTypes) {
  const imagesRef = useRef(null);
  const modal = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const [allImages, setAllImages] = useState(0);

  const nextSlide = () => {
    setCurrent(current === allImages - 1 ? 0 : current + 1);
  };

  const previousSlide = () => {
    setCurrent(current === 0 ? allImages - 1 : current - 1);
  };

  const scrollIntoView = (index: number) => {
    const listNode = imagesRef.current;
    if (listNode) {
      const childrenNumber = listNode as HTMLElement;
      setAllImages(childrenNumber.children.length);

      const imgNode = (listNode as HTMLElement).querySelectorAll("a > img")[
        index
      ];
      imgNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    scrollIntoView(current);
  }, [current]);

  return (
    <div className="relative max-h-[500px]">
      <div
        className="lg:flex carousel space-x-16 relative max-h-[500px]"
        ref={imagesRef}
      >
        {props &&
          props.imagens &&
          props.imagens.map((img) => {
            return (
              <a
                className="carousel-item"
                key={img}
                onClick={() => modal.current?.showModal()}
              >
                <Image
                  className="object-cover"
                  key={img}
                  width={500}
                  height={400}
                  alt=""
                  src={img}
                />
                <dialog id="my_modal_2" className="modal" ref={modal}>
                  <div className="modal-box w-full max-w-full w-[800px]">
                    <div className="carousel space-x-6">
                      {props.imagens.map((img) => {
                        return (
                          <Image
                            className="carousel-item object-cover"
                            key={img}
                            width={700}
                            height={400}
                            alt=""
                            src={img}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </a>
            );
          })}
      </div>
      <div className="flex  gap-2 bg-transparent bottom-0 right-0 w-full lg:w-min justify-center lg:right-24 h-min lg:absolute">
        <div
          onClick={nextSlide}
          className="bg-[#ECEFF7] rounded-full px-4 py-4 flex items-center justify-center  w-[60px] h-[60px]"
        >
          <Image width={24} height={24} alt="arrow" src="/icons/arrow.webp" />
        </div>
        <button
          onClick={previousSlide}
          className="bg-[#ECEFF7] px-4 py-4 rounded-full w-[60px] h-[60px] flex items-center justify-center"
        >
          <Image
            width={24}
            height={24}
            alt="arrow"
            src="/icons/arrow.webp"
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
}
