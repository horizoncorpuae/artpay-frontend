import React, { useEffect, useState } from "react";
import { Link, Typography } from "@mui/material";
import { artistToGalleryItem } from "../utils.ts";
import { Artist } from "../types/artist.ts";
import sanitizeHtml from "sanitize-html";
import { FAVOURITES_UPDATED_EVENT, useData } from "../hoc/DataProvider.tsx";
import FollowButton from "./FollowButton.tsx";
import { useNavigate } from "../utils.ts";
import { useAuth } from "../hoc/AuthProvider.tsx";
import { useSnackbars } from "../hoc/SnackbarProvider.tsx";

export interface ArtistDetailsProps {
  artist: Artist;
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ artist }) => {
  const artistContent = artistToGalleryItem(artist);
  const data = useData();
  const auth = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbars();

  const [favourites, setFavourites] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleFavouritesUpdated = () => {
      data.getFavouriteArtists().then((resp) => setFavourites(resp));
    };
    handleFavouritesUpdated();
    document.addEventListener(FAVOURITES_UPDATED_EVENT, handleFavouritesUpdated);
    return () => {
      document.removeEventListener(FAVOURITES_UPDATED_EVENT, handleFavouritesUpdated);
    };
  }, [data]);
  const handleSetFavourite = async (isFavourite: boolean) => {
    if (!auth.isAuthenticated) {
      auth.login();
      return;
    }
    if (artist?.id) {
      setIsLoading(true);
      try {
        if (isFavourite) {
          await data.removeFavouriteArtist(artist.id.toString()).then((resp) => {
            setFavourites(resp);
          });
        } else {
          await data.addFavouriteArtist(artist.id.toString()).then((resp) => {
            setFavourites(resp);
          });
        }
      } catch (e) {
        console.error(e);
        snackbar.error(e);
      }
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          gap: 8
        }}>
        <div
          style={{
            minWidth: 44,
            height: 44,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          onClick={() => {
            navigate(`/artisti/${artistContent.slug}`);
          }}>
          <img
            src={artistContent.imgUrl}
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div style={{
          width: "100%",
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}>
            <div style={{
              flexGrow: 1
            }}>
              <Typography variant="subtitle1">
                <Link href={`/artisti/${artistContent.slug}`} style={{color: '#010F22', textDecoration: 'none', marginBottom: 4, display: 'block'}}>{artistContent.title}</Link>
              </Typography>
              <Typography color="textSecondary">{artistContent.subtitle}</Typography>
            </div>
            <div>
              <FollowButton
                isLoading={isLoading}
                isFavourite={favourites.some((artist) => artist.id === artist.id)}
                onClick={handleSetFavourite}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop: 16}}>
        <Typography variant="subtitle1" color="textSecondary">
          {artistContent.artworksCount} {artistContent.artworksCount === 1 ? "Opera" : "Opere"}
        </Typography>
      </div>
      <Typography
        sx={{ mt: 2, lineHeight: '20px' }}
        color="textSecondary"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(artistContent.description || "", { allowedAttributes: false }),
        }}
      />
    </section>
  );
};

export default ArtistDetails;
