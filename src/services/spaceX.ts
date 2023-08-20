import { BASE_URL } from '@/utils/constants';
import axios from 'axios';


export const spaceX = async (endpoint: string, params?: string) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        console.log(url);
        const response = await axios.get(url, {params});
        console.log(params);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getRockets = async () => {
    try {
      const rocketsResponse = await axios.get(`${BASE_URL}/rockets`);
      const rocketsData = rocketsResponse.data;
  
      // Fetch additional data for each rocket
      const rocketsWithImages = await Promise.all(
        rocketsData.map(async (rocket: any) => {
          const imagesResponse = await axios.get(`${BASE_URL}/v4/rockets/${rocket.id}`);
          const imagesData = imagesResponse.data;
  
          return {
            ...rocket,
            flickr_images: imagesData.flickr_images,
          };
        })
      );
  
      return rocketsWithImages;
    } catch (error) {
      console.log(error);
      return [];
    }
  };