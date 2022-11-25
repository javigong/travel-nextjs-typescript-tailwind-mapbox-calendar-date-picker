import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  session: Session;
};

const Success = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      {/* No Placeholder for Hotels from Favorite List */}
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex flex-col max-w-4xl mx-auto">
        {/* Left Section */}
        <section className="flex-grow pt-14 px-6">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your Reservation has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your booking has been, if you would like to check the status of your booking(s) please press the link below.
          </p>
          <button onClick={()=>router.push("/bookings")} className="button mt-8">Go to my orders</button>
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

export default Success;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
