import React from "react";
import TextField from "./TextField.tsx";
import { Box, Button, Typography } from "@mui/material";
import { FormField } from "../types";
import { useForm } from "react-hook-form";
import LinkButton from "./LinkButton.tsx";
import PasswordField from "./PasswordField.tsx";

interface SignInFormContent {
  fields: {
    password: FormField;
    email: FormField;
  };
  buttonLabel: string;
}

interface SignInFormData {
  name: string;
  email: string;
  password: string;
  privacy: undefined;
}

export interface SignInFormProps {
  onSubmit?: (data: SignInFormData) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const registrationFormContent: SignInFormContent = {
    fields: {
      email: { label: "Email" },
      password: { label: "Password" },
    },
    buttonLabel: "Accedi",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //handleSubmit
    defaultValues: {
      name: "",
      email: "",
      password: "",
      privacy: undefined,
    } as SignInFormData,
  });

  console.log("errors", errors);
  const handleSubmitClick = (data: SignInFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <Box display="flex" flexDirection="column" gap={1.5} my={2}>
        <TextField
          label={registrationFormContent.fields.email.label}
          type="email"
          {...register("email", { required: true })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <PasswordField
          label={registrationFormContent.fields.password.label}
          {...register("password", { required: true })}
          error={!!errors?.password}
          helperText={errors?.email?.message}
        />
        <LinkButton sx={{ alignSelf: "flex-start" }} size="small">
          Hai perso la password?
        </LinkButton>
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          {registrationFormContent.buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;
