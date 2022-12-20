import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useDebounce from "../hooks/useDebounce";
import { ISuggestionFormatted } from "../types/typings";
import getCitySuggestions from "../utils/getCitySuggestions";

type Props = {
  placeholder?: string;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  selectedCity: ISuggestionFormatted | null;
  setSelectedCity: Dispatch<SetStateAction<ISuggestionFormatted | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  placeholder,
  searchInput,
  setSearchInput,
  selectedCity,
  setSelectedCity,
  isOpen,
  setIsOpen,
}: Props) => {
  const { data: session, status } = useSession();
  // const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [citySuggestions, setCitySuggestions] = useState<
    ISuggestionFormatted[] | null
  >(null);
  // const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
  //   null
  // );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState("1");
  const router = useRouter();

  useEffect(() => {
    setCitySuggestions(null);
    searchInput?.length > 3 &&
      getCitySuggestions(debouncedSearchInput, setCitySuggestions).catch(
        console.error
      );
  }, [debouncedSearchInput]);

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
    setCitySuggestions(null);
    setSelectedCity(null);
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: selectedCity?.shortName,
        id: selectedCity?.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });

    resetInput();
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-10">
      {/* Left Section */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 w-25 my-auto overflow-hidden"
      >
        <Image
          className="object-contain cursor-pointer"
          src="/travel-logo.svg"
          height={40}
          width={100}
          alt="Travel"
        />
      </div>
      {/* Middle Section */}
      <div>
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
      </div>
      {/* Right Section, User Menu */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <div className="flex items-center space-x-2 p-2 rounded-full border-2">
          <div className="cursor-pointer link">
            {!isOpen ? (
              <Bars3Icon onClick={() => setIsOpen(true)} className="h-6" />
            ) : (
              <XMarkIcon onClick={() => setIsOpen(false)} className="h-6" />
            )}
          </div>
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {/* Search Autocompletion, Bottom */}
      {!selectedCity &&
        citySuggestions &&
        citySuggestions?.map(
          (city) =>
            city.type === "CITY" && (
              <div className="flex flex-col col-start-2 col-end-4 mt-2">
                <div
                  className="flex"
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchInput(city.displayName);
                  }}
                >
                  <p className="shrink cursor-pointer p-1 px-5 hover:bg-orange-100 active:bg-orange-200 rounded-lg">
                    {city.displayName}
                  </p>
                </div>
              </div>
            )
        )}
      {/* Date Range Picker, Bottom */}
      {selectedCity && (
        <motion.div
          initial={{
            y: -25,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex absolute left-0 right-0 mx-auto items-center flex-col col-span-3 mt-[68px] bg-transparent rounded-b-lg"
        >
          <div className="flex z-10 mx-auto items-center flex-col col-span-3 mb-3 bg-white pb-5 rounded-b-lg shadow-md">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#EA640E"]}
              onChange={handleSelect}
            />
            <div />
            <div className="self-end flex w-fit gap-4 items-center mb-4 pl-5">
              <h2 className="text-l flex-grow font-semibold">
                Number of Guests
              </h2>
              <div className="flex">
                <UsersIcon className="h-5" />
                <input
                  value={numOfGuests}
                  onChange={(e) => setNumOfGuests(e.target.value)}
                  className="w-12 pl-2 text-l outline-none text-orange-500"
                  type="number"
                  min={1}
                />
              </div>
            </div>
            <div className="flex w-full justify-between px-6 pt-2">
              <button onClick={resetInput} className="bg-white self-start px-5 py-2 shadow-md rounded-full font-bold text-sm hover:shadow-xl active:scale-90 transition duration-150">
                Close
              </button>
              <button onClick={search} className="bg-white px-5 py-2 shadow-md rounded-full font-bold text-sm hover:shadow-xl active:scale-90 transition duration-150">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
