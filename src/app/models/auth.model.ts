export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
export interface RegisterRequestDto {
  username: string;
  password: string;
  role: string;
}
