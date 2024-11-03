import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    height: 30vh;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 600;
`

export const Input = styled.input`
    background-color: #EAEAEA;
    padding: 1rem;
    font-size: 1rem;
`

export const SubmitButton = styled.button`
    width: 45%;
    padding: 0.5rem;
    background-color: #18243e;
    color: #Ffffff;
    font-size: 20px;
`

export const CancelButton = styled.button`
    width: 45%;
    padding: 0.5rem;
    background-color: #18243e;
    color: #Ffffff;
    font-size: 20px;
`

export const ButtonContainer = styled.div`
    padding: 0.5rem 0;
    display: flex;
    width: 100%;
    gap: 10%;
`

export const ErrorContainer = styled.div`
    font-size: 1rem;
    color: red;
`

export const Label = styled.label`
`