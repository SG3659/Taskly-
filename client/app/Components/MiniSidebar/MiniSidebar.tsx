"use client "
import React from 'react'
import IconGrid from "@/public/icons/IconGrid";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconCheck from "@/public/icons/iconCheck";
import IconStopwatch from "@/public/icons/IconStopwatch"
import IconDeleteAll from "@/public/icons/IconDeleteAll"
import { usePathname } from 'next/navigation';

import Image from "next/image"
import Link from 'next/link';
const MiniSidebar = () => {
  const pathname=usePathname()
  const getStrokeColor=(link:string)=>{
    return pathname === link? "#3aafae" : "#71717a";
  }

  const navItems = [
    {
      icon: <IconGrid />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  
  return (
    <div className='basic-[5rem] flex flex-col bg-[#f9f9f9]'>
      <div className='flex items-center justify-center h-[5rem]'>
        <Image src="/logo.png" width={28} height={28} alt="logo"/>
      </div>
      <div className='mt-8 flex-1 flex flex-col items-center justify-center'>
        <ul className='flex flex-col gap-10'>
          {navItems.map((items, index)=>(
            <li key={index}>
              <Link href={items.link}>{items.icon}</Link>
              <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {items.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-[1.5rem]">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31]  p-2 rounded-full">
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiniSidebar