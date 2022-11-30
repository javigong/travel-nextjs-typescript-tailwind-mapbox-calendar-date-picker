import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Banner from "../components/Banner";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import { ICityData, IInspiredCity, IStyleData } from "../types/typings";

type Props = {
  citiesData: ICityData[];
  stylesData: IStyleData[];
  getInspiredCities: IInspiredCity[];
};

const Home = ({ citiesData, stylesData, getInspiredCities }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <Head>
        <title>Travel - Vacation rentals for every style</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Banner */}
      <Banner getInspiredCities={getInspiredCities} />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Most visited Canadian cities
          </h2>
          {/* Map Canadian cities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {citiesData.map((city) => (
              <SmallCard key={city.img} cityData={city} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">
            Find your travel style
          </h2>
          {/* Map styles data from api */}
          <div className="flex space-x-3 overflow-x-scroll scrollbar-thin scrollbar-track-[#ede8e824] scrollbar-thumb-orange-400 p-3 -ml-3 pb-6">
            {stylesData.map((style) => (
              <MediumCard key={style.img} styleData={style} />
            ))}
          </div>
        </section>

        <LargeCard
          img="/get-inspired1200x600.jpg"
          title="Discover New Destinations"
          description="Curated by our Travel Experts"
          buttonText="Get Inspired"
          getInspiredCities={getInspiredCities}
        />
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
        </p>
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

export default Home;

export const getStaticProps = async () => {
  // citiesDataUrl = "https://www.jsonkeeper.com/b/JRFK";
  const citiesDataUrl = "https://www.jsonkeeper.com/b/I4ZD";
  const citiesData = await fetch(citiesDataUrl).then((res) => res.json());

  const stylesData = await fetch("https://www.jsonkeeper.com/b/RWNY").then(
    (res) => res.json()
  );

  const getInspiredCities = await fetch(
    "https://www.jsonkeeper.com/b/AU5N"
  ).then((res) => res.json());

  return {
    props: {
      citiesData,
      stylesData,
      getInspiredCities,
    },
  };
};
