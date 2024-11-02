import styled from "styled-components";

const size = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "2560px",
}

export const Container = styled.div`
    width: 100%;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
`

export const Button = styled.button`
    width: 80%;
    background-color: #18243e;
    color: #FFFFFF;
    padding: 1rem;
    margin-top: 1rem;
    align-self: center;
    @media screen and (min-width: ${size.laptop}){
        margin: 1rem;
        width: 50%;
    }
`

export const Wrapper = styled.div`
    width: 100%;
    overflow-x: scroll;
    @media screen and (min-width: ${size.laptop}){
        padding: 2rem;
    }
    @media screen and (min-width: ${size.desktop}){
        width: 80%;
        align-self: center;
    }
`
