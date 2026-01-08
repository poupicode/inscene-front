import { Box, Typography, Button, TextField, Stack, Chip } from '@mui/material';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { ProfileData } from '../ProfileSetup';

interface ProfessionalStepProps {
  data: ProfileData;
  onUpdate: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ProfessionalFormData {
  profession: string;
  experience: string;
  skills: string[];
  socialLinks: string[];
}

export default function ProfessionalStep({ data, onUpdate, onNext, onBack }: ProfessionalStepProps) {
  const [formData, setFormData] = useState<ProfessionalFormData>({
    profession: data.profession || '',
    experience: data.experience || '',
    skills: data.skills || [],
    socialLinks: data.socialLinks || []
  });

  const [skillInput, setSkillInput] = useState<string>('');
  const [linkInput, setLinkInput] = useState<string>('');

  const handleChange = (field: keyof ProfessionalFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddSkill = (): void => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete: string): void => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleAddLink = (): void => {
    if (linkInput.trim()) {
      setFormData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, linkInput.trim()]
      }));
      setLinkInput('');
    }
  };

  const handleDeleteLink = (linkToDelete: string): void => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link !== linkToDelete)
    }));
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
        Profil professionnel
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
        <TextField
          label="Profession / Métier"
          fullWidth
          value={formData.profession}
          onChange={handleChange('profession')}
          placeholder="Ex: Ingénieur son, Réalisateur, Comédien..."
        />

        <TextField
          label="Expérience"
          multiline
          rows={4}
          fullWidth
          value={formData.experience}
          onChange={handleChange('experience')}
          placeholder="Décrivez votre parcours professionnel..."
        />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Compétences
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              value={skillInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSkillInput(e.target.value)}
              placeholder="Ex: Montage vidéo, Pro Tools..."
              onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button
              variant="outlined"
              onClick={handleAddSkill}
              sx={{ textTransform: 'none' }}
            >
              Ajouter
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Liens sociaux / Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              value={linkInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkInput(e.target.value)}
              placeholder="https://..."
              onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && handleAddLink()}
            />
            <Button
              variant="outlined"
              onClick={handleAddLink}
              sx={{ textTransform: 'none' }}
            >
              Ajouter
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.socialLinks.map((link, index) => (
              <Chip
                key={index}
                label={link}
                onDelete={() => handleDeleteLink(link)}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
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
