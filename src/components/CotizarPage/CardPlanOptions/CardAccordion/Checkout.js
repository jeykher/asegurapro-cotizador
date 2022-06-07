import React from 'react'
// import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";

// import styles from "components/material-dashboard-pro-react/components/customCheckboxRadioSwitch";
// const useStyles = makeStyles(styles);

export default function CheckBox(props) {
    // const classes = useStyles();
    const { label, name, classLabel, ...rest } = props;
    return (
        <div /*className={classes.checkboxAndRadio}*/ style={{
            position: "relative",
            display: "block",
            marginTop: "5px",
            marginBottom: "5px",
          }}>
            <FormControlLabel
                label={label}
                key={name}
                control={
                    <Checkbox
                        {...rest}
                        name={name}
                        checkedIcon={<Check/* className={classes.checkedIcon}*/ style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid red",
                            borderRadius: "3px",
                          }} />}
                        icon={<Check /*className={classes.uncheckedIcon}*/ style={{
                            width: "0px",
                            height: "0px",
                            padding: "9px",
                            border: "1px solid gray",
                            borderRadius: "3px"
                          }}/>}
                        /*classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                        }}*/
                        style={{
                            color: "red !important",
                            padding: "5px",
                        }}
                    />
                }
                 
            />
        </div>
    )
}

// classes={{
//     label: classLabel === undefined ? classes.label : classes[classLabel],
//     root: classes.labelRoot
// }}
