import { JSX, useState } from 'react';
import { Box } from '@mui/material';
import WelcomeStep from './steps/WelcomeStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProfessionalStep from './steps/ProfessionalStep';
import AchievementsStep from './steps/AchievementsStep';
import CompletionStep from './steps/CompletionStep';
import ProgressBar from './ProgressBar';

interface PortfolioItem {
  title: string;
  description: string;
  url: string;
}

export interface ProfileData {
  // Informations personnelles
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  description: string;
  avatarUrl: string;

  // Profil professionnel
  profession: string;
  experience: string;
  skills: string[];
  socialLinks: string[];

  // Réalisations
  achievements: string[];
  portfolio: PortfolioItem[];
}

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    // Informations personnelles
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    description: '',
    avatarUrl: '',

    // Profil professionnel
    profession: '',
    experience: '',
    skills: [],
    socialLinks: [],

    // Réalisations
    achievements: [],
    portfolio: []
  });

  const handleNext = (): void => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleUpdateData = (data: Partial<ProfileData>): void => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const handleComplete = (): void => {
    // TODO: Envoyer les données au backend
    console.log('Profile data:', profileData);
  };

  const getProgress = (): number => {
    switch (currentStep) {
      case 1: return 0; // WelcomeStep
      case 2: return 25; // PersonalInfoStep
      case 3: return 50; // ProfessionalStep
      case 4: return 75; // AchievementsStep
      case 5: return 100; // CompletionStep
      default: return 0;
    }
  };

  const renderStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onStart={handleNext} />;
      case 2:
        return (
          <PersonalInfoStep
            data={profileData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ProfessionalStep
            data={profileData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AchievementsStep
            data={profileData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <CompletionStep
            onViewProfile={() => {/* TODO: Navigate to profile */}}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      {renderStep()}
      {currentStep > 1 && (
        <ProgressBar progress={getProgress()} />
      )}
    </Box>
  );
}
