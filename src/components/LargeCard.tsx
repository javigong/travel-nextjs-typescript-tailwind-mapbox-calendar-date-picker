import Image from "next/image";

type Props = {
  img: string;
  title: string;
  description: string;
  buttonText: string;
};

const LargeCard = ({ img, title, description, buttonText }: Props) => {
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

        <button className="text-sm text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
};

export default LargeCard;
