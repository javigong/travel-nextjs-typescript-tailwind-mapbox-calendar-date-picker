import { HeartIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IResult } from "../types/typings";

type Props = {
  item: IResult;
  session: Session;
  favorite?: Boolean;
};

const InfoCard = ({ item, session, favorite = false }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const userEmail = session?.user?.email!;
  const hotelId = item.hotelId;

  useEffect(() => {
    if (favorite) setIsFav(true);
  }, []);

  const submitFavorite = async () => {
    try {
      const body = { ...item };
      await fetch("/api/post-favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async () => {
    try {
      const body = { hotelId: hotelId, userEmail: userEmail };
      await fetch("/api/delete-favorite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          className="object-cover rounded-2xl"
          src={item.img}
          alt={item.title}
          fill
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="">{item.location}</p>
          {!isFav ? (
            <HeartIcon
              onClick={() => {
                submitFavorite();
                setIsFav(true);
              }}
              className="h-7 cursor-pointer"
            />
          ) : (
            <HeartIconSolid
              onClick={() => {
                deleteFavorite();
                setIsFav(false);
              }}
              className="h-7 cursor-pointer"
            />
          )}
        </div>
        <h4 className="text-xl">{item.title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-800 flex-grow">
          {item.description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" /> {item.star}
          </p>

          <div>
            <p className="text-lg lg:text-32xl font-semibold ">{item.price}</p>
            <p className="text-right font-extralight">{item.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
