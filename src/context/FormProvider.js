"use client"
import { useState } from "react"
import { FormContext } from "./Context"


const FormProvider = ({ children }) => {

    const [formState, setFormState] = useState({
        url: null,
        certificateData: null
    })

    return (
        <FormContext.Provider value={{ formState, setFormState }}>
            {children}
        </FormContext.Provider>
    )
}
export default FormProvider