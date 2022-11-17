import { format } from "date-fns";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult } from "../typings";

type Props = {
  searchResults: IResult[];
};

const Search = ({ searchResults }: Props) => {
  const router = useRouter();
  const { location, startDate, endDate, numOfGuests } = router.query;

  const formattedStartDate = format(
    new Date(startDate as string),
    "dd MMMM yy"
  );
  const formattedEndDate = format(new Date(endDate as string), "dd MMMM yy");
  const range = `from ${formattedStartDate} to ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} - ${range} - ${numOfGuests}`} />

      <main className="flex">
        {/* left section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Accommodations {range}, {numOfGuests} guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {/* map search results data */}
            {searchResults.map(
              (item) => (
                <InfoCard
                  key={item.img}
                  item={item}
                />
              )
            )}
          </div>
        </section>
        {/* right section with map */}
        <section className="hidden lg:inline-flex xl:min-w-[600px]">
          <MapCard searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export const getServerSideProps = async () => {
  // TODO: use context to get the router query params to fetch from a third api
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
};
