import { Component } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';

import contactFormCSS from './ContsctForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  nameFormID = nanoid();
  numberFormID = nanoid();

  handelChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ id: nanoid(), ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form
        className={contactFormCSS.contact_form}
        onSubmit={this.handleSubmit}
      >
        <label
          className={contactFormCSS.contact_label}
          htmlFor={this.nameFormID}
        >
          Name
        </label>
        <input
          className={contactFormCSS.contact_name_input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={this.nameFormID}
          value={name}
          onChange={this.handelChange}
          required
        />

        <label
          className={contactFormCSS.contact_label}
          htmlFor={this.numberFormID}
        >
          Number
        </label>
        <input
          className={contactFormCSS.contact_number_input}
          type="tel"
          name="number"
          id={this.numberFormID}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={this.handelChange}
          required
        />

        <button className={contactFormCSS.contact_submit_btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
