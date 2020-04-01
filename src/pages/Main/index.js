import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton, List } from './styles';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setNewRepo(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await api.get(`/repos/${newRepo}`);

      const data = {
        name: res.data.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
      setLoading(false);
    } catch (err) {
      alert('Repositório não encontrado, tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repossitórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          onChange={handleInputChange}
          value={newRepo}
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <a href="#">Detalhes</a>
          </li>
        ))}
      </List>
    </Container>
  );
}
