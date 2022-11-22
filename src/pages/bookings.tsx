import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult } from "../types/typings";
import getHotelList from "../utils/getHotelList";

type Props = {
  searchResults: IResult[];
};

const Bookings = ({ searchResults }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex">
        {/* left section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            Accommodation list
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Your Bookings
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {/* map search results data */}
            {/* {searchResults.map((item) => (
              <InfoCard key={item.img} item={item} />
            ))} */}
          </div>
        </section>

        {/* right section with map */}
        <section className="hidden lg:inline-flex flex-grow xl:min-w-[600px]">
          {/* <MapCard searchResults={searchResults} /> */}
        </section>
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">List of Favorites</p>
        <p className="drawer-item">Your Bookings</p>
        <p onClick={()=>signOut()} className="drawer-item">Sign out</p>
      </Drawer>
    </div>
  );
};

export default Bookings;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const { id, location, startDate, endDate, numOfGuests } = context.query;
  // TODO: use context to get the router query params to fetch from a third api
  // const searchResults = await getHotelList(
  //   id,
  //   location,
  //   startDate,
  //   endDate,
  //   numOfGuests
  // ).catch(console.error);

  return {
    props: {
      // searchResults,
    },
  };
};
