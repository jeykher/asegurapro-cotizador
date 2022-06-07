import React from 'react';
import styled from 'styled-components'; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import AmountFormat from '../../../../../components/tools/AmountFormat';

import { useCotizaPageContext } from '../../../../../context/CotizaPageContext/CotizaPageContext'; 

const TituloPlan = styled.h6`
    font-size: 0.75rem;
    overflow: hidden;
    margin: 0;
    color: #999;
    text-align: center;
`;

const Moneda = styled.span`
font-weight: 400;
    line-height: 1;
    color: #777;
`;

const Precio = styled.span`
    font-size: 1.28em;
    color: #3C4858;
    font-weight: 700;
    text-decoration: none;
`;

const Fraccionamiento = styled.span`
    font-size: 58%;
    font-weight: 400;
    line-height: 1;
    color: #777;
`;

const CardCompare = ({ plan_id, descplanprod, codmoneda, prima, fraccionamiento }) => {
    const { deleteItemOnPlanCompare } = useCotizaPageContext();
    return(
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 235,
                        height: 320,
                        padding: '1rem 0'
                    }
                }}
            >
                <Paper elevation={24} sx={{
                    width: '290px',
                    margin: '0 1rem',
                    position: 'relative'
                }}>
                    <div style={{
                        height: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TituloPlan>
                            {descplanprod}
                        </TituloPlan>
                    </div>
                    <div style={{
                        height: '80%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'          
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: "100%", alignItems: 'center', gap: 4 }}>
                                <Moneda>{codmoneda == "DL" ? '$' : null}</Moneda>
                                <Precio>
                                    <AmountFormat value={prima} />
                                </Precio>
                                <Fraccionamiento>/{" "}Anual</Fraccionamiento>
                            </div>
                            {fraccionamiento.map((item) => (
                                    <div key={item.ideplan} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: "100%", alignItems: 'center', gap: 4 }}>
                                        <Moneda>{item.codmoneda == "DL" ? '$' : null}</Moneda>
                                        <Precio>
                                            <AmountFormat value={item.prima} />
                                        </Precio>
                                        <Fraccionamiento>/{" "}{item.nomplan}</Fraccionamiento>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <CancelIcon 
                        sx={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            color: '#616161',
                            cursor: 'pointer'  
                        }}  
                        onClick={() => deleteItemOnPlanCompare(plan_id)}           
                    />
                </Paper> 
            </Box>
        </>
    );
};

export default CardCompare;