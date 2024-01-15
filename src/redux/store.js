import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contactsSlice';
import { filterReducer } from './filter/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
