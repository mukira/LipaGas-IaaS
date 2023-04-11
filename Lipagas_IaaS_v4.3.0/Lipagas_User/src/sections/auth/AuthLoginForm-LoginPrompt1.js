import React, { useState, Suspense, lazy } from 'react';



import { MuiTelInput } from 'mui-tel-input'
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
import LoadingScreen from '../../components/loading-screen';

export default function AuthLoginForm() {
  const [phone, setPhone] = useState('')

  const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }
  const { login } = useAuthContext();

  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '+25472221111',
    password: 'demo1234',
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
      await login(data.email, data.password);
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

        {/* <Box sx={{ mb: "2em"}}>
          <RHFTextField name="number" label="Phone number" />
        </Box> */}
        <Box sx={{ mb: "2em"}}>
          <MuiTelInput sx={{width: "100%"}} value = {phone}defaultCountry="KE" onChange={handleChange}/>
        </Box>
        {/* <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      {/* <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Login with Email?
        </Link>
      </Stack> */}

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
