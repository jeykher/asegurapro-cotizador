import react from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; 

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

const SectionViajeCompareDetails = ({ agesViajeGenerated, coberturasViajeGenerated }) => {
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
                }}>
                <Paper elevation={24} sx={{
                    width: '290px',
                    margin: '0 1rem',
                    position: 'relative'
                }}>
                    <ListCompare>
                        <ItemListCompareTitle>Aplica</ItemListCompareTitle>
                        {
                            agesViajeGenerated.map(age => {
                                const { id, valid } = age;
                                return(
                                    <ItemListCompare
                                        key={id}
                                    >
                                        {valid}
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
                }}>
                <Paper elevation={24} sx={{
                    width: '290px',
                    margin: '0 1rem',
                    position: 'relative'
                }}>
                    <ListCompare>
                        <ItemListCompareTitle>Suma Asegurada</ItemListCompareTitle>
                        {
                            coberturasViajeGenerated.map(cobertura => {
                                const { id, suma_aseg } = cobertura;
                                return(
                                    <ItemListCompare
                                        key={id}
                                    >
                                        {suma_aseg}
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

export default SectionViajeCompareDetails;