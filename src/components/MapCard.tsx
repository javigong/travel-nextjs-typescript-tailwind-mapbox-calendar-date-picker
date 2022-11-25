import { StarIcon } from "@heroicons/react/24/solid";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { IResult } from "../types/typings";

type Props = {
  searchResults: IResult[];
  favorites?: Boolean;
};

const MapCard = ({ searchResults, favorites=false }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<IResult | null>(
    null
  );
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));
  const center: any = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    style: {
      width: "100%",
      height: "calc(100% - 68px)",
    },
    initialViewState: {
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: favorites? 1: 11,
    },
  });

  return (
    <>
      <Map
        {...viewport}
        mapStyle="mapbox://styles/javiergongora/clalbftnj000g15nsx3nbjynw"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker
              latitude={result.lat}
              longitude={result.long}
              offset={[-20, -10]}
            >
              <p
                role="img"
                onPointerOver={() => {
                  setSelectedLocation(result);
                }}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
            </Marker>

            {/* popup should show if we click on a marker */}
            {selectedLocation?.long === result.long ? (
              <Popup
                onClose={() => setSelectedLocation(null)}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
              >
                <div className="flex space-x-2">
                  <div className="relative h-[100px] w-[150px]">
                    <Image
                      className="object-cover"
                      src={result.img}
                      alt={result.title}
                      fill
                    />
                  </div>
                  <div className="h-[100px] w-[180px]">
                    <div>{result.title}</div>
                    <div className="flex justify-between items-end pt-5">
                      <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400" /> {result.star}
                      </p>

                      <div>
                        <p className="text-xs lg:text-32xl font-semibold ">
                          {result.price}
                        </p>
                        <p className="text-right font-extralight">
                          {result.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </Map>
    </>
  );
};

export default MapCard;
