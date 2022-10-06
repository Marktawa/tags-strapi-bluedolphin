// ./src/styles.js

import styled from "styled-components";
    
export const Cards = styled.ul`
    display: grid;
    padding-top: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2rem 1rem;
    place-items: center;
`;
    
export const Item = styled.div`
    height: 370px;
    width: 300px;
    border-radius: 7px;
    box-shadow: 0 2px 3px #c0c0c0;
    background: #fff;
    color: #1d1b84;
    text-align: center;
    div {
    padding: 0.1rem 0.5rem;
    h4 {
        text-align: center;
        font-weight: 600;
    }
    }
`;
    
export const Button = styled.button`
    background: #1d1b84;
    border: 1px solid #1d1b84;
    color: #fff;
    border-radius: 3px;
    padding: 0.3rem 1rem;
`;
    
export const Image = styled.img`
    height: 250px;
    width: 250px;
    object-fit: contain;
`;
    
export const Flex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
`;
    
export const Banner = styled.div`
    padding: 2rem 3rem;
    text-align: center;
    h4 {
    font-weight: 600;
    }
`;
    
export const CategoryCtn = styled.div`
    width: 20rem;
    padding: .5rem 1rem;
    background: #fff;
    margin: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px #c0c0c0;
`
    
export const Container = styled.div`
    background: #ebf4fd;
    height: calc(100vh - 110px);
`;