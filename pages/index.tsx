import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import { ICityData, IStyleData } from "../typings";

type Props = {
  citiesData: ICityData[];
  stylesData: IStyleData[];
};

const Home = ({ citiesData, stylesData }: Props) => {
  return (
    <div className="">
      <Head>
        <title>Travel - Vacation rentals for every style</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Most visited Canadian cities
          </h2>
          {/* map data from api */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {citiesData.map((city) => (
              <SmallCard key={city.location} cityData={city} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">
            Find your travel style
          </h2>
          {/* map styles data from api */}
          <div className="flex space-x-3 overflow-x-scroll p-3 -ml-3">
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
        />
      </main>
      <Footer/>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const citiesData = await fetch("https://www.jsonkeeper.com/b/JRFK").then(
    (res) => res.json()
  );

  const stylesData = await fetch("https://www.jsonkeeper.com/b/RWNY").then(
    (res) => res.json()
  );

  return {
    props: {
      citiesData,
      stylesData,
    },
  };
};
