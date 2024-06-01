"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full flex items-center justify-center bg-transparent absolute top-0 z-[99999]">
      <div className="navbar py-4 bg-transparent max-w-[1000px]">
        <div className="navbar-start">
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content mt-6 z-[1] p-2 shadow bg-slate-400 rounded-box w-52"
            >
              <li>
                <a>Sobre nós</a>
              </li>
              <li>
                <a>Contato</a>{" "}
              </li>
            </ul>
          </div> */}
          <Link href="/" className="btn btn-ghost text-xl ">
            <Image
              alt="logo Brock"
              width={113}
              height={51}
              src="/icons/logo-brock-white.svg"
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
