import { TMDB_API_KEY } from "./app.config.json";
import axios from "axios";

export const tmdbAPI = {
  search: async function (query) {
    const url = "https://api.themoviedb.org/3/search/multi";
    const {
      data: { results },
    } = await axios.get(url, {
      params: {
        api_key: TMDB_API_KEY,
        language: "ko-KR",
        query,
        page: 1,
        include_adult: false,
      },
    });

    if (results[0]) {
      return results[0];
    }
    return {};
  },
};
