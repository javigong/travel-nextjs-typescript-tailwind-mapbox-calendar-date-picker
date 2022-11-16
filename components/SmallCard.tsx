import Image from "next/image";
import { ICityData } from "../typings";

type Props = {
  cityData: ICityData;
};

const SmallCard = ({ cityData }: Props) => {
  return (
    <div className="flex items-center m-2 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      {/* left side */}
      <div className="relative h-16 w-16">
        <Image className="rounded-lg" src={cityData.img} alt={cityData.location} fill />
      </div>
      {/* right side */}
      <div>
        <h2>{cityData.location}</h2>
        <h3 className="text-gray-500">{cityData.province}</h3>
      </div>
    </div>
  );
};

export default SmallCard;
