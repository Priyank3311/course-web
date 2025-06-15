export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  username: string;
  role: string;
  token: string;
}
