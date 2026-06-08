import * as authService from '../services/authService.js';

// Helper to set refresh token in HttpOnly cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true if in production
    sameSite: 'strict', // helps prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const { user, accessToken, refreshToken } = await authService.registerUser(email, password, name);
    
    setRefreshTokenCookie(res, refreshToken);
    
    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);
    
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token not found in cookies' });
    }

    const { accessToken, refreshToken: newRefreshToken } = await authService.refreshUserToken(token);
    
    // Rotate refresh token
    setRefreshTokenCookie(res, newRefreshToken);

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout successful' });
};

export const getMe = async (req, res) => {
  // Protected route example
  res.status(200).json({ user: req.user });
};
