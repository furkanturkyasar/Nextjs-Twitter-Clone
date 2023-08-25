import Main from '@/components/Main';
import LeftSidebar from '../components/LeftSidebar';
import RightSection from '@/components/RightSection';

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-[85vw] w-full h-full flex relative">
        <LeftSidebar/>
        <Main/>
        <RightSection/>
      </div>
    </div>
  )
}
