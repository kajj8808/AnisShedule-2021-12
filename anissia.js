import axios from "axios";
import { getAniData } from "./getAniData";
const getAniDetail = async () => {};

const ANISSIA_URL = "https://anissia.net/api/anime/schedule";
export const getAnissiaSchedule = async (day) => {
  const { data, status } = await axios.get(`${ANISSIA_URL}/${day}`);
  let aniData = [];
  if (status === 200) {
    aniData = await Promise.all(
      data.map(async (ani) => {
        const anis = await getAniData(ani.subject);
        return { ...anis };
      })
    );
  } else {
    aniData = null;
  }
  return aniData;
};

/* const ANISSIA_URL = "https://anissia.net/api/anime/schedule";
export const getAnissiaSchedule = async (day) => {
  const data = [
    { subject: "무직전생 ~이세계에 갔으면 최선을 다한다~" },
    { subject: "흡혈귀는 툭하면 죽는다" },
    { subject: "역전세계의 전지소녀" },
    { subject: "달과 라이카와 흡혈공주" },
    { subject: "킹덤 3" },
    { subject: "경계전기" },
    { subject: "코미 양은 커뮤증입니다" },
    { subject: "명탐정 코난:경찰학교 " },
  ];
  let aniData = [];
  if (true) {
    aniData = await Promise.all(
      data.map(async (ani) => {
        const anis = await getAniData(ani.subject);
        return { ...anis };
      })
    );
  } else {
    aniData = null;
  }
  return aniData;
}; */
//https://image.tmdb.org/t/p/w500/
