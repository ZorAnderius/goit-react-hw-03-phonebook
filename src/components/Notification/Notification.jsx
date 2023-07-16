import notifCSS from './Notification.module.css';
import propTypes from 'prop-types';

export const Notification = ({ message }) => {
  return <div className={notifCSS.message}>{message}</div>;
};

Notification.propTypes = {
  message: propTypes.string.isRequired,
};
