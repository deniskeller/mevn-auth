import { request } from './Api';

export const register = (data) => request({ url: 'auth/signup', method: 'post', data });

export const login = (data) => request({ url: 'auth/login', method: 'post', data});