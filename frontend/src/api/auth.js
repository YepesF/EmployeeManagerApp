import { makeRequest } from './makeRequest';

export async function register(name, hireDate, salary, email, password) {
  return makeRequest('/auth/register', 'POST', {
    name,
    hireDate,
    salary,
    email,
    password,
  });
}

export async function login(email, password) {
  return makeRequest('/auth/login', 'POST', { email, password });
}
