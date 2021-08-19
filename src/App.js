import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './components/Container';
import ContactForm from './components/ContactForm'
import { ContactList } from './components/ContactList';
import { Filter } from './components/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

    formSubmitHandler = data => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return
    } else if (data.name === ''){
      alert(`Name field are empty`);
      return
    } else if (data.number === ''){
      alert(`Number field are empty`);
      return
    }
    
    this.setState({ contacts: [{ name: data.name, id: uuidv4(), number: data.number }, ...this.state.contacts,] })
  }


  handleFilterChange = e => {
    if (this.state.contacts.length <= 2) {
      return;
    } else {
      const { name, value } = e.currentTarget;
      return this.setState({ [name]: value });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1 className={s.mainTitle}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={s.secondaryTitle}>Contacts</h2>
        <Filter value={filter} onInputChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          handleDeleteContact={this.deleteContact}
        />
        {/* <ToastContainer autoClose={3000} /> */}
      </Container>
    );
  }
}

export default App; 