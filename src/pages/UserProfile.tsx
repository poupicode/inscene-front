import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Avatar, CircularProgress, Stack, Button, Divider, Chip, Tabs, Tab } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DetailLayout from '../components/layout/DetailLayout';
import PrimaryButton from '../components/common/PrimaryButton';
import SocialIcon from '../components/user/SocialIcon';
import { getUserById } from '../api/userService';
import { User, UserFile } from '../types/user';
import { parseJwt } from '../utils/jwt';
import JustifiedPhotoGrid from '../components/user/JustifiedPhotoGrid';

interface UserProfileProps {
    userId?: number;
}

export default function UserProfile({ userId: propUserId }: UserProfileProps = {}) {
    const { id } = useParams<{ id: string }>();

    // Priorité : prop > URL param > JWT token
    const resolvedId = propUserId ?? (id ? parseInt(id) : null);
    const tokenId = (() => {
        if (resolvedId) return resolvedId;
        const token = localStorage.getItem('access_token');
        const payload = token ? parseJwt(token) : null;
        return payload?.sub as number | undefined;
    })();
    const finalId = resolvedId ?? tokenId;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            if (!finalId) return;

            try {
                setLoading(true);
                const data = await getUserById(finalId);
                console.log('User data:', data);
                setUser(data);
                setError(null);
            } catch (err) {
                console.error('Erreur lors du chargement du profil:', err);
                setError('Impossible de charger le profil');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [finalId]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return (
            <DetailLayout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            </DetailLayout>
        );
    }

    if (error || !user) {
        return (
            <DetailLayout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">{error || 'Profil non trouvé'}</Typography>
                </Box>
            </DetailLayout>
        );
    }

    // Déterminer le nom d'affichage (capitalize)
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const displayName = firstName && lastName
        ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`
        : user.enterpriseName || user.email?.split('@')[0] || 'Utilisateur';

    // Générer le nom d'utilisateur
    const username = firstName && lastName
        ? `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`
        : `@${user.email?.split('@')[0] || 'user'}`;

    // Localisation
    const locationText = user.location && user.location.length > 0
        ? user.location.join(', ')
        : null;

    // Activités : jobs pour individual, activities (string) pour enterprise
    const activitiesTags: string[] = user.type === 'individual'
        ? (user.jobs || []).map(j => j.name)
        : user.activities
            ? user.activities.split(',').map(a => a.trim())
            : [];

    // Fichiers par catégorie
    const pictures = (user.pictures || []);
    const videos = (user.videos || []);
    const otherFiles = (user.files || []).filter(
        f => f.category !== 'Picture' && f.category !== 'Video' && f.category !== 'Diploma'
    );
    const diplomas = (user.files || []).filter(f => f.category === 'Diploma');

    const hasMedia = pictures.length > 0 || videos.length > 0 || otherFiles.length > 0;

    return (
        <DetailLayout>
            <Box>
                {/* Avatar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Avatar
                        src={user.avatarUrl || undefined}
                        alt={displayName}
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Nom en capitalize */}
                <Typography sx={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', mb: 0.5 }}>
                    {displayName}
                </Typography>

                {/* Nom d'utilisateur */}
                <Typography sx={{ fontSize: '16px', fontWeight: 400, color: 'text.secondary', textAlign: 'center', mb: 2 }}>
                    {username}
                </Typography>

                {/* Icône Location + Ville */}
                {locationText && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 3 }}>
                        <LocationOnIcon sx={{ fontSize: '20px', color: 'text.secondary' }} />
                        <Typography sx={{ fontSize: '15px', color: 'text.secondary' }}>
                            {locationText}
                        </Typography>
                    </Box>
                )}

                {/* Boutons d'action */}
                <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                    <PrimaryButton fullWidth sx={{ padding: '8px 13px', borderRadius: '50px' }}>
                        Suivre
                    </PrimaryButton>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            borderRadius: '50px',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 500,
                            padding: '8px 13px',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        Contacter
                    </Button>
                    {user.websiteUrl && (
                        <Button
                            fullWidth
                            variant="outlined"
                            component="a"
                            href={user.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textTransform: 'none',
                                borderRadius: '50px',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                fontWeight: 500,
                                padding: '8px 13px',
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    backgroundColor: 'primary.light',
                                },
                            }}
                        >
                            Portfolio
                        </Button>
                    )}
                </Stack>

                {/* Social Links */}
                {user.socialNetworks && user.socialNetworks.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                            mb: 3,
                            flexWrap: 'wrap',
                        }}
                    >
                        {user.socialNetworks.map((social) => (
                            <SocialIcon key={social.id} socialNetwork={social} />
                        ))}
                    </Box>
                )}

                <Divider />

                {/* Section Activités */}
                {activitiesTags.length > 0 && (
                    <Box sx={{ pt: 6, pb: 6 }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                            Activités
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {activitiesTags.map((activity, index) => (
                                <Chip
                                    key={index}
                                    label={activity}
                                    size="small"
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        backgroundColor: '#F2F6FC',
                                        color: '#000000',
                                        border: 'none',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Onglets Photos / Vidéos / Fichiers */}
                {hasMedia && (
                    <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                aria-label="onglets de contenu"
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        flex: 1,
                                    },
                                }}
                            >
                                <Tab label={`Photos${pictures.length > 0 ? ` (${pictures.length})` : ''}`} />
                                <Tab label={`Vidéos${videos.length > 0 ? ` (${videos.length})` : ''}`} />
                                <Tab label={`Fichiers${otherFiles.length > 0 ? ` (${otherFiles.length})` : ''}`} />
                            </Tabs>
                        </Box>

                        <Box sx={{ py: 3 }}>
                            {activeTab === 0 && (
                                pictures.length > 0 ? (
                                    <JustifiedPhotoGrid pictures={pictures} />
                                ) : (
                                    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                        Aucune photo
                                    </Typography>
                                )
                            )}
                            {activeTab === 1 && (
                                videos.length > 0 ? (
                                    <Stack spacing={2}>
                                        {videos.map((vid) => (
                                            <Box key={vid.id} sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: '#000' }}>
                                                {vid.url ? (
                                                    <video
                                                        src={vid.url}
                                                        controls
                                                        style={{ width: '100%', display: 'block' }}
                                                    />
                                                ) : (
                                                    <Box sx={{ p: 3, textAlign: 'center' }}>
                                                        <Typography sx={{ color: '#fff' }}>{vid.filename}</Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                        Aucune vidéo
                                    </Typography>
                                )
                            )}
                            {activeTab === 2 && (
                                otherFiles.length > 0 ? (
                                    <Stack spacing={1}>
                                        {otherFiles.map((file) => (
                                            <FileItem key={file.id} file={file} />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                        Aucun fichier
                                    </Typography>
                                )
                            )}
                        </Box>
                    </>
                )}

                {/* Section Présentation */}
                {user.description && (
                    <Box sx={{ pt: 6, pb: 6 }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                            Présentation
                        </Typography>
                        <Typography sx={{ fontSize: '15px', fontWeight: 400, color: '#000000', textAlign: 'left' }}>
                            {user.description}
                        </Typography>
                    </Box>
                )}

                {/* Section Diplômes et reconnaissances */}
                {diplomas.length > 0 && (
                    <Box sx={{ pt: 3, pb: 6 }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                            Diplômes et reconnaissances
                        </Typography>
                        <Stack spacing={1}>
                            {diplomas.map((file) => (
                                <FileItem key={file.id} file={file} />
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* DEBUG INFO */}
                <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 1 }}>
                        Debug - Toutes les données reçues:
                    </Typography>
                    <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </Box>
            </Box>
        </DetailLayout>
    );
}

function FileItem({ file }: { file: UserFile }) {
    const sizeLabel = file.size >= 1000000
        ? `${(file.size / 1000000).toFixed(1)} Mo`
        : `${Math.round(file.size / 1000)} Ko`;

    return (
        <Box
            component={file.url ? 'a' : 'div'}
            href={file.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                borderRadius: 2,
                bgcolor: '#F2F6FC',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': file.url ? { bgcolor: '#E3ECF7' } : {},
            }}
        >
            <InsertDriveFileOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.filename}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                    {file.extension.toUpperCase()} - {sizeLabel}
                </Typography>
            </Box>
        </Box>
    );
}
