import {useCalendarStore, useUiStore} from "../../hooks";

// floating action boton
export const FabDelete = () => {
	const {startDeletingEvent, hasEventSelected} = useCalendarStore();
	const {isDateModalOpen} = useUiStore();

	const handleDelete = () => {
		startDeletingEvent();
	};

	return (
		<button
			className="btn btn-danger fab-danger"
			onClick={handleDelete}
			style={{
				display: hasEventSelected ? "" : isDateModalOpen ? "none" : "none",
			}}
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	);
};
