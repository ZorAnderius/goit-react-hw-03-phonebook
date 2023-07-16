import filterCSS from './Filter.module.css';
import propTypes from 'prop-types';

export const Filter = ({ value, filterContacts }) => {
  return (
    <div className={filterCSS.filter_container}>
      <label className={filterCSS.filter_label}>
        Find contacts by the name
      </label>
      <input
        className={filterCSS.filter_input}
        type="text"
        value={value}
        onChange={filterContacts}
      />
    </div>
  );
};

Filter.propTypes = {
  value: propTypes.string.isRequired,
  filterContacts: propTypes.func.isRequired,
};
