import { PublicUserProfile } from "./user";

export type PublicMessageProfile = {
  id: string;
  content: string;
  author: PublicUserProfile;
  createdAt: string;
};
