import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus : 100,
    duration: '15s',
}
export default function () {
  http.get('http://54.160.107.228/api/categories');
  sleep(1);
}