
import { db } from '@/lib/db';
import { tweets } from '@/lib/db/schema';
import React from 'react'

const TweetPage = ({ params }: {params: {id: string}}) => {

    console.log(params.id);
    //const tweet = db.select().from(tweets)

  return (
    <main className='sticky top-0 w-full xl:w-[50%] flex h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600'>
        this is tweet page
    </main>
  )
}

export default TweetPage