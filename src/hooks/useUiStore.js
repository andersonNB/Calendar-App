import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseDateModal } from "../store";

//Es un hook que dispara acciones
//Con este hook controlamos las acciones relacionadas al store de ui 
export const useUiStore = () => {

    const dispatch = useDispatch()

    const { isDateModalOpen } = useSelector(state => state.ui);


    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return {
        //propiedades
        isDateModalOpen,

        //métodos
        openDateModal,
        closeDateModal,
    }

}