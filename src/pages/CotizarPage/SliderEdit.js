import React, { Fragment } from 'react'
// import SnackbarContent from "components/material-dashboard-pro-react/components/Snackbar/SnackbarContent"
import { DialogTitle, DialogContent, Grid } from "@material-ui/core"
import Slider from '@material-ui/core/Slider'
import AmountFormat from '../../components/tools/AmountFormat'
import { Snackbar } from '@material-ui/core'
import styled from 'styled-components'

const ContenedorTitulo = styled.div`
color: #FFF;
    box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%);
    background-color: #ffa21a;
    padding: 15px;
    border-radius: 10px;
    font-size: 15px;
`
 
export default function SliderEdit(props) {
    const { title, color, min, max, marks, value, step, onChange } = props
    return (
        <Fragment> 
            <DialogTitle>
                {/* <Snackbar title={title} color={color || "secondary"}/> */}
                <ContenedorTitulo>
                    {title}
                </ContenedorTitulo>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={1} md={1}></Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={onChange}
                            aria-labelledby="input-slider"
                            step={step || 50}
                            min={min}
                            max={max}
                            marks={marks}
                            color='secondary'
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={6} md={6}><AmountFormat value={value} margin="dense" /></Grid>
                </Grid>
            </DialogContent>
        </Fragment>
    )
}
