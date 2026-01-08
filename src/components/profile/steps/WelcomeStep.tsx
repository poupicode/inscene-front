import { Box, Card, CardContent, Typography } from '@mui/material';
import PrimaryButton from '../../common/PrimaryButton';

interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          p: 4,
          boxShadow: 3
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'text.primary',
              mb: 2
            }}
          >
            Pour commencer, créez votre profil
          </Typography>

          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 400,
              color: 'text.primary',
              mb: 2
            }}
          >
            Plus votre profil sera complet, plus vous trouverez des offres pertinentes.
          </Typography>

          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 400,
              color: 'text.primary',
              mb: 3
            }}
          >
            Cette étape prend moins de 5 minutes et vous fera gagner plus de 5 heures* sur votre recherche d'emploi
          </Typography>

          <PrimaryButton
            fullWidth
            onClick={onStart}
            sx={{ mb: 2 }}
          >
            Créer mon profil
          </PrimaryButton>

          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 400,
              color: '#8c8c8c'
            }}
          >
            *Ratio InScène : 1 min dépensée dans la mise à jour de votre profil = 1h gagnée dans votre recherche
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
