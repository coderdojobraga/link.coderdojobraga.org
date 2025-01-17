import { useContext, createContext } from 'react';

import API from '~/lib/api';

export const FormsContext = createContext();

export const reducer = async (forms, action) => {
  const { type, slug, form, id, forms: newForms } = action;
  let response;

  switch (type) {
    case 'INIT':
      return newForms;
    case 'CREATE':
      response = await API.post('/api/forms', form);
      return [...forms, response.data.data];
    case 'UPDATE':
      response = await API.put(`/api/forms/${slug}`, form);
      return forms.map((item) => (item._id === id ? { ...item, ...response.data.data } : item));
    case 'DELETE':
      await API.delete(`/api/forms/${slug}`);
      return forms.filter((form) => form.slug !== slug);
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const useForms = () => useContext(FormsContext);
