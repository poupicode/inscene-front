import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { UserFile } from '../../types/user';

interface ImageWithSize {
    file: UserFile;
    width: number;
    height: number;
    ratio: number; // width / height
}

interface Row {
    images: ImageWithSize[];
    height: number;
}

function buildRows(images: ImageWithSize[], containerWidth: number, gap: number, maxRowHeight: number): Row[] {
    const rows: Row[] = [];
    let i = 0;
    let lastRowWasSingle = false;

    while (i < images.length) {
        const img = images[i];
        const nextImg = i + 1 < images.length ? images[i + 1] : null;

        // Height if this image was alone on the row
        const soloHeight = containerWidth / img.ratio;

        if (!nextImg) {
            // Last image, goes alone
            rows.push({ images: [img], height: Math.min(soloHeight, maxRowHeight) });
            i++;
            continue;
        }

        // Height if paired with next image
        const pairRatioSum = img.ratio + nextImg.ratio;
        const pairHeight = (containerWidth - gap) / pairRatioSum;

        // Decision: solo or pair?
        // - Portrait images (ratio < 0.9) prefer to be paired
        // - Very wide images (ratio > 1.8) prefer to be solo
        // - After a single row, prefer a pair (and vice versa) for variety
        const isWide = img.ratio > 1.8;
        const isPortrait = img.ratio < 0.9;
        const pairFitsWell = pairHeight >= 140 && pairHeight <= maxRowHeight;

        let useSolo = false;

        if (isWide && !lastRowWasSingle) {
            // Wide image looks good solo, but not 2 singles in a row
            useSolo = true;
        } else if (isPortrait) {
            // Portraits should always be paired
            useSolo = false;
        } else if (lastRowWasSingle) {
            // Force pair after a single to create variety
            useSolo = false;
        } else if (!pairFitsWell && soloHeight <= maxRowHeight) {
            // Pair would be too squished or too tall, go solo
            useSolo = true;
        }

        if (useSolo) {
            rows.push({ images: [img], height: Math.min(soloHeight, maxRowHeight) });
            lastRowWasSingle = true;
            i++;
        } else {
            rows.push({ images: [img, nextImg], height: Math.min(pairHeight, maxRowHeight) });
            lastRowWasSingle = false;
            i += 2;
        }
    }

    return rows;
}

interface JustifiedPhotoGridProps {
    pictures: UserFile[];
    gap?: number;
    maxRowHeight?: number;
}

export default function JustifiedPhotoGrid({ pictures, gap = 4, maxRowHeight = 250 }: JustifiedPhotoGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesWithSize, setImagesWithSize] = useState<ImageWithSize[]>([]);
    const [containerWidth, setContainerWidth] = useState(0);

    // Load image dimensions
    useEffect(() => {
        let cancelled = false;

        const loadAll = async () => {
            const results = await Promise.all(
                pictures.map(
                    (file) =>
                        new Promise<ImageWithSize>((resolve) => {
                            if (!file.url) {
                                resolve({ file, width: 1, height: 1, ratio: 1 });
                                return;
                            }
                            const img = new Image();
                            img.onload = () => {
                                resolve({
                                    file,
                                    width: img.naturalWidth,
                                    height: img.naturalHeight,
                                    ratio: img.naturalWidth / img.naturalHeight,
                                });
                            };
                            img.onerror = () => {
                                resolve({ file, width: 1, height: 1, ratio: 1 });
                            };
                            img.src = file.url!;
                        })
                )
            );
            if (!cancelled) setImagesWithSize(results);
        };

        loadAll();
        return () => { cancelled = true; };
    }, [pictures]);

    // Observe container width
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        observer.observe(el);
        setContainerWidth(el.clientWidth);

        return () => observer.disconnect();
    }, []);

    if (imagesWithSize.length === 0 || containerWidth === 0) {
        return <Box ref={containerRef} />;
    }

    const rows = buildRows(imagesWithSize, containerWidth, gap, maxRowHeight);

    return (
        <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
            {rows.map((row, rowIdx) => (
                <Box key={rowIdx} sx={{ display: 'flex', gap: `${gap}px`, height: row.height }}>
                    {row.images.map((img) => (
                        <Box
                            key={img.file.id}
                            component="img"
                            src={img.file.url || undefined}
                            alt={img.file.filename}
                            sx={{
                                height: row.height,
                                width: img.ratio * row.height,
                                objectFit: 'cover',
                                borderRadius: 1,
                                flexShrink: 0,
                            }}
                        />
                    ))}
                </Box>
            ))}
        </Box>
    );
}
