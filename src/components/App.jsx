import React from 'react';
import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import appCSS from './App.module.css';

import contacts from './contacts_data.json';
import { Notification } from './Notification/Notification';

let keyOfStorage = true;

const STORAGE_KEY = 'contacts';
const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
const initalArr = storage && storage.length ? storage : contacts;

export class App extends Component {
  state = {
    contacts: initalArr,
    filter: '',
  };

  filterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContactToList = contact => {
    this.setState(prevState => {
      const isInclude = prevState.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isInclude) {
        alert(
          `Sorry, but the contact ${contact.name} is already in your phone book `
        );
        return;
      }
      const newContactsList = [...prevState.contacts, contact];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContactsList));
      return { contacts: newContactsList };
    });
  };

  onRemoveContact = contactID => {
    this.setState(prevState => {
      const newContactList = prevState.contacts.filter(
        contact => contact.id !== contactID
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContactList));

      return { contacts: newContactList };
    });
  };

  initLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
  };

  checkSameContact = () => {
    const { filter } = this.state;
    const normalaizedFilter = filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
  };

  render() {
    if (keyOfStorage) {
      this.initLocalStorage();
      keyOfStorage = false;
    }

    const { filter } = this.state;
    const contactsCount = this.state.contacts.length;
    const filterList = this.checkSameContact();
    return (
      <div className={appCSS.main_container}>
        <Section
          title={'Phonebook'}
          styles={{ title: 'phonebook-title', container: 'first-container' }}
        >
          <ContactForm onSubmit={this.addContactToList} />
        </Section>

        <Section
          title={'Contacts'}
          styles={{ title: 'contact-title', container: 'second-container' }}
        >
          <Filter value={filter} filterContacts={this.filterContacts} />
          {contactsCount ? (
            <ContactList
              filterList={filterList}
              onRemoveItem={this.onRemoveContact}
            />
          ) : (
            <Notification message="Phonebook is empty" />
          )}
        </Section>
      </div>
    );
  }
}
