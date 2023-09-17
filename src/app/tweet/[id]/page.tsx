import Tweet from '@/components/clientComponents/tweet';
import { Database } from '@/lib/supabase.types';
import { getTweets } from '@/lib/supabase/queries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const TweetPage = async ({ params }: {params: {id: string}}) => {

    const supabase = createServerComponentClient<Database>({ cookies });

    const {data: userData, error: userError} = await supabase.auth.getUser();
  
    const tweet = await getTweets({
      currentUserID: userData.user?.id,
      getSingleTweetId: params.id,
    });

    if (!tweet) {
      redirect("/");
    }

    const repliesRes = await getTweets({
      currentUserID: userData.user?.id,
      orderBy: true,
      replyId: tweet[0].tweet.id,
    });

  return (
    <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      {tweet ? (
        <Tweet
          hasLiked={Boolean(tweet[0].hasLiked)}
          likesCount={tweet[0].likes.length ?? 0}
          tweet={{
            tweetDetails: tweet[0].tweet,
            userProfile: tweet[0].profile,
          }}
          currentUserId={userData.user?.id}
          repliesCount={tweet[0].replies.length}
        />
      ) : (
        <div>no tweet found</div>
      )}
      {repliesRes &&
        repliesRes.map(({ hasLiked, likes, profile, replies, tweet }) => {
          return (
            <Tweet
              key={tweet.id}
              hasLiked={hasLiked}
              likesCount={likes.length}
              tweet={{
                tweetDetails: tweet,
                userProfile: profile,
              }}
              repliesCount={replies.length}
              currentUserId={userData.user?.id}
              isOnTimeLine={false}
            />
          );
        })}
    </main>
  )
}

export default TweetPage