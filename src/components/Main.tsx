import React from 'react'
import ComposeTweet from './serverComponents/composeTweet';
import {getTweets} from '@/lib/supabase/queries';
import Tweet from './clientComponents/tweet';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { replies } from '@/lib/db/schema';
 
 
const Main = async () => {

  const supabaseClient = createServerComponentClient({
    cookies
  });


  const {data: userData, error: userError} = await supabaseClient.auth.getUser();

  const res = await getTweets({currentUserID: userData.user?.id});

  
  return (
    <main className='sticky top-0 w-full xl:w-[55%] 2xl:w-[45%] flex h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600'>
          <h1 className='text-xl font-bold p-6 sticky top-0 backdrop-blur bg-black/10'>
            Home
          </h1>
          <div className='border-t-[0.5px] px-4 border-b-[0.5px] py-6 flex items-stretch space-x-2 border-gray-600 relative'>
            <div className='rounded-full bg-slate-400 w-11 h-11 flex-none'></div>
            <ComposeTweet/>
          </div>
          <div className='flex flex-col'>
            {
              res?.map(({
                profile,
                tweet,
                likes,
                hasLiked,
                replies
              }) => (
                <Tweet key={tweet.id} tweet={{
                  tweetDetails: {
                    ...tweet
                }, userProfile: {
                  ...profile
                }}} currentUserId={userData.user?.id}
                likesCount={likes.length}
                hasLiked={hasLiked}
                repliesCount={replies.length}
                 />
              ))
            }
          </div>
        </main>
  )
}

export default Main;