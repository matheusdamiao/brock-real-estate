import React from 'react'
import bg from './../public/images/dark-section.webp'
import Image from 'next/image'

const MeetTheNeighbors = () => {
  return (
    <div className='relative w-full h-[500px] lg:h-[400px]'>
      <Image src={bg} alt="" width={1501} height={507} className='object-cover w-full z-30 h-full absolute' />
      {/* <span className='bg-[linear-gradient(180deg,#010813_22.66%,#000_39.09%,#F4F4F4_76.31%)] lg:bg-[linear-gradient(90deg,#010813_12.74%,#000_27.03%,#F4F4F4_59.4%)] absolute top-0 h-full w-full z-[2]'></span> */}
      <div className='flex max-w-7xl w-full mx-auto justify-between lg:items-center h-full lg:flex-row flex-col flex-wrap  '>
        <div className='flex flex-col z-50 px-6 py-10'>
          <small className='text-white text-base lg:pl-2 pl-1'>Conheça a região</small>
          <h3 className='text-5xl lg:text-7xl font-bold text-white pt-4'>Privilégio e <br /> Prestígio</h3>
        </div>
        <p className='text-[#ffffff] font-normal text-lg lg:text-2xl z-[52] max-w-[500px] px-6 pb-10'>
        Em uma das regiões mais valorizadas e prestigiadas de São Paulo, nossos imóveis proporcionam acesso privilegiado tanto para colaboradores da empresa quanto para clientes e parceiros de negócios.
        </p>
      </div>
    </div>
  )
}

export default MeetTheNeighbors
