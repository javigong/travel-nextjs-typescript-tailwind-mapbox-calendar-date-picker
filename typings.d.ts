export interface ICityData {
  img: string;
  location: string;
  province: string;
}

export interface IStyleData {
  img: string;
  title: string;
}

export interface IResult {
  description: string;
  img: string;
  lat: number;
  location: string;
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
  };
}

export interface ISuggestion {
  regionNames: {
    shortName: string;
    displayName: string;
  };
  gaiaId: number;
  type: string,
}

export interface ISuggestionFormatted {
  shortName: string,
  displayName: string,
  id: number,
  type: string,
}