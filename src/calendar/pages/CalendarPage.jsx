import {useEffect, useState} from "react";
import {Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from "../";
import {localizer, getMessagesEs} from "../../helpers";
import {useUiStore, useCalendarStore} from "../../hooks";

//Estos events deben venir del store
// const events = [
// 	{
// 		bgColor: "#fafafa",
// 		end: addHours(new Date(), 2),
// 		user: {_id: "123", name: "Anderson"},
// 		notes: "Hay que comprar el pastel",
// 		start: new Date(),
// 		title: "Cumpleaños del Jefe",
// 	},
// ];

//este componente se renderizara cuando este en la ruta correcta
export const CalendarPage = () => {
	//Utilizamos la función de nuestro hook y este a su vez
	//controla el store
	const {openDateModal} = useUiStore();
	const {events, setActiveEvents, startLoadingEvents} = useCalendarStore();

	//Podriamos almacenar estos cambios en el store,
	//pero como es algo minimo sin muchas afectaciones en la
	//aplicación lo manejaremos con un useState
	const [lastView, setlastView] = useState(
		localStorage.getItem("lastView") || "week"
	);

	const eventStyleGetter = (event, startend, endDate, isSelected) => {
		//console.log({event, startend, endDate, isSelected});

		const style = {
			backgroundColor: "#347CF7",
			borderRadius: "0px",
			opacity: 0.8,
			color: "white",
		};

		return {style};
	};

	const onDoubleClick = (event) => {
		//console.log({doubleClick: event});
		openDateModal();
	};
	//Se activa cuando seleccionamos un evento
	const onSelect = (event) => {
		console.log({click: event});
		setActiveEvents(event);
	};

	const onViewChanged = (event) => {
		localStorage.setItem("lastView", event);
		setlastView(event);
	};

	useEffect(() => {
		startLoadingEvents()
	}, [])
	


	return (
		<>
			<Navbar />

			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{height: "calc(100vh - 50px)"}}
				messages={getMessagesEs()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChanged}
			/>
			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</>
	);
};
