import React, { ReactNode, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography, useTheme
} from "@mui/material";
import CheckFillIcon from "./icons/CheckFillIcon.tsx";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "./Checkbox.tsx";
import { useData } from "../hoc/DataProvider.tsx";
import ErrorIcon from "./icons/ErrorIcon.tsx";

export type FormState = "new" | "saving" | "success" | "error"
export interface NewsletterSmallProps {}

export interface NewsletterFormData {
  email: string;
  optIn: boolean;
}

const BREVO_FORM_URL = "https://51f5628d.sibforms.com/serve/MUIFAN4KP2y3Y9vz_T41Gc0CugsmkqAXuhJK3fC-GYZ-WZXkEUZ4rpVu9hAoVm4oy64NloGZplSZNeWnFK-DWXmG3bw6ktECUW3rH0bEoIws0c6F7b_jQEZFEt5OIjUpMrPkmBlb4bWDCam7fCEU-5PQEIEIp5DEdhfVXGUNiuqbe_q0COT3_41l652wAjYIVhDbT3DdkNCFHxoD"

const NewsletterSmall: React.FC<NewsletterSmallProps> = ({}) => {
  const data = useData()
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    defaultValues: {
      email: "",
      optIn: false,
    },
  });

  const [formState, setFormState] = useState<FormState>("new");

  const handleFormSubmit = (formData: NewsletterFormData) => {
    setFormState("saving")
    data.subscribeNewsletter(formData.email, formData.optIn ? "1" : "", BREVO_FORM_URL).then(() => {
      setFormState("success")
    }).catch((err) => {
      console.error(err)
      setFormState("error")
    })
  };

  let icon: ReactNode = <></>

  switch (formState) {
    case "saving":
      icon = <CircularProgress sx={{ mt: 2 }} size="80px" />
      break
    case "error":
      icon = <>
        <ErrorIcon sx={{ height: "80px", width: "80px", mt: 2 }} color="error" />
        <Typography sx={{mb:1}} variant="body1" color="error">Si è verificato un errore</Typography>
      </>
      break
    case "success":
      icon = <>
        <CheckFillIcon sx={{ height: "80px", width: "80px", mt: 2 }} color="success" />
        <Typography sx={{mb:1}} variant="body1" color={theme.palette.success.main}>Controlla la tua casella email</Typography>
      </>
      break
    default:
      icon = <></>
      break
  }

  return (
    <Grid xs={12} md={4} py={1} px={2} sx={{ backgroundColor: "rgba(255,255,255,.90)", borderRadius: "8px" }} item>
      <Typography variant="body1" color="textPrimary" sx={{ mb: 1 }} fontWeight={600}>
        Newsletter
      </Typography>
      <Box sx={{ textAlign: "center", pt:1, pb:2 }}>
        {formState === "new" ?
          <form onSubmit={handleSubmit(handleFormSubmit)} datatype="subscription">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Inserisci la tua email" }}
              render={({ field }) => (
                <TextField
                  disabled={formState !== "new"}
                  label="Email*"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Checkbox
              alignTop
              checkboxSx={{p: 0}}
              sx={{mt: 2, mb:3, textAlign: 'left'}}
              label={<Typography variant="body2" color={errors.optIn ? "error":"textSecondary"}>
                * Dichiaro di aver preso visione dell'{" "}
                <a href="https://www.artpay.art/informativa-sulla-privacy" target="_blank" rel="noopener noreferrer">
                  informativa riguardante il trattamento dei dati personali
                </a>
              </Typography>}
              error={!!errors?.optIn}
              {...register("optIn", { required: true })}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Iscriviti
            </Button>
          </form> :  icon}
      </Box>
    </Grid>
  );
};

export default NewsletterSmall;
