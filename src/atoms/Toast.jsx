// toast.js
import { toast } from 'react-toastify';

export const showToast = (message, type = 'info') => {
  const options = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    closeButton:false
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'info':
    default:
      toast.info(message, options);
      break;
  }
};
