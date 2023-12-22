export type ISkinData = {
  width: number;
  height: number;
  size: number;
  url: string;
  name: string;
} | null;

export interface IUserData {
  skin: ISkinData;
  cape: ISkinData;
}
