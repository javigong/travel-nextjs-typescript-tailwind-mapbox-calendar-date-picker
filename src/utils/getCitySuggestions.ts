import { IOptions, ISuggestion } from "../types/typings";

const getCitySuggestions = async (word: string, setData: any) => {
  const options: IOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };
  const data = await fetch(
    `https://hotels4.p.rapidapi.com/locations/v3/search?q=${word}&locale=en_CA`,
    options
  );
  const json = await data.json();

  const suggestionsFormatted = json.sr.map((suggestion: ISuggestion) => ({
    shortName: suggestion.regionNames.shortName,
    displayName: suggestion.regionNames.displayName,
    id: suggestion.gaiaId,
    type: suggestion.type,
  }));

  setData(suggestionsFormatted);
};

export default getCitySuggestions;
