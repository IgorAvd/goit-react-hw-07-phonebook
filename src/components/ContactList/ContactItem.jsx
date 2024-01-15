import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDeleteContactMutation } from '../../redux/contacts/contactsSlice';
import { ContactItemBtn, StyledContactItem } from './ContactItem.styled';

export const ContactItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const notify = () =>
    toast.success('Contact is removed!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const handleDelete = () => {
    deleteContact(id);
    notify();
  };

  return (
    <StyledContactItem>
      <span>{name}:</span>
      {number}
      <ContactItemBtn type="submit" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </ContactItemBtn>
    </StyledContactItem>
  );
};
