import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Button, Grid, Typography } from "@mui/material";
import { useData } from "../hoc/DataProvider.tsx";
import { Gallery } from "../types/gallery.ts";
import { useAuth } from "../hoc/AuthProvider.tsx";
import { useNavigate } from "react-router-dom";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const data = useData();
  const auth = useAuth();
  const navigate = useNavigate();

  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      data
        .listGalleries()
        .then((resp) => setGalleries(resp))
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [auth.isAuthenticated, data]);

  return (
    <DefaultLayout>
      <Grid
        sx={{ maxWidth: "1440px", pt: 12, px: 6, flexDirection: "column" }}
        container>
        {auth.isAuthenticated ? (
          <>
            <Typography variant="h3">Seleziona galleria</Typography>
            {galleries.map((gallery, i) => (
              <Button
                key={i}
                onClick={() => navigate(`/gallery/${gallery.id}`)}>
                {gallery.username}
              </Button>
            ))}
          </>
        ) : (
          <Typography variant="h5" color="error">
            Effettua il login
          </Typography>
        )}
      </Grid>
    </DefaultLayout>
  );
};

export default Home;
