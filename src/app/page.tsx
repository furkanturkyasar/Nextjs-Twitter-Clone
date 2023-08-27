import Main from '@/components/Main';
import LeftSidebar from '../components/LeftSidebar';
import RightSection from '@/components/RightSection';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Toaster } from 'sonner';

import type { Database } from '@/lib/supabase.types'
import AuthModal from '@/components/AuthModal';

export const dynamic = 'force-dynamic'

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {data, error} = await supabase.auth.getUser();

  return (
      <div className="w-full h-full flex justify-center items-center relative bg-black">
        <div className="max-w-[85vw] w-full h-full flex relative">
          <Toaster />
          <AuthModal isError={error?.status === 401 ? true : false} />
          <LeftSidebar/>
          <Main/>
          <RightSection/>
        </div>
      </div>
  )
}
