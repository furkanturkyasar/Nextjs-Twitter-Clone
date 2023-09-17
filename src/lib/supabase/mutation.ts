'use server';

import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, replies, tweets } from "../db/schema";

export const likeTweet = async ({ tweetId, userId}: { tweetId: string, userId: string}) => {

      await db.insert(likes).values({
        tweetId,
        userId
      }).catch((err) => {
        console.error(err);
      })
 
      revalidatePath('/');

  };

export const unLikeTweet = async ({ tweetId, userId, }: { tweetId: string; userId: string; }) => {
    await supabaseServer
      .from("likes")
      .delete()
      .eq("tweet_id", tweetId)
      .eq("user_id", userId);
  
    revalidatePath("/");
  };

  export const reply = async ({
    tweetId,
    userId,
    replyText,
  }: {
    tweetId: string;
    userId: string;
    replyText: string;
  }) => {
  
    if (replyText === "") return;
  
    await db.insert(tweets).values({
      text: replyText,
      profileId: userId,
      isReply: true,
      replyId: tweetId,
    });
  
    revalidatePath(`/tweet/[id]`);
  };


