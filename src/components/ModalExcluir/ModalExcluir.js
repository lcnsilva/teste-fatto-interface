import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50vw;
    height: 20vh;
    gap: 1rem;
`

export const NameTask = styled.p`
    height: 100%;
    word-wrap: break-word;
    font-size: 20px;
    font-weight: 700;
    padding: 1rem 0;
    overflow-y: scroll;
    
`

export const Title = styled.h3`
    font-weight: 500;
    font-size: 18px;
`

export const Button = styled.button`
    font-size: 20px;
    font-weight: 600;
    background-color: ${props => props.$buttonColor || "#E63946"};
    width: 45%;
    padding: 0.5rem;
`

export const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    gap: 10%;
`