import { IOptions } from "../types/typings";

const getHotelDetails = async (propertyId: string | string[] | undefined) => {
  const url = "https://hotels4.p.rapidapi.com/properties/v2/get-summary";

  const bodyStr = await JSON.stringify({
    currency: "CAD",
    eapid: 1,
    locale: "en_CA",
    siteId: 300000001,
    propertyId: propertyId,
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

  const property = await json.data.propertyInfo;
  const hotelDetailsFormatted = {
    images: property.propertyGallery.images.map(
      (item: { image: { url: string } }) => item.image.url
    ),
    amenities: property.summary.amenities.topAmenities.items.map(
      (item: { text: string }) => item.text
    ),
    address: property.summary.location.address.addressLine,
    
  };

  return hotelDetailsFormatted!;
};

export default getHotelDetails;
