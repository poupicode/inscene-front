import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { ProfileData } from '../ProfileSetup';

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
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Informations personnelles
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <TextField
          label="Prénom"
          fullWidth
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
        />

        <TextField
          label="Nom"
          fullWidth
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
        />

        <TextField
          label="Date de naissance"
          type="date"
          fullWidth
          value={formData.dateOfBirth}
          onChange={handleChange('dateOfBirth')}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange('email')}
          required
        />

        <TextField
          label="Bio / Description"
          multiline
          rows={4}
          fullWidth
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Parlez-nous de vous..."
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
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            px: 4,
            py: 1.5,
            textTransform: 'none',
            borderRadius: '20px'
          }}
        >
          Suivant
        </Button>
      </Box>
    </Box>
  );
}
