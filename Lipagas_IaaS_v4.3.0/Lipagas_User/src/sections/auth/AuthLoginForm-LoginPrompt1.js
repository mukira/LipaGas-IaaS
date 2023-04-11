import React, { useState } from 'react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import * as Yup from 'yup';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
// import { Link, Stack, Alert, IconButton, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
/// routes
// import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
// import Iconify from '../../components/iconify';
import FormProvider from '../../components/hook-form';
// import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const [phone, setPhone] = useState('')

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }
  const { login } = useAuthContext();

  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]$/, 'Phone number is invalid')
  });

  const defaultValues = {
    phoneNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log("Hello");
      await login(data.phoneNumber);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <Box sx={{ mb: "2em"}}>
          <MuiTelInput sx={{width: "100%"}} value = {phone} defaultCountry="KE" onChange={handleChange} />
        </Box>
      </Stack>
      <LoadingButton
        fullWidth
        // color="success"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bR: "25px",
          bgcolor: '#00AB55',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: '#057F41',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Sign In
      </LoadingButton>
    </FormProvider>
  );
}
