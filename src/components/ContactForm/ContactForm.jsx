import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { ErrorText, FormBtn, Input, WrapperForm } from './ContactForm.styled';
import { string, number, object } from 'yup';
import { useAddContactsMutation } from '../../redux/contacts/contactsSlice';
import { useGetContactsQuery } from '../../redux/contacts/contactsSlice';
import { useEffect } from 'react';

let userSchema = object({
  name: string().min(3, 'Must be at least 3 characters').required(),
  number: number()
    .required()
    .typeError('Must be a number')
    .positive()
    .integer(),
});

export const ContactForm = () => {
  const { data: contacts, error: getContactsError } = useGetContactsQuery();
  const [addContacts] = useAddContactsMutation();

  const initialName = '';
  const initialNumber = '';
  const notify = () =>
    toast.success('Contact is added!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  useEffect(() => {
    if (getContactsError) {
      toast.error('Failed to get contacts', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [getContactsError]);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const newContact = { id: nanoid(), name, number };
    const isContactExists = contacts?.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExists) {
      toast.error(`${name} is already in contacts.`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    } else {
      addContacts(newContact);
      notify();
    }
    if (getContactsError) {
      toast.error('Failed to get contacts', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: initialName, number: initialNumber }}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <WrapperForm>
        <label htmlFor="name">
          <span>Name</span>
          <Input type="text" name="name" required />
          <ErrorText>
            <ErrorMessage name="name" />
          </ErrorText>
        </label>

        <label htmlFor="number">
          <span>Number</span>
          <Input type="tel" name="number" required />
          <ErrorText>
            <ErrorMessage name="number" />
          </ErrorText>
        </label>

        <FormBtn type="submit">Add contact</FormBtn>
      </WrapperForm>
    </Formik>
  );
};
