import axios from 'redaxios';

export let APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

if (!/^https?:\/\//i.test(APP_URL)) {
  APP_URL = 'https://' + APP_URL;
}

const API = axios.create({
  baseURL: `${APP_URL}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
