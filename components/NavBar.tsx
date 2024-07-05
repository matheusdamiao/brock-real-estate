"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full flex items-center justify-center bg-transparent absolute top-0 z-[99999]">
      <div className="navbar py-4 bg-transparent max-w-[1000px]">
        <div className="navbar-start">

          <Link href="/" className="btn btn-ghost text-xl ">
            <Image
              alt="logo Brock"
              width={113}
              height={51}
              src="/icons/logo-brock-blue.svg"
              className="lg:w-[113px] w-[80px]"
            />
          </Link>
        </div>

        <div className="navbar-end  lg:justify-center">
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-6 text-[#111726] font-semibold">
              <li>
                <a className="text-white">Sobre nós</a>
              </li>
              <li>
                <a className="text-white">Contato</a>
              </li>
            </ul>
          </div>
          {/* <a className="btn btn-primary text-white">
                    Agende sua visita
                </a> */}
        <a className="btn  btn-primary" href='#contact'> Entrar em contato</a>
        </div>
      </div>
    </div>
  );
}
