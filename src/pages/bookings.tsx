import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult } from "../types/typings";

type Props = {
  bookings: IResult[];
  session: Session;
};

const Bookings = ({ bookings, session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex">
        {/* left section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">Reservation history list</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Bookings</h1>
          <div className="flex flex-col">
            {/* Map Bookings */}
            {bookings?.map((item) => (
              <InfoCard
                key={item.img}
                item={item}
                session={session!}
                favorite={false}
                booking={true}
                fromFavPage={true}
              />
            ))}
          </div>
        </section>
        {/* MapBox, Right Section */}
        <section className="hidden lg:inline-flex flex-grow xl:min-w-[600px]">
          <div className="sticky top-[68px] w-full h-screen">
            <MapCard searchResults={bookings} favorites={true} />
          </div>
        </section>
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
        </p>
        <p className="drawer-current-item">Your Bookings</p>
        <p onClick={() => signOut()} className="drawer-item">
          Sign out
        </p>
      </Drawer>
    </div>
  );
};

export default Bookings;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-bookings?userEmail=${userEmail}`
  );
  const json = await response.json();
  const bookings = json.bookings;

  return {
    props: {
      bookings,
      session,
    },
  };
};
