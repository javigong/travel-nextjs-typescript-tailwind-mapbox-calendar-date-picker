export interface ICityData {
  img: string;
  location: string;
  province: string;
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
  description: string;
  img: string;
  lat: number;
  location: number;
  long: number;
  price: string;
  star: number;
  title: string;
  total: string;
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
}

export interface provider {
  name: string,
  id: string,
}

export interface ISession {
  user: {
    name: string;
    email: string;
    image: string;
    address: string;
  } & DefaultSession["user"];
  expires: string;
}