"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
    const path = usePathname();


  return (
    <div className="flex p-4 px-10 justify-between items-center bg-secondary shadow-sm">
      <Link href={"/"}><Image src={"/logo.svg"} width={50} height={50} alt="logo" /></Link>

      <ul className="flex gap-6">
        <Link href={"/dashboard"}>
        
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
            ${
                path=="/dashboard" && "text-primary font-bold" 
            }
            `}>
          Dashboard
        </li></Link>
        
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
