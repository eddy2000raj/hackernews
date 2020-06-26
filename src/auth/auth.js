import axios from 'axios';


/*uses decorator pattern for creating a new axios object with base URL*/
const axiosAuth= axios.create({
  baseURL: 'https://hn.algolia.com/api'
})


/*const axiosAuth= axios.create({
  baseURL: 'https://hn.algolia.com/api',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})
*/


export default axiosAuth;

