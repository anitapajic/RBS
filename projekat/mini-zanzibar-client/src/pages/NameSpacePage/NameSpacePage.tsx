import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Input, SubmitButton } from './NameSpacePage.styled';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NamespaceForm: React.FC = () => {
  const [namespace, setNamespace] = useState<string>('');

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamespace(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submitting:', namespace);

    try {
      const response = await axios.post('http://localhost:8080/namespace', namespace);
      console.log('Response:', response.data);
      toast.success('Namespace created/updated!!', {
        position: 'top-center',
    });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error!', {
        position: 'top-center',
    });
    }
  };

  return (
    <>
    <Container>
    <Form onSubmit={handleSubmit}>
      <h2>Create/Update namespace</h2>
      <div>
        <label>Namespace:</label>
        <Input type="text" value={namespace} onChange={handleNamespaceChange} />
      </div>
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
    </Container>
    <ToastContainer autoClose={4000} limit={1} closeButton={false} />
    </>
  );
};

export default NamespaceForm;
