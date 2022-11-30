import { addDays } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { IInspiredCity } from "../types/typings";

type Props = {
  getInspiredCities: IInspiredCity[];
};

const Banner = ({ getInspiredCities }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const startDate = addDays(new Date(), 4);
  const endDate = addDays(new Date(), 7);
  const numOfGuests = 1;
  
  const luckyCity =
    getInspiredCities[Math.floor(Math.random() * getInspiredCities.length)];

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: luckyCity.location,
        id: luckyCity.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl-h-[600px] 2xl:h-[700px]">
      <Image
        className="object-cover"
        src="/banner1200x600.jpg"
        fill
        alt="banner"
        priority
      />
      <div className="absolute top-1/2 w-full text-center">
        {session && (
          <p className="text-white text-base sm:text-2xl pb-2">
            Hi, Javier Gongora!
          </p>
        )}
        <p className="text-slate-100 text-sm sm:text-lg">
          Don't you know where to travel?
        </p>
        <button
          onClick={search}
          className="text-red-600 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
        >
          I'm feeling lucky
        </button>
      </div>
    </div>
  );
};

export default Banner;
