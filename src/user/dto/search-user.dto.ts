export interface SearchUserDto {
  username: string;
  fullName: string;
  role: string;
  projects: string[] | string;
  activeYn: string;
}
