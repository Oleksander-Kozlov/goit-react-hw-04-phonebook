import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
   componentDidMount() {
    const savedUserState = localStorage.getItem('user-contact') ;
    // if (savedUserState !== null) {
    //   this.props.createContacts(
    //     JSON.parse(savedUserState))
     if (savedUserState !== null) {
       this.setState({ contacts: JSON.parse(savedUserState) });
     }
      
    }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('user-contact', JSON.stringify(this.state.contacts));
    }
  }
  //додавання контакту до списку
  createContacts = data => {
    const haveNameInPhonebook = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (haveNameInPhonebook) {
      return alert(`${data.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...data }, ...prevState.contacts],
    }));
  };
  //видалення контакту зі списку
  handleDelete = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };
  //фільт імен
  onFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  //слідкування за вводом на інпутах
  handleFind = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();

    const visibleFilter = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div>
          <h1>Phonebook </h1>{' '}
          <ContactForm createContacts={this.createContacts} />
          <h2>Contacts</h2>
          <Filter value={this.state.filter} filter={this.handleFind} />
          <ContactList
            contacts={visibleFilter}
            onDeleteContact={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

