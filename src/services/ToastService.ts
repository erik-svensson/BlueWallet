import { ToastProps } from 'app/components/Toast';

export const ToastService = () => {
  let toastList: ToastProps[] = [];

  const setToastList = (newToast: ToastProps[]) => {
    toastList = newToast;
  }

  const toast = (newToast: ToastProps) => {
    setToastList([newToast, ...toastList]);
  }

  const getToasts = () => toastList;

  return {
    toast,
    getToasts
  }
};
