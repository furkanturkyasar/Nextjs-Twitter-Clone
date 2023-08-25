import React from 'react'
import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs';
import { AiOutlineRetweet, AiOutlineHeart} from 'react-icons/ai';
import { IoStatsChart, IoShareOutline} from 'react-icons/io5';

const Main = () => {
  return (
    <main className='sticky top-0 w-[50%] flex h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600'>
          <h1 className='text-xl font-bold p-6 sticky top-0 backdrop-blur bg-black/10'>
            Home
          </h1>
          <div className='border-t-[0.5px] px-4 border-b-[0.5px] py-6 flex items-stretch space-x-2 border-gray-600 relative'>
            <div className='rounded-full bg-slate-400 w-11 h-11 flex-none'></div>
            <div className='flex flex-col w-full h-full'>
              <input className='w-full h-full text-xl placeholder:text-gray-600 bg-transparent border-none outline-none p-4 border-gray-600' type="text" placeholder="What's happening?" />
              <div className='w-full justify-between items-center flex'>
                <div></div>
                <div className='w-full h-full max-w-[100px]'>
                  <button className=" rounded-full font-bold bg-primary px-4 py-2 w-full text-lg text-center hover:opacity-70 transition duration-200">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            {
              Array.from({ length: 5}).map((_, i) => (
                <div key={i} className='border-b-[0.5px] border-gray-600 p-4 flex space-x-4'>
                    <div>
                      <div className='w-10 h-10 bg-slate-200 rounded-full'>
                    </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex items-center w-full justify-between'>
                        <div className='flex items-center space-x-1 w-full'>
                          <div className='font-bold'>Furkan Turkyasar</div>
                          <div className='text-gray-500'>@turkyasarfurkan</div>
                          <div className='text-gray-500'><BsDot/></div>
                          <div className='text-gray-500'>1 hour ago</div>
                        </div>
                        <div className='text-gray-500'><BsThreeDots/></div>
                      </div>
                      <div className='text-white text-base'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad facere eius fugit quidem consequatur vel dolor, aliquam fuga distinctio accusamus quisquam error iste voluptatum hic, dicta veritatis officia molestiae. Explicabo?
                      </div>
                      <div className='bg-slate-400 aspect-square w-full h-80 mt-2 rounded-xl'>

                      </div>
                      <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'>
                          <BsChat/>
                        </div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><AiOutlineRetweet/></div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><AiOutlineHeart/></div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoStatsChart/></div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoShareOutline/></div>
                      </div>
                    </div>
                </div>
              ))
            }
          </div>
        </main>
  )
}

export default Main;