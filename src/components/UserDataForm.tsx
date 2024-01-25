import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Grid, FormHelperText } from "@mui/material";
import countries from "../countries";
export interface UserDataFormProps {}

interface UserFormInput {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

const UserDataForm: React.FC<UserDataFormProps> = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "", // Ensure this is not undefined or null
      phone: "",
      street: "",
      city: "",
      zipCode: "",
      country: "IT",
    },
  });

  const onSubmit: SubmitHandler<UserFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Nome"
                variant="standard"
                fullWidth
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Cognome"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel id="gender-label">Sesso</InputLabel>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Campo obbligatorio" }}
              render={({ field }) => (
                <Select labelId="gender-label" label="Sesso" {...field}>
                  <MenuItem value="female">Donna</MenuItem>
                  <MenuItem value="male">Uomo</MenuItem>
                  <MenuItem value="other">Altro</MenuItem>
                </Select>
              )}
            />
            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Telefono"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="street"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Indirizzo"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Città"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="zipCode"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obbligatorio" }}
            render={({ field }) => (
              <TextField
                label="Codice postale"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.country}>
            <InputLabel id="country-label">Paese</InputLabel>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Campo obbligatorio" }}
              render={({ field }) => (
                <Select labelId="country-label" defaultValue="IT" label="Paese" {...field}>
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

        <Grid item xs={12}>
          <Button sx={{ minWidth: "160px" }} type="submit" variant="contained" color="primary">
            Salva
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserDataForm;
