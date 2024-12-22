import { makeRequest } from './makeRequest';

const headers = {
  'Content-Type': 'application/json',
};

export async function getEmployees(
  token,
  page = 1,
  sortBy = 'id',
  order = 'asc'
) {
  headers.Authorization = `Bearer ${token}`;
  return makeRequest(
    `/employees?page=${page}&sortBy=${sortBy}&order=${order}`,
    'GET',
    headers
  );
}
