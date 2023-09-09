'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface IAuthModalProps {
    isError: boolean;
}

const AuthModal = ({isError}: IAuthModalProps) => {

    const supabase = createClientComponentClient();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);

  return (
    <>
        <Toaster position='top-right' richColors />
        <Dialog defaultOpen={isError}>
            <DialogContent className='p-6'>
                <h3 className='text-lg my-1 text-black'>Please Sign in to continue</h3>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    const {data, error} = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', username.trim());

                    if (data && data.length > 0)
                        return toast.error('username already exist, please use another one.');
                        
                    const {data: signUpData, error: signUpError} = await supabase.auth.signInWithOtp({
                        email: email.trim(),
                        options: {
                            data: {
                                username,
                                full_name: fullname,
                            }
                        }
                    })

                    if (signUpError) {
                        return toast.error(signUpError.message);
                    }

                    toast.success("Magic link sent successfully")

                    setLoading(false);
                }}>
                    <Input className='text-black' type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <Input className='text-black' minLength={3} type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    <Input className='text-black' minLength={3} type='text' placeholder='fullname' onChange={(e) => setFullname(e.target.value)} value={fullname} />
                    <p className='text-sm text-gray-900 my-2'>You will receive a magic link here!</p>
                    <div className='flex w-full justify-end'>
                        <Button disabled={loading} className='bg-twitterColor'>Login</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
      
  )
}

export default AuthModal