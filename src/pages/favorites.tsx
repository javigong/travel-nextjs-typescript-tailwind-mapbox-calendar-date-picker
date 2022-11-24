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
  favorites: IResult[];
  session: Session;
};

const Favorites = ({ favorites, session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log({ favorites });
  return (
    <div>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex">
        {/* left section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">Accommodation list</p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">Favorites</h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {/* map search results data */}
            {favorites?.map((item) => (
              <InfoCard key={item.img} item={item} session={session!} favorite={true} />
            ))}
          </div>
        </section>

        {/* right section with map */}
        <section className="hidden lg:inline-flex flex-grow xl:min-w-[600px]">
          <MapCard searchResults={favorites} favorites={true} />
        </section>
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-current-item">List of Favorites</p>
        <p className="drawer-item">
          <Link href={"/bookings"}>Your Bookings</Link>
        </p>
        <p onClick={() => signOut()} className="drawer-item">
          Sign out
        </p>
      </Drawer>
    </div>
  );
};

export default Favorites;

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

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/get-favorites/?${userEmail}`);
  const json = await response.json();
  const favorites = json.favorites;

  return {
    props: {
      favorites,
      session,
    },
  };
};
