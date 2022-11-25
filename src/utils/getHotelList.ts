import { differenceInDays, format } from "date-fns";
import { IOptions, IProperty } from "../types/typings";

const getHotelList = async (
  id: string | string[] | undefined,
  location: string | string[] | undefined,
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  numOfGuests: string | string[] | undefined
) => {
  const url = "https://hotels4.p.rapidapi.com/properties/v2/list";

  const startDay = format(new Date(startDate as string), "dd");
  const startMonth = format(new Date(startDate as string), "MM");
  const startYear = format(new Date(startDate as string), "yyyy");

  const endDay = format(new Date(endDate as string), "dd");
  const endMonth = format(new Date(endDate as string), "MM");
  const endYear = format(new Date(endDate as string), "yyyy");

  const diffInDays = differenceInDays(
    new Date(endDate as string),
    new Date(startDate as string),
  )

  const bodyStr = await JSON.stringify({
    currency: "CAD",
    eapid: 1,
    locale: "en_CA",
    siteId: 300000001,
    destination: { regionId: `${id}` },
    checkInDate: {
      day: Number(startDay),
      month: Number(startMonth),
      year: Number(startYear),
    },
    checkOutDate: {
      day: Number(endDay),
      month: Number(endMonth),
      year: Number(endYear),
    },
    rooms: [{ adults: Number(numOfGuests) }],
    resultsStartingIndex: 0,
    resultsSize: 25,
    sort: "PRICE_LOW_TO_HIGH",
  });

  const options: IOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
    body: bodyStr,
  };

  const data = await fetch(url, options);
  const json = await data.json();

  const hotelsListFormatted = await json.data.propertySearch.properties.map(
    (property: IProperty) => ({
      hotelId: property.id,
      img: property.propertyImage.image.url,
      location: `Private room ${property.destinationInfo.distanceFromDestination.value} km from ${location}`,
      title: property.name,
      description: property.neighborhood.name,
      star: property.reviews.score,
      price: `${property.price.options[0].formattedDisplayPrice}`,
      total: Math.round(
        parseInt(numOfGuests as string) * (property.price.lead.amount * 1.035) * diffInDays
      ),
      long: property.mapMarker.latLong.longitude,
      lat: property.mapMarker.latLong.latitude,
    })
  );

  return hotelsListFormatted!;
};

export default getHotelList;
