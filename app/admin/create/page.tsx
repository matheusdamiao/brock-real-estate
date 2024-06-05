"use client";
import React, { useEffect, useRef, useState } from "react";
import CreateNewProperty from "./../../../components/CreateNewProperty";
import Link from "next/link";

export default function CreateRealEstate() {
  enum StepsTypes {
    first = "FIRST",
    second = "SECOND",
    third = "THIRD",
    fourth = "FOURTH",
  }

  const [step, setStep] = useState<StepsTypes>(StepsTypes.first);

  // useEffect(() => {
  //   setStep(step);
  // }, [step]);

  return (
    <div className=" pb-[150px] w-full flex flex-col gap-12 lg:gap-20 items-center bg-[#ECEFF7] ">
      <div className="w-full">
        <nav className="w-full h-full flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-center border-b border-b-foreground/10 h-16 max-w-7xl m-auto">
          <Link href="/admin" className="btn btn-secondary">
            voltar
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-6 px-6">
        <h3 className="text-center font-body text-3xl">Novo Imóvel</h3>
        <div className="overflow-x-auto">
          <ul className="steps">
            <li className="step step-primary">Gerais</li>
            <li
              className={`step  ${
                step === StepsTypes.second ? "step-primary" : null
              } 
              ${step === StepsTypes.third ? "step-primary" : null}
              ${step === StepsTypes.fourth ? "step-primary" : null}
              `}
            >
              {" "}
              Preços
            </li>
            <li
              className={`step  ${
                step === StepsTypes.third ? "step-primary" : null
              }
              ${step && StepsTypes.second && null}

              ${step === StepsTypes.fourth ? "step-primary" : null}
              `}
            >
              Benefícios
            </li>
            <li
              className={`step  ${
                step === StepsTypes.fourth ? "step-primary" : null
              } `}
            >
              Imagens
            </li>
          </ul>
        </div>
      </div>

      <div className="px-6">
        <CreateNewProperty steps={step} setSteps={setStep} />
      </div>
    </div>
  );
}
