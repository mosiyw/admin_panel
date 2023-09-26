import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    try {
      // Use the email and password from the state variables
      const loginData = {
        email: emailInput,
        password: passwordInput,
      };

      // Send a POST request to login
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      if (loginResponse.ok) {
        const loginResult = await loginResponse.json();

        if (loginResult.token) {
          // If login is successful and a token is received
          console.log('Login successful');

          if (loginResult.isAdmin === true) {
            // User is an admin
            navigate('/dashboard', { replace: true });
          } else {
            // User is not an admin
            console.log('Unauthorized');
          }

          // Access the user profile data from the login result
          // eslint-disable-next-line prefer-destructuring
          const userProfile = loginResult.userProfile;
          console.log('User Profile:', userProfile);
          // You can use the user profile data as needed
        } else {
          console.log('Token not received');
        }
      } else {
        console.log('Error:', loginResponse.status, loginResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Call the handleClick function when needed, e.g., in response to a button click

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
