export interface SearchUserDto {
    username: string;
    fullname: string;
    role: string;
    projects: string[] | string;
    activeYn: string;
}