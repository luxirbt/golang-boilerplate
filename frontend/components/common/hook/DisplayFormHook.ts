import { Dispatch, SetStateAction, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

export default function useDisplayForm() {
    const { setIsFormCreate, setIsFormUpdate } = useContext(AppContext);

    const handleBackToMenu = (setterForReset: Dispatch<SetStateAction<number>>) => {
        setterForReset(0);
        setIsFormUpdate(false);
    };

    const displayForm = (setterForReset?: Dispatch<SetStateAction<number>>) => {
        setterForReset && setterForReset(0);
        setIsFormCreate(true);
        setIsFormUpdate(false);
    };

    const displayFormUpdate = () => {
        setIsFormCreate(false);
        setIsFormUpdate(true);
    };

    return { handleBackToMenu, displayForm, displayFormUpdate };
}
