/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSignIn } from "react-auth-kit";
import { Controller, useForm } from "react-hook-form";
import Iconify from "../../../components/iconify";
import { postLogin } from "../../../api/auth";
import FormInputText from "../../../components/controlled-input";

function LoginForm() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const { handleSubmit, control } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const mutateLogin = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data.isAdmin) {
        signIn({
          token: data.token,
          expiresIn: 36000,
          tokenType: "token",
          authState: {
            role: "admin",
          },
        });

        navigate("/dashboard");
      }

      toast.success(data.message);
    },
    onError(error) {
      toast.error(error?.response?.data?.error);
    },
  });

  const submitForm = (data) => {
    mutateLogin.mutate({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack spacing={3}>
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field, fieldState }) => <TextField {...field} label="Email" error={fieldState.error} />}
        />

        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              error={fieldState.error}
              type={showPassword ? "text" : "password"}
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
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton loading={mutateLogin.isPending} fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}

export default LoginForm;
