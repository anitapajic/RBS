import React, { useState } from 'react';
import { Container, Form, Input, SubmitButton } from '../NameSpacePage/NameSpacePage.styled';
import { InputContainer } from './ACLPage.styled';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AccessControlList {
    object: string;
    relation: string;
    user: string;
}

export default function ACLPage() {
    const [request, setRequest] = useState<AccessControlList>({
        object: '',
        relation: '',
        user: '',
    });

    const handleSendRequest = async () => {
        try {
            request.user = 'user:' + request.user;
            const response = await fetch('http://localhost:8080/acl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            toast.success('ACL created/updated!', {
                position: 'top-center',
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error!', {
                position: 'top-center',
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRequest((prevRequest) => ({
            ...prevRequest,
            [name]: value,
        }));
    };

    return (
        <>
        <Container>
            <Form
            
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendRequest();
                }}
            >
                <h2>Create/Update ACL</h2>
                <InputContainer>
                    <label>
                        Object:
                        <Input
                            type="text"
                            name="object"
                            value={request.object}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>
                <InputContainer>
                    <label>
                        Relation:
                        <Input
                            type="text"
                            name="relation"
                            value={request.relation}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>
                <InputContainer>
                    <label>
                        User:
                        <Input
                            type="text"
                            name="user"
                            value={request.user}
                            onChange={handleChange}
                        />
                    </label>
                </InputContainer>
                <SubmitButton type="submit">Send Request</SubmitButton>
            </Form>
        </Container>
        <ToastContainer autoClose={4000} limit={1} closeButton={false} />
    </>
    );
}
