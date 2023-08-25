import React from 'react'
import Link from "next/link";
import {BiHomeCircle, BiUser} from "react-icons/bi";
import {BsBell, BsBookmark, BsEnvelope, BsThreeDots, BsTwitter} from 'react-icons/bs';
import {HiOutlineHashtag} from 'react-icons/hi';
import {HiEnvelope} from 'react-icons/hi2';

const NAVIGATION_ITEMS = [
    {
      title: "X",
      icon: BsTwitter
    },  
    {
      title: "Home",
      icon: BiHomeCircle,
    },
    {
      title: "Explore",
      icon: HiOutlineHashtag,
    },
    {
      title: "Notifications",
      icon: BsBell,
    },
    {
      title: "Messages",
      icon: BsEnvelope,
    },
    {
      title: "Bookmarks",
      icon: BsBookmark
    },
    {
      title: "Profile",
      icon: BiUser
    }
  ];
  

const LeftSidebar = () => {
  return (
    <section className="sticky top-0 w-[25%] max-w-[250px] flex flex-col items-stretch h-screen">
          <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
            {
              NAVIGATION_ITEMS.map((item) => {
                return(
                  <Link className={`hover:bg-white/10 text-2xl transition duration-200 flex items-center space-x-4 justify-start w-fit rounded-3xl py-2 px-6`} href={`/${item.title !== "X" ? item.title.toLowerCase() : ""}`} key={item.title}>
                    <div><item.icon/></div>
                    {
                        item.title !== "X" &&  <div>{item.title}</div>
                    }
                  </Link>
                );
              })
            }
            <button className="m-4 rounded-full bg-primary p-4 text-center hover:opacity-70 transition duration-200">
              Tweet
            </button>
          </div >
          <button className="rounded-full flex items-center justify-between space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-slate-400 w-12 h-12">
              </div>
              <div className="text-left text-sm">
                <div className="font-semibold">Furkan Turkyasar</div>
                <div className="">@turkyasarfurkan</div>
              </div> 
            </div>
            <div>
                <BsThreeDots/>
              </div>
          </button>
          
        </section>
  )
}

export default LeftSidebar