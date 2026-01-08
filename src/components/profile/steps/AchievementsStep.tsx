import { Box, Typography, Button, TextField, Stack, Card, CardContent, IconButton } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfileData } from '../ProfileSetup';

interface AchievementsStepProps {
  data: ProfileData;
  onUpdate: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface PortfolioItem {
  title: string;
  description: string;
  url: string;
}

interface AchievementsFormData {
  achievements: string[];
  portfolio: PortfolioItem[];
}

export default function AchievementsStep({ data, onUpdate, onNext, onBack }: AchievementsStepProps) {
  const [formData, setFormData] = useState<AchievementsFormData>({
    achievements: data.achievements || [],
    portfolio: data.portfolio || []
  });

  const [achievementInput, setAchievementInput] = useState<string>('');
  const [portfolioTitle, setPortfolioTitle] = useState<string>('');
  const [portfolioDescription, setPortfolioDescription] = useState<string>('');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');

  const handleAddAchievement = (): void => {
    if (achievementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()]
      }));
      setAchievementInput('');
    }
  };

  const handleDeleteAchievement = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleAddPortfolio = (): void => {
    if (portfolioTitle.trim()) {
      setFormData(prev => ({
        ...prev,
        portfolio: [
          ...prev.portfolio,
          {
            title: portfolioTitle.trim(),
            description: portfolioDescription.trim(),
            url: portfolioUrl.trim()
          }
        ]
      }));
      setPortfolioTitle('');
      setPortfolioDescription('');
      setPortfolioUrl('');
    }
  };

  const handleDeletePortfolio = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
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
        Réalisations
      </Typography>

      <Stack spacing={4} sx={{ maxWidth: 600, mx: 'auto' }}>
        {/* Section Réalisations */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Réalisations notables
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              value={achievementInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAchievementInput(e.target.value)}
              placeholder="Ex: Prix du meilleur son au Festival de Cannes 2023"
            />
            <Button
              variant="outlined"
              onClick={handleAddAchievement}
              sx={{ textTransform: 'none', minWidth: 100 }}
            >
              Ajouter
            </Button>
          </Box>
          <Stack spacing={1}>
            {formData.achievements.map((achievement, index) => (
              <Card key={index} variant="outlined">
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="body2">{achievement}</Typography>
                  <IconButton size="small" onClick={() => handleDeleteAchievement(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Section Portfolio */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Portfolio / Projets
          </Typography>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              value={portfolioTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPortfolioTitle(e.target.value)}
              placeholder="Titre du projet"
            />
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              value={portfolioDescription}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPortfolioDescription(e.target.value)}
              placeholder="Description"
            />
            <TextField
              size="small"
              fullWidth
              value={portfolioUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPortfolioUrl(e.target.value)}
              placeholder="Lien (YouTube, Vimeo, site web...)"
            />
            <Button
              variant="outlined"
              onClick={handleAddPortfolio}
              sx={{ textTransform: 'none' }}
            >
              Ajouter au portfolio
            </Button>
          </Stack>
          <Stack spacing={2}>
            {formData.portfolio.map((item, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.title}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                      {item.url && (
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ mt: 0.5, wordBreak: 'break-all' }}
                        >
                          {item.url}
                        </Typography>
                      )}
                    </Box>
                    <IconButton size="small" onClick={() => handleDeletePortfolio(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
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
