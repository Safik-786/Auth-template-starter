import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';

const generateTokens = (user) => {
  const payload = { userId: user.id, email: user.email };
  
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });

  return { accessToken, refreshToken };
};

export const registerUser = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  });

  const { accessToken, refreshToken } = generateTokens(user);
  return { user, accessToken, refreshToken };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const { accessToken, refreshToken } = generateTokens(user);
  return { user, accessToken, refreshToken };
};

export const refreshUserToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    // Find user to ensure they still exist and optionally check if token was revoked
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const { accessToken, refreshToken } = generateTokens(user);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
