import { ContactItem } from './ContactItem';
import { StyledContactList } from './ContactList.styled';
import { getFilterValue } from '../../redux/filter/filterSlice';

import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../redux/contacts/contactsSlice';

export const ContactList = () => {
  const { data: contacts } = useGetContactsQuery();

  const filter = useSelector(getFilterValue);

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  return (
    <StyledContactList>
      {filteredContacts?.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number ? contact.number : contact.phone}
        />
      ))}
    </StyledContactList>
  );
};
