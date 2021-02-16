import { request } from './Api';

export const registerUser = (data) => request({ url: 'auth/signup', method: 'POST', headers: 'application/json;charset=utf-8', data });

export const loginUser = (data) => request({ url: 'auth/login', method: 'POST', headers: 'application/json;charset=utf-8', data });