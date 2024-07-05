'use client'
import Image from 'next/image'
import React from 'react'
import zap from './../public/icons/Zap.svg'

const ZapBtn = () => {
  return (
    <a 
     href="https://api.whatsapp.com/send?phone=555192787808"
    target="_blank"
    className='bottom-4 right-4 fixed bg-green-500 px-4 py-4 rounded-full cursor-pointer hover:scale-110 transition-all z-[9999999]'>
        <Image src={zap} width={30} height={30} alt='whatsapp button'/>
    </a>
  )
}

export default ZapBtn
