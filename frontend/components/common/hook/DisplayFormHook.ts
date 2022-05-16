import { Dispatch, SetStateAction } from 'react';

export default function useDisplayForm() {
    const handleBackToMenu = (
        setterForReset: Dispatch<SetStateAction<number>>,
        setIsFormUpdate: Dispatch<SetStateAction<boolean>>,
    ) => {
        setterForReset(0);
        setIsFormUpdate(false);
    };

    const displayForm = (
        setIsFormCreate: Dispatch<SetStateAction<boolean>>,
        setIsFormUpdate: Dispatch<SetStateAction<boolean>>,
        setterForReset?: Dispatch<SetStateAction<number>>,
    ) => {
        setterForReset && setterForReset(0);
        setIsFormCreate(true);
        setIsFormUpdate(false);
    };

    return { handleBackToMenu, displayForm };
}
