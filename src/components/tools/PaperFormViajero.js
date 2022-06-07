import Paper from '@mui/material/Paper';
import styled from 'styled-components';

export const PaperFormViajero = styled(Paper)`
 position:relative;
 margin-left: 50px;
 margin-top: 45px;
 opacity: 0.8;
 padding: 10px 5px;
 grid-template-columns: 2fr;

 transition: all 0.4s ease-in !important;
 &:hover{
    opacity: 1;
 }
 @media (max-width: 768px) {
   margin-left: 0;
   margin-top: 40px;
 }
`