import styled from "styled-components"

export const BackgroundImage = styled.picture`
position: relative;
width: 100%;
height: auto;
top: 0;
bottom: 0;
left: 0;
right: 0;

& >img {
    width: 100%;
    height: 90vh;   
    object-fit: cover;
}
`;