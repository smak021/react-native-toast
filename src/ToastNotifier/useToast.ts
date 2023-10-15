
import  { useContext } from 'react'
import { ToastContext } from './ToastProvider'

const useToast = () => {
  const [toastMessage, setToastMessage] = useContext(ToastContext)
  return {toastMessage, setToastMessage}
}

export default useToast