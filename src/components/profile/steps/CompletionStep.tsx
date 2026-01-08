import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CompletionStepProps {
  onViewProfile: () => void;
  onComplete: () => void;
}

export default function CompletionStep({ onViewProfile, onComplete }: CompletionStepProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        py: 4
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 80,
          color: 'primary.main',
          mb: 3
        }}
      />

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          color: 'text.primary'
        }}
      >
        C'est parti !
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={onViewProfile}
        sx={{
          mb: 6,
          px: 8,
          py: 2,
          fontSize: '1.2rem',
          textTransform: 'none',
          borderRadius: '25px'
        }}
      >
        Voir mon profil
      </Button>

      <Button
        variant="text"
        onClick={onComplete}
        sx={{
          textTransform: 'none',
          color: 'text.secondary'
        }}
      >
        Terminer
      </Button>
    </Box>
  );
}
