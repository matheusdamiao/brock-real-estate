import React from 'react'
import MapsBrock from './MapsBrock'
import location from './../public/icons/Location.svg'
import mail from './../public/icons/mail.svg'
import phone from './../public/icons/phone.svg'
import zap from './../public/icons/whatsapp.svg'

const ContactSection = () => {
  return (
    <div id='contact' className='w-full pt-[150px] lg:pb-0 pb-[100px] px-6'>
        <div className='w-full h-full flex max-w-7xl mx-auto justify-center gap-[30px] lg:gap-[70px] lg:flex-nowrap flex-wrap'>
            <div className='flex flex-col justify-center font-body gap-8'>
                <h3 className='text-[#111726] font-semibold text-4xl'>Agende uma visita</h3>
                <p className='text-lg text-[#5A6072] flex-0 flex-shrink-0 flex-grow-0  max-w-[480px]'>Agende uma visita em um de nossos imóveis e conheça o futuro escritório da sua empresa</p>
                <form action="" className=' w-full flex flex-col gap-5 max-w-[500px]'>
                    <div className='flex justify-between flex-wrap lg:items-center lg:flex-nowrap flex-col lg:flex-row lg:gap-8'>
                        <div className='flex flex-col lg:w-[90%]'>
                            <label htmlFor="nome" className='text-[#908F8F]'>Nome</label>
                            <input type="text" id='nome' className='bg-[#E6E7EB]  py-2 px-2 rounded-[9px]'/>
                        </div>
                        <div className='flex flex-col lg:w-[90%] lg:pt-0 pt-4'>
                            <label htmlFor="telefone"  className='text-[#908F8F]'>Telefone</label>
                            <input type="text" id='telefone' className='bg-[#E6E7EB] w-full py-2 px-2 rounded-[9px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="mensagem"  className='text-[#908F8F]'>Mensagem</label>
                        <textarea  id='mensagem' placeholder='Olá, estou interessado no imóvel ...' className='h-[100px] bg-[#E6E7EB] py-4 px-4 rounded-[9px]'/>
                    </div>
                    <button type='submit' className='w-full bg-[#3C5086] py-4 text-[#E1E7F9] rounded-[9px]'>Enviar mensagem</button>
                </form>

            </div>
            <div className='flex justify-end flex-col gap-4'>
                <div className='flex items-center gap-4 max-w-[450px] w-full bg-[#E1E7F9] px-4 py-5 rounded-[9px]'>
                    <img src={location.src} alt="" width={30}/>
                    <p className='text-[#5A6072]'>Rua Joaquim Floriano, 72 - conj. 141 e 142 - Parte Edif. Sao Paulo Head Offices Itaim Bibi, São Paulo, SP</p>
                </div>
                <div className='flex items-center gap-4 max-w-[450px] w-full bg-[#E1E7F9] py-5 px-5 rounded-[9px]'>
                    <img src={mail.src} alt="" width={25}/>
                    <p className='text-[#5A6072] text-sm lg:text-lg' >secretaria@brockinvestimentos.com.br</p>
                </div>
                <div className='flex items-center max-w-[450px] w-full bg-[#E1E7F9] py-5 px-4 rounded-[9px] gap-10 lg:flex-nowrap flex-wrap justify-center'>
                    <a href='https://api.whatsapp.com/send?phone=5511975122450' target='_blank' className='cursor-pointer flex items-center gap-3 '>
                        <img src={zap.src} alt="" width={25}/>
                        <p className='text-[#5A6072] text-sm lg:text-lg' > (11) 97512-2450 </p>
                    </a>
                    <div  className='flex items-center gap-3'>
                        <img src={phone.src} alt="" width={25}/>
                        <p className='text-[#5A6072] text-sm lg:text-lg'> (11) 3894-3994  </p>
                    </div>
                    
                </div>
            </div>
        
        </div>
        <MapsBrock/>
    </div>
  )
}

export default ContactSection
