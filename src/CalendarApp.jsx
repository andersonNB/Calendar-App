import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {AppRouter} from "./router";
import {store} from "./store";

const CalendarApp = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
			{/* El hashROuter es una forma de arreglar
			el problema cuando el front le pide al bk
			un ruta que no existe, esto podria ser util
			cuando no tengamos acceso al bk, pero las rutas
			se tornan un poco feas de visualziar */}
			{/* <HashRouter>
			<AppRouter />
			</HashRouter> */}
				<AppRouter />
			</BrowserRouter>
		</Provider>
	);
};

export default CalendarApp;
