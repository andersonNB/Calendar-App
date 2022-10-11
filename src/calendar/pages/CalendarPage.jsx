import {Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {addHours} from "date-fns";
import {Navbar} from "../components/Navbar";
import {localizer, getMessagesEs} from "../../helpers";

const events = [
	{
		title: "Cumpleaños del Jefe",
		notes: "Hay que comprar el pastel",
		start: new Date(),
		end: addHours(new Date(), 2),
		bgColor: "#fafafa",
	},
];

//este componente se renderizara cuando este en la ruta correcta
export const CalendarPage = () => {
	const eventStyleGetter = (event, startend, endDate, isSelected) => {
		console.log({event, startend, endDate, isSelected});

		const style = {
			backgroundColor: "#347CF7",
			borderRadius: "0px",
			opacity: 0.8,
			color: "white",
		};

		return {style};
	};

	return (
		<>
			<Navbar />
			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{height: "calc(100vh - 50px)"}}
				messages={getMessagesEs()}
				eventPropGetter={eventStyleGetter}
			/>
		</>
	);
};
