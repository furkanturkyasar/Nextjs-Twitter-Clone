import React from 'react'
import ComposeTweet from './serverComponents/composeTweet';
import {getTweets} from '@/lib/supabase/getTweets';
import Tweet from './clientComponents/tweet';
 
 
const Main = async () => {

  const res = await getTweets();
  
  return (
    <main className='sticky top-0 w-full xl:w-[50%] flex h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600'>
          <h1 className='text-xl font-bold p-6 sticky top-0 backdrop-blur bg-black/10'>
            Home
          </h1>
          <div className='border-t-[0.5px] px-4 border-b-[0.5px] py-6 flex items-stretch space-x-2 border-gray-600 relative'>
            <div className='rounded-full bg-slate-400 w-11 h-11 flex-none'></div>
            <ComposeTweet/>
          </div>
          <div className='flex flex-col'>
            {
              res?.error && <div>Something wrong with the server.</div>
            }
            {
              res?.data?.reverse().map((item) => (
                <Tweet tweet={item} />
              ))
            }
          </div>
        </main>
  )
}

export default Main;