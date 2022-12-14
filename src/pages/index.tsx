import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Banner from "../components/Banner";
import CarouselTitlesCard from "../components/CarouselTitlesCard";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import SmallCard from "../components/SmallCard";
import { IStyleData, ISuggestionFormatted } from "../types/typings";

type Props = {
  citiesData: ISuggestionFormatted[];
  stylesData: IStyleData[];
  getInspiredCities: ISuggestionFormatted[];
};

const Home = ({ citiesData, stylesData, getInspiredCities }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
    null
  );

  return (
    <div className="">
      <Head>
        <title>Travel - Vacation rentals for every style</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* Banner */}
      <Banner
        getInspiredCities={getInspiredCities}
        setSearchInput={setSearchInput}
        setSelectedCity={setSelectedCity}
      />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Most visited Canadian cities
          </h2>
          {/* Map Canadian cities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {citiesData.map((city) => (
              <SmallCard
                key={city.img}
                cityData={city}
                setSearchInput={setSearchInput}
                setSelectedCity={setSelectedCity}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">
            Find your travel style
          </h2>
          {/* Map styles data from api */}
          <CarouselTitlesCard images={stylesData} />
          {/* Travel Styles Carousel */}
        </section>

        <LargeCard
          img="/get-inspired1200x600.jpg"
          title="Discover New Destinations"
          description="Curated by our Travel Experts"
          buttonText="Get Inspired"
          getInspiredCities={getInspiredCities}
          setSearchInput={setSearchInput}
          setSelectedCity={setSelectedCity}
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
  // previous citiesDataUrl = "https://www.jsonkeeper.com/b/AU5N";
  const citiesDataUrl = "https://www.jsonkeeper.com/b/DXQ2";
  const citiesData = await fetch(citiesDataUrl).then((res) => res.json());

  const stylesData = await fetch("https://www.jsonkeeper.com/b/RWNY").then(
    (res) => res.json()
  );

  const getInspiredCities = await fetch(
    // "https://www.jsonkeeper.com/b/AU5N"
    "https://www.jsonkeeper.com/b/SNPG"
  ).then((res) => res.json());

  return {
    props: {
      citiesData,
      stylesData,
      getInspiredCities,
    },
  };
};
