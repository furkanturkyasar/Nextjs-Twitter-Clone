import React from 'react'
import { BsSearch } from 'react-icons/bs';

const RightSection = () => {
  return (
    <section className='w-[30%] max-w-[370px] sticky hover:overflow-auto top-2 mt-2 xl:flex flex-col items-stretch h-screen px-6 hidden'>
          <div>
            <div className='w-full h-full relative'>
              <input id='searchBox' type="text" placeholder='Search Twitter' className='peer outline-none focus:border-primary focus:border bg-neutral-900/90  w-full h-full rounded-xl pl-14 pr-4 py-4' />
              <label htmlFor='searchBox' className='absolute peer-focus:text-primary top-0 left-0 h-full flex items-center justify-center p-4'>
                <BsSearch className='w-5 h-5' />
              </label>
            </div>
          </div>
          <div className='flex flex-col rounded-xl bg-neutral-900 my-4'>
            <h3 className='font-bold text-xl my-2 px-4'>What's happening</h3>
            <div>
              {
                Array.from({length: 5}).map((item, i) => (
                  <div key={i} className='hover:bg-white/10 p-4 last:rounded-b-xl'>
                    <div className='font-bold text-lg'>
                      #trending {i + 1}
                    </div>
                    <div className='text-xs text-neutral-400'>
                      35.4k
                    </div>
                  </div>
                ))
              }
            </div>
            
          </div>
          <div className='flex flex-col rounded-xl bg-neutral-900 my-4'>
            <h3 className='font-bold text-xl my-2 px-4'>Who to follow</h3>
            <div>
              {
                Array.from({length: 3}).map((item, i) => (
                  <div key={i} className='hover:bg-white/10 p-4 flex space-x-3 justify-between items-center transition duration-200 last:rounded-b-xl'>
                    <div className='flex items-center space-x-2'>
                      <div className='w-10 h-10 bg-neutral-600 rounded-full flex-none'></div>
                      <div className='flex flex-col'>
                        <div className='font-bold text-white'>Other User</div>
                        <div className='text-gray-500 text-xs'>@otheruser</div>
                      </div>
                    </div>
                  
                      <button className='rounded-full px-6 py-2 bg-white text-neutral-950'>
                      Follow
                      </button>
                    
                  </div>
                ))
              }
            </div>
            
          </div>
        </section>
  )
}

export default RightSection;