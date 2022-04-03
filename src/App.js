import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';
import s from './App.module.css';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts');
  const [filter, setFilter] = useState('');

const getVisibleContacts = () => {
  const normalizeFilter = filter.toLowerCase();

  return contacts.filter((contact) => contact.name.toLocaleLowerCase().includes(normalizeFilter));
  };

  const addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
    if (contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
      setContacts([contact, ...contacts]);
    };

const changeFilter = e => {
  setFilter(e.currentTarget.value);
};

const deleteContact = (contactId) => {
  setContacts(contacts => contacts.filter(contact => contact.id !== contactId));
};

  return (
      <div className={s.section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDelete={deleteContact} />
      </div>
    );
}

export default App;

