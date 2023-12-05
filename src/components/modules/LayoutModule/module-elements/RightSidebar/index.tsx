import Link from 'next/link'
import { WiStars } from 'react-icons/wi'

export const RightSidebar: React.FC = () => {
  return (
    <aside className="font-poppins text-black p-10 flex-shrink-0 bg-white h-screen border border-l-black/10">
      <div className="w-56 bg-grayjoy/10 rounded-xl flex-col items-center gap-2 shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-paytone text-lg flex">
            Trending
          </span>
          <WiStars size={40} className="fill-royal"/>
        </div>

        <div className="font-poppins flex flex-col py-1">
          <div className="flex flex-col gap-y-1 border-b border-b-black/5 py-2">
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              1. Trending
            </span>
            <span className="px-4 font-bold">#Kubah Mas</span>
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              999 Reviews
            </span>
          </div>

          <div className="flex flex-col gap-y-1 border-b border-b-black/5 py-2">
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              2. Trending
            </span>
            <span className="px-4 font-bold">#Kubah Mas</span>
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              999 Reviews
            </span>
          </div>

          <div className="flex flex-col gap-y-1 border-b border-b-black/5 py-2">
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              3. Trending
            </span>
            <span className="px-4 font-bold">#Kubah Mas</span>
            <span className="px-4 text-sm text-opacity-70 text-grayjoy">
              999 Reviews
            </span>
          </div>
        </div>

        <Link
          href=""
          className="font-popins font-semibold text-sm flex justify-center items-center px-4 py-3 text-royal hover:underline"
        >
          See more
        </Link>
      </div>
    </aside>
  )
}
