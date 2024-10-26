import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavbarDesktop, NavbarMobile } from './components/Navbar';
import './styles/App.css';
import Home from './routes/Home';

export default function App() {
  const [clients, setClients] = useState([]);

  const addClient = (client) => {
    setClients([...clients, { ...client, id: clients.length + 1 }]);
  };

  const editClient = (updateClient) => {
    setClients(clients.map(client => (client.id === updateClient.id ? updateClient : client)));
  };

  const handleDelete = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };
  return (
    <Router>
      <div class="app">
        <NavbarDesktop />
        <main>
          <Routes>
            <Route path="/" element={<Home clients={clients} handleDelete={handleDelete} />} />
            <Route path='*' element={<h1>404 Página no encontrada</h1>} />
          </Routes>
        </main>
        <NavbarMobile />
      </div>
    </Router>
  );
}