"use client"

import { TweetType, getLikesCount, isLiked } from "@/lib/supabase/queries";
import React from 'react';
import { BsDot, BsThreeDots } from 'react-icons/bs';
import { AiOutlineRetweet} from 'react-icons/ai';
import { IoStatsChart, IoShareOutline} from 'react-icons/io5';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativetime';
import LikeButton from './likeButton';
import { Profile, Tweet } from '@/lib/db/schema';
import ReplyDialog from "./replyDialog";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

type TweetProps = {
  tweet: {
    userProfile: Profile,
    tweetDetails: Tweet
  };
  currentUserId?: string;
  likesCount: number | null;
  hasLiked: boolean;
  repliesCount: number;
  isOnTimeLine?: boolean;
}

const Tweet =  ({tweet, likesCount, hasLiked, repliesCount, isOnTimeLine = true}: TweetProps) => {

  const router = useRouter();

  return (
    <>   
      <div  key={tweet.tweetDetails.id} className='border-b-[0.5px] w-full border-gray-600 p-4 flex space-x-4'>
                      <div>
                        <div className='w-10 h-10 bg-slate-200 rounded-full'>
                      </div>
                      </div>
                      <div className='flex flex-col w-full'>
                        <div className='flex items-center w-full justify-between'>
                          <div className='flex items-center space-x-1 w-full'>
                            <div className='font-bold'>{tweet.userProfile.fullName ?? ""}</div>
                            <div className='text-gray-500'>@{tweet.userProfile.username}</div>
                            <div className='text-gray-500'><BsDot/></div>
                            <div className='text-gray-500'>{dayjs(tweet.tweetDetails.createdAt).fromNow()}</div>
                          </div>
                          <div className='text-gray-500'><BsThreeDots/></div>
                        </div>
                        <div onClick={() => {
                          router.push(`/tweet/${tweet.tweetDetails.id}`)
                        }} className='text-white text-base hover:bg-white/5 transition-all cursor-pointer '>
                          {tweet.tweetDetails.text}
                        </div>
                        {
                          isOnTimeLine ? 
                          <div className='bg-slate-400 aspect-square w-full h-80 mt-2 rounded-xl'>
                          </div>
                          :  null
                        }
                        <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                          <ReplyDialog repliesCount={repliesCount} tweet={tweet} />
                          <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><AiOutlineRetweet/></div>
                          <LikeButton isUserHasLiked={hasLiked} tweetId={tweet.tweetDetails.id} likesCount={likesCount} />
                          <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoStatsChart/></div>
                          <div className='rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-3'><IoShareOutline/></div>
                        </div>
                      </div>
      </div>
    </>
  )
}

export default Tweet;