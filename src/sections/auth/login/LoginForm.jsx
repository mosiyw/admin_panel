/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Iconify from "../../../components/iconify";
import { postLogin } from "../../../api/auth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutateLogin = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error?.response?.data?.error);
    },
  });

  const handleClick = () => {
    mutateLogin.mutate({ email: emailInput, password: passwordInput });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
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

      <LoadingButton
        loading={mutateLogin.isPending}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
