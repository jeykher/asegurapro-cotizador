import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@material-ui/core"
// import SnackbarContent from "components/material-dashboard-pro-react/components/Snackbar/SnackbarContent"
// import Button from "components/material-kit-pro-react/components/CustomButtons/Button";
import Slider from '@material-ui/core/Slider'
// import AmountFormatDisplay from 'components/Core/NumberFormat/AmountFormatDisplay'
import NumberFormat from 'react-number-format';
import axiosInstance from '../../../../routes/axiosConfig';
import { useCotizaPageContext } from '../../../../context/CotizaPageContext/CotizaPageContext';

export default function BudgetCobertEditSum(props) {
    const { objBudget, openDialog, handleCloseSumEdit, step, data , typePlan} = props
    const { changeSum } = useCotizaPageContext()

    // const { info, refresh } = objBudget
    const [open, setOpen] = useState(false)
    const [parameters, setParameters] = useState(null)
    const [value, setValue] = useState(null)
    const [marks, setMarks] = useState([])

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    }

    function handleClose() {
        setOpen(false)
        handleCloseSumEdit()
    }

    useEffect(() => {
        setOpen(openDialog)
        setParameters(data)
        setValue(data.sumaaseg)
        setMarks([
            { value: data.sumaasegmin, label: <AmountFormat name="sum_min" value={data.sumaasegmin} /> },
            { value: data.sumaasegmax, label: <AmountFormat name="sum_max" value={data.sumaasegmax} /> }
        ])
    }, [openDialog])

    async function handleChangeSum(e, cobert) {
        // const params = {
        //     p_budget_id: 270517,//info[0].BUDGET_ID,
        //     p_type_plan: 0,// typePlan,
        //     p_codcobert: parameters.id,
        //     p_sum: value
        // }
        // await axiosInstance.post('/dbo/budgets/set_cobert_optional_sum', params)
        changeSum(parameters,value)
        // refresh()
        handleClose()
    }

    return (
        parameters && <Dialog open={open}>
            <DialogTitle id="alert-dialog-cobert-sum"></DialogTitle>
            <DialogContent>
                {/* <SnackbarContent message={parameters.title} color="secondary" /> */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={1} md={1}></Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                            step={step || 50}
                            min={parameters.sumaasegmin}
                            max={parameters.sumaasegmax}
                            marks={marks}
                            color='secondary'
                        />
                    </Grid>
                </Grid> 
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} md={4}></Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AmountFormat value={value} margin="dense" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" simple onClick={handleClose}>Cancelar</Button>
                <Button color="secondary" onClick={handleChangeSum}>Calcular</Button>
            </DialogActions>
        </Dialog>
    )
}

function AmountFormat(props) {
    const { onChange, value, ...rest } = props
    return (
        <NumberFormat
            {...rest}
            id={rest.name}
            value={value}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            displayType={"text"}
            isNumericString
        />
    )
}