import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function RootLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
    const hasRedirected = useRef(false);

    useEffect(() => {
        // En mode dev, rediriger vers /onboarding SEULEMENT au premier chargement
        if (isDevMode && !hasRedirected.current && location.pathname !== '/onboarding') {
            hasRedirected.current = true;
            navigate('/onboarding', { replace: true });
        }
    }, [isDevMode, navigate]);

    return <Outlet />;
}
