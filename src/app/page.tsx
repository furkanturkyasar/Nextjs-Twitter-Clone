import Main from '@/components/main';
import LeftSidebar from '../components/leftSidebar';
import RightSection from '@/components/rightSection';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/lib/supabase.types'
import AuthModal from '@/components/authModal';

export const dynamic = 'force-dynamic'

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies });

  const {data, error} = await supabase.auth.getUser();
  console.log('data: ',data);

  

  return (
      <div className="w-full h-full flex justify-center items-center relative bg-black">
        <div className="xl:max-w-[85vw] w-full h-full flex relative">
          <AuthModal isError={error?.status === 401 ? true : false} />
          <LeftSidebar/>
          <Main/>
          <RightSection/>
        </div>
      </div>
  )
}
