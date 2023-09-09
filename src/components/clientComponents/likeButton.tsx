'use client'

import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import React, {useState, useTransition} from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { likeTweet, unLikeTweet } from '@/lib/supabase/mutation';

type LikeButtonProps = {
    tweetId: string;
    likesCount: number | null;
    isUserHasLiked: boolean;
}

const LikeButton = ({tweetId, likesCount, isUserHasLiked}: LikeButtonProps) => {
  
    let [isLikePending, startTransition] = useTransition();
    const [supabase] = useState(() => createPagesBrowserClient());

  return (
    <button disabled={isLikePending} onClick={() => {
        supabase.auth.getUser().then((res) => {
          if (res.data && res.data.user) {
            const user = res.data.user
            startTransition(() => isUserHasLiked ? unLikeTweet({tweetId, userId: user.id}) : likeTweet({tweetId, userId: user.id}) as any)
          } else {
            toast("please login to like a tweet");
          }
        }).catch(() => {
          toast.error('Authentication failed!')
        })
        
      }} className='rounded-full flex items-center space-x-2 hover:bg-white/10 transition duration-200 cursor-pointer p-3'>
        {likesCount ?? 0}
        { isUserHasLiked ? <AiFillHeart className='w-5 h-5 text-red-600' /> : <AiOutlineHeart className='w-5 h-5' />}
        </button>
  )
}

export default LikeButton