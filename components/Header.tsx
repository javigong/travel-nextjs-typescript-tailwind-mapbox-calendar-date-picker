import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type Props = {
  placeholder?: string;
};

const Header = ({ placeholder }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState("1");
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-10">
      {/* left section */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 my-auto overflow-hidden"
      >
        <Image
          className="object-contain cursor-pointer"
          src="/travel-logo.svg"
          height={40}
          width={100}
          alt="Travel"
        />
      </div>
      {/* middle section */}
      <div className="flex items-center justify-between md:border-2 rounded-full py-2 px-5 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow bg-transparent min-w-0 outline-none placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <MagnifyingGlassIcon className="hidden md:inline w-8 bg-orange-500 text-white rounded-full p-2 ml-2" />
      </div>
      {/* right section */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <div className="flex items-center space-x-2 p-2 rounded-full border-2">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto my-3">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#EA640E"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4 mx-5">
            <h2 className="text-l flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)}
              className="w-12 pl-2 text-l outline-none text-orange-500"
              type="number"
              min={1}
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-400">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-orange-500">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
