import {api, URL} from 'src/boot/axios';

export const useGetEpisodes = async (numbers) => {
  try {
    const episodesString = numbers
      .map((item) => item.replace(`${URL}episode/`, ""))
      .slice(0, 5)
      .join();

    const {data} = await api.get(`${URL}episode/${episodesString}`)
    if (data.constructor.name == "Array") return data;
    else return [data];

  } catch (error) {
    throw new Error(error.message)
  }
}
