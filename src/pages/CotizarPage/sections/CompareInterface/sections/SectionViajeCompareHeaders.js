import react from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useCotizaPageContext } from '../../../../../context/CotizaPageContext/CotizaPageContext';

const ListCompare = styled.ul`
    list-style: none;
    width: 100%;
    height: 100%;
    display: grid;
`;

const ItemListCompareTitle = styled.li`
    border-bottom: 1px solid rgba(153, 153, 153,0.3);
    margin: 0 1rem;
    color: #3C4858;
    font-weight: 700;
    text-align: center;
    font-size: 0.875rem;
    word-wrap: break-word;
    line-height: 1.43;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
`;

const ItemListCompare = styled.li`
    border-bottom: 1px solid rgba(153, 153, 153,0.3);
    margin: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    text-align: center;
    font-size: 0.875rem;
    word-wrap: break-word;
    height: 80px;
`;


const SectionViajeCompareHeaders = () => {
    const { agesViajero, coberturasViajero } = useCotizaPageContext();
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 235,
                        height: 'auto'
                    }
                }}
            >
                <Paper elevation={24} sx={{
                    width: '290px',
                    margin: '0 1rem',
                    position: 'relative'
                }}>
                    <ListCompare>
                        <ItemListCompareTitle>Edades</ItemListCompareTitle>
                        {
                            agesViajero.map((age, i) => {
                                return (
                                    <ItemListCompare
                                        key={i}
                                    >
                                        {age}
                                    </ItemListCompare>
                                )
                            })
                        }
                    </ListCompare>
                </Paper>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 235,
                        height: 'auto'
                    }
                }}
            >
                <Paper elevation={24} sx={{
                    width: '290px',
                    margin: '0 1rem',
                    position: 'relative'
                }}>
                    <ListCompare>
                        <ItemListCompareTitle>Coberturas</ItemListCompareTitle> 
                        {
                            coberturasViajero.map(cobertura => {
                                const { cobert_id, desccobert } = cobertura;
                                return (
                                    <ItemListCompare
                                        key={cobert_id}
                                    >
                                        {desccobert}
                                    </ItemListCompare>
                                )
                            })
                        }
                    </ListCompare>
                </Paper>
            </Box>
        </>
    );
};

export default SectionViajeCompareHeaders;