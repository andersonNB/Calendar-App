import {addHours} from "date-fns/esm";
import {useCalendarStore, useUiStore} from "../../hooks";

// floating action boton
export const FabAddNew = () => {
	const {openDateModal} = useUiStore();
	const {setActiveEvents} = useCalendarStore();

	const handleClickNew = () => {
		setActiveEvents({
			bgColor: "#fafafa",
			end: addHours(new Date(), 2),
			user: {_id: "123", name: "Anderson"},
			notes: "",
			start: new Date(),
			title: "",
		});
		openDateModal();
	};

	return (
		<button className="btn btn-primary fab" onClick={handleClickNew}>
			<i className="fas fa-plus"></i>
		</button>
	);
};
