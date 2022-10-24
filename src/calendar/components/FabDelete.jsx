import {useCalendarStore, useUiStore} from "../../hooks";

// floating action boton
export const FabDelete = () => {
	const {} = useCalendarStore();

	const handleClickNew = () => {};

	return (
		<button className="btn btn-danger fab-danger" onClick={handleClickNew}>
			<i className="fas fa-trash-alt"></i>
		</button>
	);
};
