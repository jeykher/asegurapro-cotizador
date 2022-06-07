import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';

import '../viajero/form.css';

export default function AgesFormat(props) {
  const { onChange, setEdades, value, ...rest } = props;
  const [val, setVal] = useState();

  useEffect(() => {
   

    setVal(value);
   
  }, []);

  return (
    <NumberFormat
      {...rest}
      value={val}
      customInput={TextField}
      fullWidth
      // required={true}
      format="##-##-##-##-##-##-##-##-##"
      mask="_"
      type="text"
      placeholder="Edad viajeros (32-25-02)"
      onValueChange={(target) => {
        setVal(target.formattedValue);
        setEdades(target.formattedValue);
        onChange && onChange(target.formattedValue);
      }}
    />
  );
}
