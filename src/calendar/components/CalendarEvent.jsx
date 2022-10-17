import React from "react";
//Vamos a desestructurar las props ya que trabajaremos
//con ciertas propiedades
export const CalendarEvent = ({event}) => {
	//console.log(props); //-> Vienen todas las propiedades del calendario
	const {title, user} = event;

	return (
		<>
			<strong>{title} </strong>
			<span>- {user.name}</span>
		</>
	);
};
