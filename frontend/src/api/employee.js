import { makeRequest } from './makeRequest';

const headers = {
  'Content-Type': 'application/json',
};

export async function getEmployees(
  token,
  page = 1,
  sortBy = 'id',
  order = 'desc'
) {
  headers.Authorization = `Bearer ${token}`;
  return makeRequest(
    `/employees?page=${page}&sortBy=${sortBy}&order=${order}`,
    'GET',
    headers
  );
}

export async function fetchEmployee(
  token,
  hireDate,
  name,
  salary,
  email,
  password,
  role
) {
  headers.Authorization = `Bearer ${token}`;
  const body = { hireDate, name, salary, email, password, role };
  return makeRequest('/employees', 'POST', headers, body);
}

export async function updateEmployee(
  token,
  id,
  hireDate,
  name,
  salary,
  email,
  password,
  role
) {
  headers.Authorization = `Bearer ${token}`;
  const body = { hireDate, name, salary, email, password, role };
  return makeRequest(`/employees/${id}`, 'PUT', headers, body);
}

export async function deleteEmployee(token, id) {
  headers.Authorization = `Bearer ${token}`;
  return makeRequest(`/employees/${id}`, 'DELETE', headers);
}
