import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
//import useProposalStore from "../../stores/proposalStore.tsx";

const FastPayCreate = () => {
  const [formData, setFormData] = useState({
    titolo: "",
    artista: "",
    descrizione: "",
    prezzo: "",
    sconto: "",
    immagine: null as File | null,
    hasScadenza: false,
    dataScadenza: null as Dayjs | null,
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      hasScadenza: event.target.checked,
      dataScadenza: event.target.checked ? prev.dataScadenza : null,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dataScadenza: date,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      immagine: file,
    }));
  };

  return (
    <>
      <h1 className={"text-4xl text-white mx-auto w-full max-w-lg px-8 font-light mb-12"}>Crea offerta</h1>
      <main className={` py-6 w-full  rounded-t-3xl bottom-0 bg-white max-w-lg mx-auto flex-1`}>
        <div className={"px-8"}>
          <div className={"flex items-center justify-between"}>
            <div className={"space-y-2"}>
              <h3 className={"text-2xl leading-6"}>Dettaglio offerta</h3>
              <h3 className={"text-secondary leading-6"}>Crea un'offerta</h3>
            </div>
          </div>
        </div>
        <section className={"px-8 py-12"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Titolo Opera"
                value={formData.titolo}
                onChange={handleInputChange("titolo")}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, height: 48 } }}
              />

              <TextField
                fullWidth
                label="Artista"
                value={formData.artista}
                onChange={handleInputChange("artista")}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, height: 48 } }}
              />

              <TextField
                fullWidth
                label="Descrizione"
                value={formData.descrizione}
                onChange={handleInputChange("descrizione")}
                variant="outlined"
                multiline
                rows={4}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <Card variant="outlined" sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 2, height: 137 }}>
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <span className={"block leading-6 text-secondary"}>
                    {formData.immagine ? formData.immagine.name : "Foto(JPG, PNG, PDF)"}
                  </span>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Typography component="span" sx={{ ml: 1 }} className={"text-primary"}>
                      {formData.immagine ? "Aggiorna" : "Carica immagine"}
                    </Typography>
                  </label>
                </CardContent>
              </Card>

              <TextField
                fullWidth
                label="Prezzo Opera"
                value={formData.prezzo}
                onChange={handleInputChange("prezzo")}
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, height: 48 } }}
              />

              <TextField
                fullWidth
                label="Sconto"
                value={formData.sconto}
                onChange={handleInputChange("sconto")}
                variant="outlined"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, height: 48, paddingRight: 2 } }}
              />

              <FormControlLabel
                control={<Switch checked={formData.hasScadenza} onChange={handleSwitchChange} color="primary" />}
                label="Aggiungi scadenza offerta"
              />

              {formData.hasScadenza && (
                <DatePicker
                  label="Data di scadenza"
                  value={formData.dataScadenza}
                  onChange={handleDateChange}
                  slots={{
                    textField: TextField,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: { "& .MuiOutlinedInput-root": { borderRadius: 2, height: 48 } },
                    },
                  }}
                />
              )}

              <Button variant="contained" color="primary"  fullWidth sx={{ mt: 3 }}>
                Salva offerta
              </Button>
            </Box>
          </LocalizationProvider>
        </section>
      </main>
    </>
  );
};

export default FastPayCreate;
