import { Box } from '@mui/material';
import { usePageLayout } from '../hooks/usePageLayout';
import ProfileSetup from '../components/profile/ProfileSetup';

export default function Account() {
  usePageLayout();

  return (
    <Box sx={{ mt: 4 }}>
      <ProfileSetup />
    </Box>
  );
}
