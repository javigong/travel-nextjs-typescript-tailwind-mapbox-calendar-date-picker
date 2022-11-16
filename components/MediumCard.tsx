import Image from "next/image";
import { IStyleData } from "../typings";

type Props = {
  styleData: IStyleData;
};

const MediumCard = ({ styleData }: Props) => {
  return (
    <div className="cursor-move hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image
          className="object-cover rounded-xl"
          src={styleData.img}
          alt={styleData.title}
          fill
        />
      </div>
      <div>
        <h3 className="text-2xl mt-3">{styleData.title}</h3>
      </div>
    </div>
  );
};

export default MediumCard;
