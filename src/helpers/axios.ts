import axios from 'axios';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: __dirname + '/../.env' });
}

type queryParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
};

export const axiosGet = (url: string, queryParams: queryParams = {}) => {
  const apiKey: string | undefined = process.env.GUARDIAN_API_KEY;
  return axios.get(url, { params: { ...queryParams, 'api-key': apiKey } });
};
