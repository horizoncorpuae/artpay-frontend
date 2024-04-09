import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, Link, TextField, Typography, useTheme } from "@mui/material";
import Checkbox from "./Checkbox.tsx";

export interface ContactFormProps {
  onSubmit?: (formData: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  question: string;
  opt_in: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const theme = useTheme();

  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, disabled: formDisabled },
    reset
  } = useForm<ContactFormData>({
    defaultValues: { opt_in: false }
  });

  const isDisabled = formDisabled || isSaving;

  const handleFormSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (onSubmit) {
      setIsSaving(true);
      await onSubmit(data).then(() => {
        setIsSaving(false);
      });
    }
    reset(
      { email: "", first_name: "", last_name: "", opt_in: undefined, question: "" },
      { keepDefaultValues: true }
    );
  };

  return (<form id="contact-form" onSubmit={handleSubmit(handleFormSubmit)}>
    <Box display="flex" flexDirection="column" gap={2}>
      <Controller
        name="first_name"
        control={control}
        rules={{ required: "Nome richiesto" }}
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            label="Nome*"
            variant="outlined"
            fullWidth
            {...field}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
        )}
      />
      <Controller
        name="last_name"
        control={control}
        rules={{ required: "Cognome richiesto" }}
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            label="Cognome*"
            variant="outlined"
            fullWidth
            {...field}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Inserisci il tuo indirizzo email",
          pattern: {
            value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Email non valida" // Custom message for invalid email format
          }
        }}
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            label="Il tuo indirizzo email*"
            variant="outlined"
            fullWidth
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="question"
        control={control}
        rules={{ required: "Scrivi una domanda" }}
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            label="Scrivici la tua domanda*"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            {...field}
            error={!!errors.question}
            helperText={errors.question?.message}
          />
        )}
      />
      <FormControl fullWidth error={!!errors.opt_in} sx={{ mt: 1 }}>
        <Controller
          name="opt_in"
          control={control}
          rules={{ required: true }}
          render={({ field: { ...field } }) => (
            <Checkbox
              disabled={isDisabled}
              textColor="textSecondary"
              size="small"
              label={<Typography variant="body2" sx={{ maxWidth: "380px" }}
                                 color={errors.opt_in ? "error" : "textSecondary"}>
                * Dichiaro di aver preso visione dell'{" "}
                <Link href="https://artpay.art/informativa-sulla-privacy"
                      sx={{
                        color: errors.opt_in ? theme.palette.error.main : theme.palette.text.secondary,
                        textDecoration: "underline"
                      }}
                      target="_blank" rel="noopener noreferrer">
                  informativa riguardante il trattamento dei dati personali
                </Link>
              </Typography>}
              {...field}
            />
          )}
        />
        {errors.opt_in && <FormHelperText>{errors.opt_in.message}</FormHelperText>}
      </FormControl>
      <Box mt={3}>
        <Button
          type="submit"
          variant="contained"
          disabled={isDisabled}>
          Invia richiesta
        </Button>
      </Box>
    </Box>
  </form>);
};

export default ContactForm;
