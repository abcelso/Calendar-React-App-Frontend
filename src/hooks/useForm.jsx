import { useState } from "react";

export const useForm = (initialState = {}) => {


    const [formValue, setFormValue] = useState(initialState)

    const reset = () => {
        setFormValue(initialState);
    };

    const setV = (value) => {
        setFormValue(value);
    };

    const handleInputChange = ( {target} ) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value,
        });
    };

    return [formValue, setV, handleInputChange, reset];
}
