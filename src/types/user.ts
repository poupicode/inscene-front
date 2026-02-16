export interface SocialNetwork {
    id: number;
    name: 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN' | 'TIKTOK' | 'YOUTUBE';
    url: string;
}

export interface UserFile {
    id: number;
    filename: string;
    mimeType: string;
    extension: string;
    url?: string;
    path?: string;
    size: number;
    category: 'Portfolio' | 'Attachment' | 'Diploma' | 'Picture' | 'Video';
    createdAt: string;
}

export interface Job {
    id: number;
    code: string;
    name: string;
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

    // Files
    files?: UserFile[];
    pictures?: UserFile[];
    videos?: UserFile[];

    // Individual fields
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    experience?: string;
    jobs?: Job[];

    // Enterprise fields
    enterpriseName?: string;
    address?: string;
    culture?: string;
    activities?: string;
    practicalInfo?: string;
    websiteUrl?: string;
    contactNumber?: string;
}
