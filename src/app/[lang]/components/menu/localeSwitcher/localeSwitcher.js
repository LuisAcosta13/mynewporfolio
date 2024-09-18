"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { i18n} from "../../../../../../i18n-config";
import { useEffect, useState } from "react";
import enFlag from "../../../../../../public/images/en.svg"
import esFlag from "../../../../../../public/images/es.svg"
import "../../../styles/localeSwitcher.scss"

const flagsObj = {
  en: enFlag, 
  es: esFlag
}

export default function LocaleSwitcher({lang}) {
  const pathName = usePathname();
  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const [flag, setFlag] = useState(enFlag)
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false)

  useEffect(() => {
    setFlag(flagsObj[lang]) 
  },[lang])

  return (
    <div className="flag-container" onMouseLeave={() => setIsLangSelectorOpen(false)}>
      <div onClick={() => setIsLangSelectorOpen(!isLangSelectorOpen)}>
        <Image 
        src={flag} 
        alt={lang} 
        width={50}
        height={50}
        priority></Image>
      </div>
      <ul className={isLangSelectorOpen ? "languages open" : "languages"}>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale)}>
                <Image 
                src={flagsObj[locale]} 
                alt={locale} 
                width={20}
                height={20}
                priority/>
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}