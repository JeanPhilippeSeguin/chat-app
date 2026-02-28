import type { PublicChannelProfile } from "./channel";
import type { PublicUserProfile } from "./user";

export type PublicServerProfile = {
  id: string;
  name: string;
  picture: string;
};

export type PublicServerDetails = PublicServerProfile & {
  users: PublicUserProfile[];
  channels: PublicChannelProfile[];
};

export type PublicServerProfileList = PublicServerProfile[];
