import { Box, Typography, Button, TextField, Stack, IconButton } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { ProfileData } from '../ProfileSetup';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PrimaryButton from '../../common/PrimaryButton';

interface PersonalInfoStepProps {
  data: ProfileData;
  onUpdate: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  description: string;
}

export default function PersonalInfoStep({ data, onUpdate, onNext, onBack }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    dateOfBirth: data.dateOfBirth || '',
    email: data.email || '',
    description: data.description || ''
  });

  const handleChange = (field: keyof PersonalInfoFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = (): void => {
    onUpdate(formData);
    onNext();
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Informations personnelles
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        {/* Section Récupérer via */}
        <Box>
          <Typography
            sx={{
              fontSize: '19px',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center'
            }}
          >
            Récupérer via :
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <IconButton
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                p: 2,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <GoogleIcon sx={{ fontSize: 32 }} />
            </IconButton>

            <IconButton
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                p: 2,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <AppleIcon sx={{ fontSize: 32 }} />
            </IconButton>

            <IconButton
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                p: 2,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <LinkedInIcon sx={{ fontSize: 32, color: '#0A66C2' }} />
            </IconButton>
          </Box>

          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 400,
              textAlign: 'center',
              mb: 1
            }}
          >
            ou
          </Typography>

          <Typography
            sx={{
              fontSize: '19px',
              fontWeight: 600,
              textAlign: 'center',
              mb: 3
            }}
          >
            Renseigner manuellement
          </Typography>
        </Box>

        {/* Champs du formulaire */}
        <TextField
          label="Nom"
          fullWidth
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
        />

        <TextField
          label="Prénom"
          fullWidth
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange('email')}
          required
        />
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            px: 4,
            py: 1.5,
            textTransform: 'none',
            borderRadius: '20px'
          }}
        >
          Retour
        </Button>
        <PrimaryButton onClick={handleNext}>
          Suivant
        </PrimaryButton>
      </Box>
    </Box>
  );
}
