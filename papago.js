import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from "./app.config.json";
import axios from "axios";

export const papagoTranslation = async (word, start = "ko", end = "ja") => {
  const {
    status,
    data: {
      message: {
        result: { translatedText },
      },
    },
  } = await axios.post(
    "https://openapi.naver.com/v1/papago/n2mt",
    {
      source: start,
      target: end,
      text: word,
    },
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );
  if (status === 200) {
    return translatedText;
  } else {
    return null;
  }
};
