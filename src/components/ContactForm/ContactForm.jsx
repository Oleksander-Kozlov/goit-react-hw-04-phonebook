import React, { Component } from 'react';
import {
  ContactFormStyle,
  Input,
  Label,
  ButtonAddContacts,
} from '../ContactForm/ContactForm.styled.js';
import PropTypes from 'prop-types';


export class ContactForm extends Component {
  //стейт для данних ім"я та номеру
  state = {
    name: '',
    number: '',
  };
  //Слухач інпутів
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }); 
  };
  //Сабміт форми
  handleSabmit = e => {
  // Cкидую налаштування
    e.preventDefault();
  // Записую значення з імпуту до об"єкту
    this.props.createContacts({
      name: this.state.name,
      number: this.state.number,
    });
    // Оновлюю інпут
    this.setState({
      name: '',
      number: '',
    });
  };
 


 

  render() {
    return (
      <ContactFormStyle onSubmit={this.handleSabmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>

        <div>
          <Label htmlFor="number">Number</Label>
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />
        </div>
        <ButtonAddContacts type="submit">add contacts</ButtonAddContacts>
      </ContactFormStyle>
    );
  }
}

ContactForm.propTypes = {
  
  children: PropTypes.node,
}
