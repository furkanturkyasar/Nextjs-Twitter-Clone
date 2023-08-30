'use client'

import { PostgrestError } from '@supabase/supabase-js';
import React, { useRef } from 'react'
import { toast } from 'sonner';

type ComposeTweetFormProps = {
    serverAction: (formData: FormData) => Promise<
    { error: { message: string; }; data?: undefined; }
    | { data: null; error: PostgrestError | null; } 
    | undefined>
}

const ComposeTweetForm = ({serverAction}: ComposeTweetFormProps) => {

    const resetRef = useRef<HTMLButtonElement>(null);

    const handleSubmitTweet = async (data: any) => {
        const res = await serverAction(data);
            
        if (res?.error) {
            return toast.error(res.error.message)
        }
        console.log(res);
        resetRef.current?.click();
        return toast.success('Tweet sent successfully');
    }

  return (
    <form 
    action={handleSubmitTweet} 
    className='flex flex-col w-full h-full'>
                <input name='tweet' className='w-full h-full text-xl placeholder:text-gray-600 bg-transparent border-none outline-none p-4 border-gray-600' type="text" placeholder="What's happening?" />
                <div className='w-full justify-between items-center flex'>
                  <div></div>
                  <div className='w-full h-full max-w-[100px]'>
                    <button type='submit' className="rounded-full font-bold bg-twitterColor px-4 py-2 w-full text-lg text-center hover:opacity-70 transition duration-200">
                      Tweet
                    </button>
                    <button ref={resetRef} hidden type='reset'></button>
                  </div>
                </div>
      </form>
  )
}

export default ComposeTweetForm;