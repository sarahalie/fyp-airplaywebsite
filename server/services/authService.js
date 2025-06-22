const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

class AuthService {
  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Create user
      const user = await User.create(userData);

      // Generate JWT token
      const token = this.generateToken(user);

      return {
        token,
        user: this.sanitizeUser(user)
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verify password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await user.update({ lastLogin: new Date() });

      // Generate JWT token
      const token = this.generateToken(user);

      return {
        token,
        user: this.sanitizeUser(user)
      };
    } catch (error) {
      throw error;
    }
  }

  generateToken(user) {
    return jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  sanitizeUser(user) {
    const { password, resetPasswordToken, resetPasswordExpires, ...sanitizedUser } = user.toJSON();
    return sanitizedUser;
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return this.sanitizeUser(user);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async requestPasswordReset(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const resetToken = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      await user.update({
        resetPasswordToken: resetToken,
        resetPasswordExpires: Date.now() + 3600000 // 1 hour
      });

      return resetToken;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Op.gt]: Date.now() }
        }
      });

      if (!user) {
        throw new Error('Invalid or expired reset token');
      }

      await user.update({
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      });

      return this.sanitizeUser(user);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService(); 