import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";


//Este hook tiene como objetivo interactuar con nuestro
//store con la parte del auth
export const useAuthStore = ()=>{


    const {status,user,errorMessage} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    //Recibe un objeto con dos propiedades el email y el password
    const startLogin = async({email, password})=>{

        console.log(email, password);

        try {
            
            const resp = await calendarApi.post('/auth',{email, password});
            console.log(resp)

        } catch (error) {
           console.log(error)   
        }

    }


    return {
        //Propiedades
        errorMessage,
        status,
        user,

        //Metodos
        startLogin,
    }

}