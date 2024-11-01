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

export const Wrapper = styled.div`
    width: 100%;
    overflow-x: scroll;
    @media screen and (min-width: ${size.tablet}){
        padding: 2rem;
    }
    @media screen and (min-width: ${size.desktop}){
        width: 80%;
        align-self: center;
    }
`
