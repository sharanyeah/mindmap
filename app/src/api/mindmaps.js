import { getToken } from './auth';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Server error - please try again later');
  }
  
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Server error - invalid response format');
    }
    throw error;
  }
};

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const getAllMindMaps = async () => {
  const response = await fetch(`${API_BASE_URL}/mindmaps`, {
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};

export const getMindMap = async (id) => {
  const response = await fetch(`${API_BASE_URL}/mindmaps/${id}`, {
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};

export const createMindMap = async (name, data) => {
  const response = await fetch(`${API_BASE_URL}/mindmaps`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, data }),
  });
  
  return handleResponse(response);
};

export const updateMindMap = async (id, name, data) => {
  const response = await fetch(`${API_BASE_URL}/mindmaps/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ name, data }),
  });
  
  return handleResponse(response);
};

export const deleteMindMap = async (id) => {
  const response = await fetch(`${API_BASE_URL}/mindmaps/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};
