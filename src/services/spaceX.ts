import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

export const spaceXApiCaller = async (endpoint: string, params?: Params) => {
  try {
      const id = params?.id || '' ;
      const url = `${BASE_URL}/${endpoint}/${id}`;
      const response = await axios.get(url);
      return response.data;
  }
  catch (error) {
      console.log(error);
  }
}