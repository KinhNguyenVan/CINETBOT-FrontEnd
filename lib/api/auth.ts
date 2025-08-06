import { api } from './base';
export interface UserRegisterPayload {
  email: string
  password: string
  name: string
  year_of_birth: number
  sex: string
  address: string
}
export interface RegisterFormData {
  email: string
  password: string
  name: string
  gender: string
  address: string
  birthDate: string
}
export const authApi = {
  register: (data: UserRegisterPayload) =>
    api.post('/auth/register', data),

  verifyOTP: (data: { email: string; otp: string }) =>
    api.post('/auth/verify-otp', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  getProfile: (access_token: string) =>
    api.get('/auth/me', access_token),

};
