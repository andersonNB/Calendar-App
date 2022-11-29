import { useEffect } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "../auth";
import {CalendarPage} from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";
// import { getEnvVariables } from "../helpers";

export const AppRouter = () => {
	
	const {status,checkAuthToken} = useAuthStore();

	// const authStatus = "not-authenticated"; //not-authenticated
	// console.log(getEnvVariables())

	//Los useEffect deberian estar por encima de cualquier
	//condición
	useEffect(() => {
		checkAuthToken();
	},[])

	if(status === 'checking'){
		return(
			<h3>Cargando...</h3>
		)
	}



	return (
		<Routes>
			{(status === "not-authenticated") 
			? (
				<>
				<Route path="/auth/*" element={<LoginPage />} />
				<Route path="/*" element={<Navigate to="/auth/login" />} />
				</>
			) : 
			(
				<>
				<Route path="/" element={<CalendarPage />} />
				<Route path="/*" element={<Navigate to="/" />} />
				</>
			)}
			
		</Routes>
	);
};
