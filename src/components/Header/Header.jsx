import headerCSS from './Header.module.css';
import propTypes from 'prop-types';

export const Header = ({ title, title_style }) => {
  return <p className={headerCSS[title_style]}>{title}</p>;
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  title_style: propTypes.string,
};
