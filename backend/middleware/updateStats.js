import { createOrUpdateStats } from '../utils/stats.js';

export const updateStats = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const websiteId = req.params.id;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-based in JavaScript
    const day = today.getDate();

    await createOrUpdateStats({
      userId,
      websiteId,
      year,
      month,
      day,
      updates: {
        clicks: 1,
        impressions: 1
      }
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating stats', error: error.message });
  }
};