import React, {  ReactElement, createContext, useState } from 'react'

const ToastContext = createContext<any>('')

type props = {
  children: ReactElement
}
type toastType = {
  toastMessage : String | null;
}
const ToastProvider = ({children}:props) => {
    const [toastMessage, setToastMessage] = useState<toastType>()

  return (
    <ToastContext.Provider value={[toastMessage, setToastMessage]}>
    {children}
    </ToastContext.Provider>
    )
}

export default ToastProvider
export {ToastContext}

