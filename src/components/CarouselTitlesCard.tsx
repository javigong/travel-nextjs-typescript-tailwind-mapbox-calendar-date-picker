import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type Props = {
  images: {
    img: string;
    title: string;
  }[];
};

const CarouselTitlesCard = ({ images }: Props) => {
  return (
    <>
      <Carousel
        className=""
        showStatus={false}
        autoPlay
        infiniteLoop
        emulateTouch
        showThumbs={false}
        interval={7000}
      >
        {images.map((item) => (
          <div className="h-[400px] w-full md:h-[500px] relative overflow-hidden rounded-2xl">
            <img className="object-cover " src={item.img} alt={item.img} />
            <div className="absolute bottom-5 text-4xl font-light my-3 mx-9 text-white bg-black/30 px-2 py-1">
              {item.title}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselTitlesCard;
