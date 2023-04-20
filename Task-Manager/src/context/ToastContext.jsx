import { createContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={{ toast }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // default options
                    className: '',
                    duration: 2000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // options for specific types
                    success: {
                        duration: 1500,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext;
