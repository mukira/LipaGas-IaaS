import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/LoginPrompt-1';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | LipaGas IaaS</title>
      </Helmet>

      <Login />
    </>
  );
}
