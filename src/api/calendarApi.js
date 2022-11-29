import axios from 'axios';
import { getEnvVariables } from "../helpers";


const {VITE_API_URL} = getEnvVariables()

//Dejamos seteada nuestra base url desde el archivo
//.env
const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO: configurar un interceptor al momento de hacer un request
calendarApi.interceptors.request.use(config=>{

    //Hace la configuración respectiva a los headers
    config.headers={
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default calendarApi;