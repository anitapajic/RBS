import styled from "styled-components";

export const Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`
export const Form = styled.form`
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`
export const Input = styled.input`
    padding: 8px;
    margin-left: 10px;
    border-radius: 10px;
    border: 1px solid grey;
`
export const Button = styled.button`
    padding: 10px;
    margin: 10px;
    background-color: beige;
    border-radius: 10px;
    border: 1px solid grey;
    color: black;
    font-weight: bold;

    &:hover{
        cursor: pointer;
    }
`
export const SubmitButton = styled.button`
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #eeb750;
    border-radius: 10px;
    border: 1px solid white;
    color: white;
    font-weight: bold;
    width: 100%;
    
    &:hover{
        cursor: pointer;
    }
`