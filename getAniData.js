import fs from "fs";
import { tmdbAPI } from "./tmdb";
import { papagoTranslation } from "./papago";

let aniDB = {};
let onChange = false;

const saveAniDB = async () => {
  await fs.writeFileSync("aniNameDatas.json", JSON.stringify(aniDB));
};

//anissia 에서 사용되는중!
export const getTMDBData = async (aniTitle, originalTitle) => {
  if (!aniTitle && !originalTitle) return;

  let poster_path, media_type, id, first_air_date;
  ({ poster_path, media_type, id, first_air_date } = aniDB[aniTitle]);
  if (!id) {
    ({ poster_path, media_type, id, first_air_date } = await tmdbAPI.search(
      aniTitle
    ));
    if (id === "" || id === undefined) {
      console.log(aniTitle);
      try {
        ({ poster_path, media_type, id, first_air_date } = await tmdbAPI.search(
          originalTitle
        ));
        onChange = true;
      } catch (error) {
        console.log(`Title Data Error ${aniTitle}  [${originalTitle}]`);
        return [];
      }
    }
  }

  return { poster_path, media_type, id, first_air_date };
};

export const getOriginalTitle = async (aniTitle) => {
  if (!aniTitle) return;
  let originalTitle = aniDB[aniTitle]?.jp;
  if (!originalTitle) {
    originalTitle = await papagoTranslation(aniTitle);
    //7 은 ova ovd movie 라서.

    //aniDB[aniName] = { ko: aniTitle, jp: originalTitle, season: 0 };
    //aniDB[aniName] = { ko: aniName, jp: originalTitle, season: 1 };
  }
  return originalTitle;
};

const aniDBLoading = async () => {
  const fileData = await fs.readFileSync("aniNameDatas.json");
  aniDB = JSON.parse(fileData);
};

export const initalLoading = async () => {
  await aniDBLoading();
  getAniData("아케비의 세일러복", 8);
};

export const getAniData = async (aniTitle, day) => {
  let aniItem = aniDB[aniTitle];
  if (!aniItem?.ko) {
    console.log(aniItem);
    aniItem = aniDB[aniTitle] = {
      ko: aniTitle,
      jp: await getOriginalTitle(aniTitle),
    };
  }

  const originalTitle = await getOriginalTitle(aniTitle);
  const tmdbData = await getTMDBData(aniTitle, originalTitle);
  aniDB[aniTitle] = { ...aniItem, ...tmdbData };
  if (onChange) {
    await saveAniDB();
    await aniDBLoading();
  }

  return { ...aniItem, ...tmdbData };
  if (tmdbData) {
    return { originalTitle, ...tmdbData, ...aniItem };
  }
};
initalLoading();
