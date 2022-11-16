import Image from "next/image";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl-h-[600px] 2xl:h-[700px]">
      <Image className="object-cover" src="/banner1200x600.jpg" fill alt="banner" />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-slate-100 text-sm sm:text-lg">Don't you know where to travel?</p>
        <button className="text-red-600 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">I'm feeling lucky</button>
      </div>
    </div>
  );
};

export default Banner;
