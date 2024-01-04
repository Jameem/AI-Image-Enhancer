import axios from 'axios';
import { EnhanceProperty } from '../components/ImageEnhancer/ImageUpload';

export const enhance = async (type: EnhanceProperty, image: File) => {
  const formdata = new FormData();
  formdata.append('image', image);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${type.toLocaleLowerCase()}`,
      formdata
    );

    return response?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
