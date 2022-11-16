import Image from "next/image";
import { MagnifyingGlassIcon, GlobeAltIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-10">
      {/* left section */}
      <div className="relative flex items-center h-10 my-auto overflow-hidden">
        <Image className="object-contain cursor-pointer" src="/travel-logo.svg" height={40} width={100} alt="Travel"/>
      </div>
      {/* middle section */}
      <div className="flex items-center justify-between md:border-2 rounded-full py-2 px-5 md:shadow-sm">
        <input className="bg-transparent min-w-0 outline-none placeholder-gray-400" type="text" placeholder="Start your search" />
        <MagnifyingGlassIcon className="hidden md:inline w-8 bg-orange-500 text-white rounded-full p-2 ml-2"/>
      </div>
      {/* right section */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <div className="flex items-center space-x-2 p-2 rounded-full border-2">
          <Bars3Icon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
