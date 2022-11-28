import axios from 'axios';
import { getEnvVariables } from "../helpers";


const {VITE_API_URL} = getEnvVariables()

//Dejamos seteada nuestra base url desde el archivo
//.env
const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO: configurar interceptores


export default calendarApi;