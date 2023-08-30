"use client"

import React, {useTransition, useState} from 'react';
import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs';
import { AiOutlineRetweet, AiOutlineHeart} from 'react-icons/ai';
import { IoStatsChart, IoShareOutline} from 'react-icons/io5';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativetime';
import { TweetType, likeTweet } from '@/lib/supabase/getTweets';
import { useUser } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

dayjs.extend(relativeTime);

type TweetProps = {
  tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {
  const user = useUser();
  
  let [isLikePending, startTransition] = useTransition();

  const [supabase] = useState(() => createPagesBrowserClient());


  return (
    <div key={tweet.id} className='border-b-[0.5px] border-gray-600 p-4 flex space-x-4'>
                    <div>
                      <div className='w-10 h-10 bg-slate-200 rounded-full'>
                    </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex items-center w-full justify-between'>
                        <div className='flex items-center space-x-1 w-full'>
                          <div className='font-bold'>{tweet.profiles.full_name ?? ""}</div>
                          <div className='text-gray-500'>@{tweet.profiles.username}</div>
                          <div className='text-gray-500'><BsDot/></div>
                          <div className='text-gray-500'>{dayjs(tweet.created_at).fromNow()}</div>
                        </div>
                        <div className='text-gray-500'><BsThreeDots/></div>
                      </div>
                      <div className='text-white text-base'>
                        {tweet.text}
                      </div>
                      <div className='bg-slate-400 aspect-square w-full h-80 mt-2 rounded-xl'>

                      </div>
                      <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'>
                          <BsChat/>
                        </div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><AiOutlineRetweet/></div>
                        <button disabled={isLikePending} onClick={() => {
                          supabase.auth.getUser().then((res) => {
                            if (res.data && res.data.user) {
                              const user = res.data.user
                              startTransition(() => likeTweet({tweetId: tweet.id, userId: user.id}) as any)
                            } else {
                              toast("please login to like a tweet");
                            }
                          }).catch(() => {
                            toast.error('Authentication failed!')
                          })
                          
                        }} className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><AiOutlineHeart/></button>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoStatsChart/></div>
                        <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoShareOutline/></div>
                      </div>
                    </div>
                </div>
  )
}

export default Tweet