import "next-auth";

export interface ICityData {
  img: string;
  location: string;
  province: string;
  id?: string;
}
export interface IInspiredCity {
  location: string;
  id: string;
}

export interface IStyleData {
  img: string;
  title: string;
}

export interface IProperty {
  propertyImage: {
    image: {
      url: string;
    };
  };
  destinationInfo: {
    distanceFromDestination: {
      value: number;
    };
  };
  mapMarker: {
    latLong: {
      latitude: number;
      longitude: number;
    };
  };
  id: string;
  name: string;
  neighborhood: {
    name: string;
  };
  reviews: {
    score: number;
  };
  price: {
    options: [
      {
        formattedDisplayPrice: string;
      }
    ];
    lead: {
      amount: number;
    };
  };
}

export interface IResult {
  hotelId: string;
  description: string;
  img: string;
  lat: number;
  location?: number;
  long: number;
  price: string;
  star: number;
  title: string;
  total: number;
  userEmail?: string;
  startDate?: string;
  endDate?: string;
}

export interface IDetails {
  images: string[];
  amenities: string[];
  address: string;
}

export interface IOptions {
  method: string;
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
    "content-type"?: string;
  };
  body?: string;
}

export interface ISuggestion {
  regionNames: {
    shortName: string;
    displayName: string;
  };
  gaiaId: number;
  type: string;
}

export interface ISuggestionFormatted {
  shortName: string;
  displayName: string;
  id: number;
  type: string;
  img?: string;
  location?: string;
  province?: string;
}

export interface provider {
  name: string;
  id: string;
}

export interface IReservation {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
    };
  };
  quantity: number;
}
