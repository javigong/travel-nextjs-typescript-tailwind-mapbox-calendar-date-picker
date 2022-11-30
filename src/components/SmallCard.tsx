import { addDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { ICityData } from "../types/typings";

type Props = {
  cityData: ICityData;
};

const SmallCard = ({ cityData }: Props) => {
  const router = useRouter();
  const startDate = addDays(new Date(), 4);
  const endDate = addDays(new Date(), 7);
  const numOfGuests = 1;
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: cityData.location,
        id: cityData.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
  };

  return (
    <div onClick={search} className="flex items-center m-2 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      {/* Left side */}
      <div className="relative h-16 w-16">
        <Image
          className="rounded-lg"
          src={cityData.img}
          alt={cityData.location}
          fill
        />
      </div>
      {/* Right side */}
      <div>
        <h2>{cityData.location}</h2>
        <h3 className="text-gray-500">{cityData.province}</h3>
      </div>
    </div>
  );
};

export default SmallCard;
