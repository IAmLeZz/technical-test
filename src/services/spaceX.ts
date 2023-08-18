import { BASE_URL } from '@/utils/constants';
import axios from 'axios';

interface SpaceXDataParams {
    [key: string]: string | number;
}

export const spaceX = async (endpoint: string, params?: SpaceXDataParams) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        console.log(url);
        const response = await axios.get(url, {params});
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}