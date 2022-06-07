import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

export default function EmailController(props) {
  const { objForm, label, readonly, ...rest } = props;
  const { register, errors, control } = objForm;
  return (
    <>
      <input placeholder={label} />
    </>
  );
}
