import { HeartIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CarouselCard from "../components/CarouselCard";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MapCard from "../components/MapCard";
import { IDetails, IResult } from "../types/typings";
import getHotelDetails from "../utils/getHotelDetails";

let stripePromise: Promise<Stripe | null>;

type Props = {
  detailsResult: IDetails;
  session: Session;
};

const Details = ({ detailsResult, session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const userEmail = session?.user?.email || "anonymous@user.com";
  const router = useRouter();
  const {
    cityId,
    favorite,
    fromFavPage,
    booking,
    startDate,
    endDate,
    numOfGuests,
    hotelId,
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    long,
    lat,
  } = router.query;
  const searchResults: IResult[] = [
    {
      hotelId: hotelId as string,
      img: img as string,
      title: title as string,
      description: description as string,
      star: parseFloat(star as string),
      price: price as string,
      total: total as unknown as number,
      long: parseFloat(long as string),
      lat: parseFloat(lat as string),
      userEmail: userEmail as string,
    },
  ];
  console.log({ startDate, endDate });
  const formattedStartDate = startDate;
  const formattedEndDate = endDate;
  const range = `from ${formattedStartDate} to ${formattedEndDate}`;
  // Update Fav State from Query Value
  useEffect(() => {
    if (favorite === "true") setIsFav(true);
  }, []);
  // Create New Stripe Checkout Session
  const createCheckoutSession = async () => {
    // Load Stripe
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.stripe_public_key!);
    }
    // Call the Backend API to create a Checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      hotelId: hotelId,
      title: title,
      description: description,
      img: img,
      location: location,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      price: price,
      total: total,
      userEmail: userEmail,
      long: long,
      lat: lat,
      star: star,
      cityId: cityId,
    });
    const stripe = await stripePromise;
    // Redirect user/customer to Stripe Checkout
    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  // Add Fav Hotel to DB
  const submitFavorite = async () => {
    try {
      const body = { ...searchResults[0], location, cityId };
      await fetch("/api/post-favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };
  // Delete Fav Hotel from DB
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
    <div>
      {/* No Placeholder for Hotels from Favorite List */}
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        placeholder={
          fromFavPage === "false"
            ? `${location} - ${range} - ${numOfGuests}`
            : ``
        }
      />
      <main className="flex flex-col max-w-4xl mx-auto">
        {/* Left Section */}
        <section className="flex-grow pt-14 px-6">
          {fromFavPage === "false" && (
            <h3 className="text-sm font-extralight pb-4 mt-2 mb-6 border-b">
              Accommodation available {range}, {numOfGuests} guests
            </h3>
          )}
          <div className="flex justify-between">
            <p className="text-right">{location}</p>
            {/* Favorite Heart Icon */}
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
                className="h-7 cursor-pointer text-orange-600"
              />
            )}
          </div>
          <h4 className="text-3xl font-bold">{title}</h4>
          <div className="border-b w-10 pt-2" />
          <div className="flex">
            <p className="pt-2 text-sm text-gray-800 flex-grow">
              {description}
            </p>
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" /> {star}
            </p>
          </div>
          {/* Photo Gallery */}
          <CarouselCard 
            images={detailsResult.images.slice(0, 25)}
          />
          {/* Accommodation Price Details */}
          {fromFavPage === "false" && (
            <>
              <p className="text-right pb-1 text-sm md:text-base">{range}</p>
              <p className="text-right text-md lg:text-xl">
                {numOfGuests} {numOfGuests === "1" ? "Guest" : "Guests"}
              </p>
            </>
          )}
          <p className="text-right text-xl lg:text-2xl font-semibold">
            {`${price} / night`}
          </p>
          {fromFavPage === "false" && (
            <p className="text-right font-extralight">{`$${total} total (tax incl.)`}</p>
          )}
          {/* Button only available for Searched Hotels, and Not From Favorites List */}
          {fromFavPage === "false" && (
            <div className="w-full flex justify-end">
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className="text-md px-3 py-1 italic text-white cursor-pointer bg-orange-500  rounded-xl mt-3 hover:bg-orange-600 active:scale-95 transition duration-250"
              >
                {!session ? "Sign in to express booking" : "Express Booking"}
              </button>
            </div>
          )}
          {/* Reservation Details */}
          {booking === "true" && (
            <>
              <h3 className="text-2xl font-semibold pt-3 pb-7">
                Booking & Payment details
              </h3>
              <ul className="list-disc pl-5 pb-7">
                <li>
                  Hotel: <span className="font-semibold">{title}</span>
                </li>
                <li>
                  City:{" "}
                  <span className="font-semibold">
                    {(location as string).split("from ")[1]}
                  </span>{" "}
                </li>
                <li>
                  Start date:{" "}
                  <span className="font-semibold"> {startDate}</span>{" "}
                </li>
                <li>
                  End date: <span className="font-semibold"> {endDate}</span>
                </li>
                <li>
                  Price per night<span className="font-semibold"> {price}</span>
                </li>
                <li>
                  Num. of nights:{" "}
                  <span className="font-semibold">
                    {" "}
                    {Math.round(
                      +total! / Number((price! as string).split("$")[1])
                    )}
                  </span>
                </li>
                <li>
                  Total price: <span className="font-semibold"> ${total}</span>
                </li>
              </ul>
              {/* More Hotel Details, Amenities */}
            </>
          )}
          <h3 className="text-2xl font-semibold pb-7">Amenities</h3>
          <ul className="list-disc pl-5">
            {detailsResult.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {/* MapBox, Bottom Section */}
          <h3 className="text-2xl font-semibold py-7">Location</h3>
          <p className="pb-7">{detailsResult.address}</p>
          <div className="w-full h-[500px]">
            <MapCard searchResults={searchResults} />
          </div>
        </section>
      </main>
      <Footer />
      {/* Drawer Menu, closed by default */}
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

export default Details;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { hotelId } = context.query;
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  const detailsResult = await getHotelDetails(hotelId).catch(console.error);

  return {
    props: {
      detailsResult,
      session,
    },
  };
};
