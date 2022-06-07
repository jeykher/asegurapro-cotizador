import { createContext, useContext, useState} from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext)

export const AlertContextProvider = ({children}) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [mensaje, setMensaje] = useState('');

    return(
        <AlertContext.Provider value={{openAlert, setOpenAlert,mensaje, setMensaje}}>
            {children}
        </AlertContext.Provider>
    )
}