import { makeRequest } from './makeRequest';

const headers = {
  'Content-Type': 'application/json',
};

export async function getRequests(
  token,
  page = 1,
  sortBy = 'id',
  order = 'asc'
) {
  headers.Authorization = `Bearer ${token}`;
  return makeRequest(
    `/requests?page=${page}&sortBy=${sortBy}&order=${order}`,
    'GET',
    headers
  );
}
