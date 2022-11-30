import { addDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { IInspiredCity } from "../types/typings";

type Props = {
  img: string;
  title: string;
  description: string;
  buttonText: string;
  getInspiredCities: IInspiredCity[];
};

const LargeCard = ({ img, title, description, buttonText, getInspiredCities }: Props) => {
  const router = useRouter();
  const startDate = addDays(new Date(), 4);
  const endDate = addDays(new Date(), 7);
  const numOfGuests = 1;

  const getInspiredCity = getInspiredCities[Math.floor(Math.random() * getInspiredCities.length)];

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: getInspiredCity.location,
        id: getInspiredCity.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
  };

  return (
    <section className="relative py-16">
      {/* bg image */}
      <div className="relative h-96 min-w=[300px]">
        <Image className="object-cover object-left rounded-2xl" src={img} alt={title} fill />
      </div>
      {/* text */}
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <h2>{description}</h2>

        <button onClick={search} className="text-sm text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
};

export default LargeCard;
