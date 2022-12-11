import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onClearCalendar, onLogin, onLogout } from "../store";


//Este hook tiene como objetivo interactuar con nuestro
//store con la parte del auth
export const useAuthStore = ()=>{


    const {status,user,errorMessage} = useSelector(state=>state.auth);
    
    const dispatch = useDispatch();

    //Recibe un objeto con dos propiedades el email y el password
    const startLogin = async({email, password})=>{

        // console.log(email, password);

        dispatch(onChecking());
        
        try {
            // resp -> info que llega del bk
            const {data} = await calendarApi.post('auth',{email, password});
            // console.log(resp)
            //Configuramos nuestro token en el localstoragr
            localStorage.setItem('token',data.token);
            //este campo nos ayuda a tener la hora exacta en el cual
            //fue creado el token
            localStorage.setItem('token-init-date',new Date().getTime());
           //Hacemos nuestros dispatch que nos setea la info que llega en el store
            dispatch(onLogin({name:data.name,uid:data.uid}));

        } catch (error) {
           console.log(error) 
           dispatch(onLogout('Credenciales incorrectas'));

           setTimeout(() => {

            dispatch(clearErrorMessage());
           }, 10);

        }

    }

    const startRegister = async({name,email,password, password2}) => {
        // console.log(name, email, password, password2);
        dispatch(onChecking());

        try {
            
            const {data} = await calendarApi.post('auth/new',{name,email,password, password2});
            // console.log(resp)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(onLogin({name:data.name,uid:data.uid}));

        } catch (error) {
            console.log(error)

            dispatch(onLogout('Por favor verificar sus datos'));

           setTimeout(() => {

            dispatch(clearErrorMessage());
           }, 10);
        }
    }

    //Si utilizamos un useEffect en este archivo que escuche
    //los cambios de esta función se va a dispirar n veces
    //por cada vez que se utilice el hook useAuthStore
    const checkAuthToken = async()=>{
       
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogout());


        try {
            
            const {data} = await calendarApi.get('auth/renew')
            // console.log(data)
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            

            dispatch(onLogin({name:data.name,uid:data.uid}));


        } catch (error) {
            console.log(error)
            //SI llega a salir mal borrar todos los datos
            //del usuario del localStorage
            localStorage.clear();
            dispatch(onLogout());
        }



    }

    //Para hacer el efecto de cerrar sesión limpiando el
    //localStorage
    const startLogout = () =>{

        localStorage.clear();
        dispatch(onClearCalendar());
        dispatch(onLogout());


    }





    return {
        //Propiedades
        errorMessage,
        status,
        user,

        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }

}