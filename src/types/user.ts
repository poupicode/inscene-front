export interface SocialNetwork {
    id: number;
    name: 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN' | 'TIKTOK' | 'YOUTUBE';
    url: string;
}

export interface User {
    id: number;
    email: string;
    type?: string;
    role?: string;
    name?: string;
    avatarUrl?: string;
    description?: string;
    createdAt: string;
    isActive?: boolean;
    socialLinks?: string[];
    location?: string[];
    socialNetworks?: SocialNetwork[];

    // Individual fields
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    experience?: string;

    // Enterprise fields
    enterpriseName?: string;
    address?: string;
    culture?: string;
    activities?: string;
    practicalInfo?: string;
    websiteUrl?: string;
    contactNumber?: string;
}
