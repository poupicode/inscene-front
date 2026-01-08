import { Box, Card, CardContent, Typography, Button } from '@mui/material';

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
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 3
            }}
          >
            Pour commencer, créez votre profil
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            sx={{
              mt: 2,
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: '20px'
            }}
          >
            Créer mon profil
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
