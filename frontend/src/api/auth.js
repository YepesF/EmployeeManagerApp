import { makeRequest } from './makeRequest';

const headers = {
  'Content-Type': 'application/json',
};

export async function register(name, hireDate, salary, email, password) {
  const body = { name, hireDate, salary, email, password };
  return makeRequest('/auth/register', 'POST', headers, body);
}

export async function login(email, password) {
  const body = { email, password };
  return makeRequest('/auth/login', 'POST', headers, body);
}
