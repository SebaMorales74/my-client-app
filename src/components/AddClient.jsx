import React from 'react';
import ClientForm from './ClientForm';

export default function AddClient({ addClient }) {
  const handleSubmit = (newClient) => {
    addClient(newClient);
    addClient(newClient);
  };

  return (
    <div>
      <h2>Agregar Cliente</h2>
      <ClientForm onSubmit={handleSubmit} />
    </div>
  );
};