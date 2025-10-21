const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server error - please try again later');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Server error - invalid response format');
    }
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server error - please try again later');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Server error - invalid response format');
    }
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

export const logout = () => {
  removeToken();
  removeCurrentUser();
};
