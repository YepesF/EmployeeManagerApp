import { makeRequest } from './makeRequest';

const headers = {
  'Content-Type': 'application/json',
};

export async function getRequests(
  token,
  page = 1,
  sortBy = 'id',
  order = 'desc'
) {
  headers.Authorization = `Bearer ${token}`;
  return makeRequest(
    `/requests?page=${page}&sortBy=${sortBy}&order=${order}`,
    'GET',
    headers
  );
}

export async function fetchRequest(
  token,
  code,
  description,
  summary,
  employeeId
) {
  headers.Authorization = `Bearer ${token}`;
  const body = { code, description, summary, employeeId };
  return makeRequest(`/requests`, 'POST', headers, body);
}
