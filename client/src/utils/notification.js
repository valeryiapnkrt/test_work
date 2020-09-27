import {store} from 'react-notifications-component';

const defaultMessage = {
  success: 'Выполнено.',
  danger: 'Ошибка на сервере',
  info: 'Выполнено.',
};

const addNotification = (msg, type) =>
  store.addNotification({
    message: msg || defaultMessage[type],
    type: type || 'danger',
    insert: 'top',
    container: 'top-center',
    animationIn: ['animated', 'zoomIn', 'faster'],
    animationOut: ['animated', 'zoomOut', 'faster'],
    dismiss: {
      duration: (type != null && type !== 'danger' && 1500) || 0,
    },
  });

export default {
  success: msg => addNotification(msg, 'success'),
  error: msg => addNotification(msg, 'danger'),
  info: msg => addNotification(msg, 'info'),
  warning: msg => addNotification(msg, 'warning'),
};
