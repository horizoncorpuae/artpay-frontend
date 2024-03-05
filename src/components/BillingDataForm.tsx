import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  RadioGroup
} from "@mui/material";
import countries from "../countries";
import { BillingData } from "../types/user.ts";
import RadioButton from "./RadioButton.tsx";

export interface UserDataFormProps {
  defaultValues?: BillingData;
  onSubmit?: (formData: BillingData) => Promise<void>;
  disabled?: boolean;
}

const BillingDataForm: React.FC<UserDataFormProps> = ({ defaultValues, onSubmit, disabled = false }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BillingData>({
    defaultValues: {
      ...defaultValues,
      country: defaultValues?.country || "IT",
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  const isPrivateCustomer = watch("private_customer") !== "false"

  const handleFormSubmit: SubmitHandler<BillingData> = (data) => {
    if (onSubmit) {
      setIsSaving(true);
      onSubmit(data).then(() => {
        setIsSaving(false);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.private_customer}>
            <Controller
              name="private_customer"
              control={control}
              rules={{ required: "Questo campo è obbligatorio" }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <RadioButton value="true" label="Persona fisica"/>
                  <RadioButton value="false" label="Titolare di P.IVA / Persona giuridica"/>
                </RadioGroup>
              )}
            />
            {errors.private_customer && <FormHelperText>{errors.private_customer.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="first_name"
            control={control}
            rules={{ required: "Nome richiesto" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Nome*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="last_name"
            control={control}
            rules={{ required: "Cognome richiesto" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Cognome*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            )}
          />
        </Grid>

        {/*<Grid item xs={12} sm={6}>
          <Controller
            name="birth_date"
            control={control}
            rules={{ required: "Data di nascita richiesta" }}
            render={({ field }) => (
              <DatePicker
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.birth_date,
                    helperText: errors.birth_date?.message,
                  },
                }}
                label="Data di Nascita"
                {...field}
                onChange={(date: Date | null) => field.onChange(date)}
              />
            )}
          />
        </Grid>*/}

        <Grid item xs={12}>
          <Controller
            name="address_1"
            control={control}
            rules={{ required: "Indirizzo richiesto" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Indirizzo* (linea 1: via/piazza,...)"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.address_1}
                helperText={errors.address_1?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address_2"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Indirizzo (linea 2: scala, piano)"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            rules={{ required: "Città richiesta" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Città*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="postcode"
            control={control}
            rules={{ required: "CAP richiesto" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="CAP*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.postcode}
                helperText={errors.postcode?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.country}>
            <InputLabel id="country-label">Paese*</InputLabel>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Paese richiesto" }}
              render={({ field }) => (
                <Select
                  disabled={isSaving || disabled}
                  labelId="country-label"
                  defaultValue="IT"
                  label="Paese"
                  {...field}>
                  {countries.map((country) => (
                    <MenuItem value={country.code} key={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            rules={{ required: "Provincia richiesta" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Provincia*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Telefono richiesto" }}
            render={({ field }) => (
              <TextField
                disabled={isSaving || disabled}
                label="Telefono*"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>

        {!isPrivateCustomer && (
          <>
            <Grid item xs={12} sm={6}>
              <Controller
                name="PEC"
                control={control}
                rules={{ required: "PEC o Codice destinatario richiesti" }}
                render={({ field }) => (
                  <TextField
                    disabled={isSaving || disabled}
                    label="PEC o Codice destinatario"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.PEC}
                    helperText={errors.PEC?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cf"
                control={control}
                rules={{ required: "Partita iva richiesta" }}
                render={({ field }) => (
                  <TextField
                    disabled={isSaving || disabled}
                    label="Partita iva"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.cf}
                    helperText={errors.cf?.message}
                  />
                )}
              />
            </Grid>
          </>
        )}

        {/*        <Grid item xs={12}>
          <Controller
            name="company"
            control={control}
            render={({ field }) => <TextField label="Azienda" variant="outlined" fullWidth {...field} />}
          />
        </Grid>*/}

        <Grid item xs={12}>
          <Button
            sx={{ minWidth: "160px" }}
            disabled={isSaving || disabled}
            type="submit"
            variant="contained"
            color="primary">
            Salva
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BillingDataForm;
