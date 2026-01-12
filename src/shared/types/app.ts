export type UserRole = 'Mentor' | 'Member';

export interface AppUser {
  uid: string;
  displayName: string;
  email: string | null;
  role: UserRole;
}

export type { Timestamp } from "firebase/firestore";
