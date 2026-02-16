import { useState, useEffect } from 'react';
import { Typography, Box, Stack, CircularProgress } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { usePageLayout } from '../hooks/usePageLayout';
import AnnouncementCard from '../components/announcement/AnnouncementCard';
import { getFavoriteAnnouncements } from '../api/favoriteService';
import { transformAnnouncementResponse } from '../api/announcementService';
import { Announcement } from '../types/announcement';
import { useFavorites } from '../hooks/useFavorites';

export default function Saved() {
  usePageLayout();
  const { isSaved, toggleSave } = useFavorites();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    getFavoriteAnnouncements()
      .then((data) => {
        setAnnouncements(data.map(transformAnnouncementResponse));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Sauvegardés
        </Typography>
        <Typography color="text.secondary">
          Connecte-toi pour sauvegarder des annonces
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Sauvegardés
      </Typography>

      {announcements.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, gap: 2 }}>
          <BookmarkIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
            Aucune annonce sauvegardée
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '14px', textAlign: 'center' }}>
            Appuie sur l'icône signet pour sauvegarder une annonce
          </Typography>
        </Box>
      ) : (
        <Stack spacing="35px">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isSaved={isSaved(announcement.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
