export interface Author {
  id?: number;
  name: string;
  avatar: string | null;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  author: Author;
  createdAt: Date;
  tags: string[];
  location: string;
  isUrgent: boolean;
  contractType: 'prestation' | 'full-time' | 'internship' | 'part-time';
  imageUrl: string | null;
  exactSalary?: number;
  minSalary?: number;
  maxSalary?: number;
  applicantsCount?: number;
  missionDetails?: string;
  advantages?: string;
  process?: string;
  profileRequired?: string;
  skillsRequired?: string[];
}
