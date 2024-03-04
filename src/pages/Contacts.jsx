
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ContactForm } from '../components/ContactForm/ContactForm'
import { SearchBox } from '../components/SearchBox/SearchBox'
import { ContactList } from '../components/ContactList/ContactList'
import { fetchContacts } from '../redux/contacts/operations'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'

export default function Contacts() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your contacts</DocumentTitle>
      <div>
        <h1>Phonebook</h1>
        <ContactForm ></ContactForm>
        <SearchBox></SearchBox>
        <ContactList></ContactList> 
    </div>
    </>
    
  )
}