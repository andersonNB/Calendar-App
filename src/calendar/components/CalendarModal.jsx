import {useEffect, useMemo, useState} from "react";
import {addHours, differenceInSeconds} from "date-fns";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {useCalendarStore, useUiStore} from "../../hooks";

registerLocale("es", es);
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
	const {isDateModalOpen, closeDateModal} = useUiStore();
	const {activeEvent, startSavingEvent} = useCalendarStore();

	//Ya no necesitamos el estado local, ahora utilizaremos el store
	//const [isModalOpen, setisModalOpen] = useState(true);

	//Cuando la persona haga el submit, lo controlamos
	//por medio de un estado
	const [formSubmitted, setFormSubmitted] = useState(false);

	//Vamos a controlar el estado de un formulario
	//Con addHours agregamos mas hora a la fecha actual
	//esto es posible gracias a la librería date-fns
	const [formValues, setFormValues] = useState({
		title: "Anderson",
		notes: "Navarro",
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	//Este valor se va a memorizar unicamente si el
	// formValue.title cambia o el formSubmitted cambia
	const titleClass = useMemo(() => {
		if (!formSubmitted) return "";

		return formValues.title.length > 0 ? "is-valid" : "is-invalid";
	}, [formValues.title, formSubmitted]);

	//Utilizando el useEffect estamos pendientes para setear los cambios
	//del evento activo, es decir este efecto estara pendiente de cuando cambie
	// el evento activo
	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({...activeEvent});
		}
	}, [activeEvent]);

	const onInputChanged = ({target}) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};

	const onCloseModal = () => {
		console.log("cerrando modal");
		//setisModalOpen(false);
		closeDateModal();
	};

	const onSubmit = async (event) => {
		//Evitamos el esparcimiento del formulario
		event.preventDefault();
		setFormSubmitted(true);

		//Validamos que la fecha final sea mayor
		const difference = differenceInSeconds(formValues.end, formValues.start);

		console.log({difference});
		//EN esta condicipon aseguramos que no sean vacias las fechas
		//o sea menor
		if (isNaN(difference) || difference <= 0) {
			Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
			return;
		}
		//Validamos el titulo
		if (formValues.title.length <= 0) return;

		console.log(formValues);

		//todos
		//Remover errores en pantalla
		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted(false);
	};

	return (
		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<h6>Modal, Con la librería react-modal</h6>
			<h1> Nuevo evento </h1>
			<form className="container" onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker
						selected={formValues.start}
						onChange={(event) => onDateChanged(event, "start")}
						className="form-control"
						dateFormat="Pp"
						showTimeSelect
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						minDate={formValues.start}
						selected={formValues.end}
						onChange={(event) => onDateChanged(event, "end")}
						className="form-control"
						dateFormat="Pp"
						showTimeSelect
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputChanged}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onInputChanged}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
