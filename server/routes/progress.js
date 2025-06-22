const express = require('express');
const router = express.Router();
const { UserProgress, Shape, Theme, UserBadges, Badge } = require('../models');
const authenticateToken = require('../middleware/auth');

// Save game progress
router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { themeId, shapeId, accuracy, timeSpent } = req.body;
    const userId = req.user.userId;

    // Find or create progress record
    const [progress, created] = await UserProgress.findOrCreate({
      where: { userId, shapeId },
      defaults: {
        completed: true,
        accuracy,
        timeSpent,
        attempts: 1,
        completedAt: new Date()
      }
    });

    // If record exists, update it
    if (!created) {
      await progress.update({
        completed: true,
        accuracy: Math.max(progress.accuracy || 0, accuracy),
        timeSpent: progress.timeSpent + timeSpent,
        attempts: progress.attempts + 1,
        completedAt: new Date()
      });
    }

    // Check if user deserves a badge
    const shape = await Shape.findByPk(shapeId);
    if (shape) {
      // Get all completed shapes for this theme
      const completedShapes = await UserProgress.count({
        where: {
          userId,
          completed: true
        },
        include: [{
          model: Shape,
          where: { themeId: shape.themeId }
        }]
      });

      // If all shapes in theme are completed, award theme badge
      const totalShapesInTheme = await Shape.count({
        where: { themeId: shape.themeId }
      });

      if (completedShapes === totalShapesInTheme) {
        const theme = await Theme.findByPk(shape.themeId);
        const badge = await Badge.findOne({
          where: { name: `${theme.name} Master` }
        });

        if (badge) {
          await UserBadges.findOrCreate({
            where: {
              userId,
              badgeId: badge.id
            }
          });
        }
      }
    }

    res.json({ 
      success: true, 
      progress,
      message: 'Progress saved successfully'
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving progress' 
    });
  }
});

// Get user progress
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const progress = await UserProgress.findAll({
      where: { userId },
      include: [{
        model: Shape,
        include: [Theme]
      }]
    });

    const badges = await UserBadges.findAll({
      where: { userId },
      include: [Badge]
    });

    res.json({
      success: true,
      progress,
      badges
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching progress' 
    });
  }
});

module.exports = router; 