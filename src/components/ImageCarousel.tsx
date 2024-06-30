'use client'

import { Picture } from "@/lib/definitions"
import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

type ImageCarouselPropTypes = {
  images: Picture[]
}

export default function ImageCarousel({ images }: ImageCarouselPropTypes) {

  const [index, setIndex] = useState(0)

  const handleForward = () => {
    setIndex((prev: number) => (prev + 1) % images.length)
    console.log(index)
  }

  const handleBack = () => {
    console.log(index)
    setIndex((prev: number) => (prev - 1 + images.length) % images.length)
  }

  const moreThanOneImg = (images.length > 1)

  const buttonClass = `z-20 m-4 h-8 w-8 
  flex items-center justify-center opacity-70
  font-mono bg-gray-400 border-2 border-gray-900
  rounded-full self-center`

  return (
    <div
      className="flex flex-col md:min-w-[40rem] md:min-h-[35rem] min-w-[28rem] 
      min-h-[40rem]"
    >
      <div
        className={`relative flex flex-row align-middle justify-between 
         overflow-hidden w-full h-full grow
        border border-gray-400 rounded-3xl`}
      >
        {(moreThanOneImg) && (
          <button
            className={buttonClass}
            onClick={handleBack}
          >
            {`<`}
          </button>
        )}
        {images.map((img, i) => {
          return (
            <div
              key={`imageDiv${i}`}
              className={`flex w-full h-full absolute
            bg-gray-200`}
            >
              <Image
                src={img.url}
                fill={true}
                alt={img.url}
                className={clsx(
                  'transition-all z-10 ease-in-out duration-500 border-r border-red',
                  (i === index)
                    ? 'blur-none opacity-100'
                    : 'blur-xl opacity-0',
                )}
                style={{ 
                  transform: `translateX(${(i - index) * 100}%`,
                  objectFit: "contain" 
               }}
              />
            </div>
          )
        })}


        {(moreThanOneImg) && (
          <button
            className={buttonClass}
            onClick={handleForward}
          >
            {`>`}
          </button>
        )}
      </div>
      {(moreThanOneImg) && (
        <div className="flex w-full flex-wrap justify-center mb-4">
          {images.map((img, i) => {
            return (
              <button
                className="z-20 m-1 h-12 w-12 align-middle justify-center
          text-sm border bg-gray-400 border-gray-900 
          "
                style={{
                  backgroundImage: `url('${img.url}')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'none',
                }}
                onClick={() => setIndex(i)}
              >
                {/* {i + 1} */}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}