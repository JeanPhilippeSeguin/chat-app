export enum ChannelType {
  VOICE = "voice",
  TEXT = "text",
}

export type PublicChannelProfile = {
  id: string;
  name: string;
  type: ChannelType;
};
