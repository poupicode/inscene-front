import { useState, useEffect, useCallback } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../api/favoriteService';

export function useFavorites() {
    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [loaded, setLoaded] = useState(false);

    const isLoggedIn = !!localStorage.getItem('access_token');

    useEffect(() => {
        if (!isLoggedIn) {
            setLoaded(true);
            return;
        }
        getFavorites()
            .then((ids) => setSavedIds(ids))
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, [isLoggedIn]);

    const toggleSave = useCallback(async (announcementId: number) => {
        const isSaved = savedIds.includes(announcementId);

        // Optimistic update
        setSavedIds((prev) =>
            isSaved ? prev.filter((id) => id !== announcementId) : [...prev, announcementId]
        );

        if (!isLoggedIn) return;

        try {
            if (isSaved) {
                await removeFavorite(announcementId);
            } else {
                await addFavorite(announcementId);
            }
        } catch {
            // Revert on error
            setSavedIds((prev) =>
                isSaved ? [...prev, announcementId] : prev.filter((id) => id !== announcementId)
            );
        }
    }, [savedIds, isLoggedIn]);

    const isSaved = useCallback((announcementId: number) => {
        return savedIds.includes(announcementId);
    }, [savedIds]);

    return { savedIds, isSaved, toggleSave, loaded };
}
