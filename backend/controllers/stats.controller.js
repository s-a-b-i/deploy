import Stats from '../models/stats.model.js';

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Create or Update Stats
export const createOrUpdateStats = async (req, res) => {
    try {
      const { userId, year, month, day, field, value } = req.body;
      if (!userId || !year || !month || !day || !field || value === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      let stats = await Stats.findOne({ userId });
      if (!stats) {
        stats = new Stats({ userId, years: [] });
      }
  
      let yearData = stats.years.find(y => y.year === year);
      if (!yearData) {
        yearData = { year, impressions: [], clicks: [], revenues: [], sales: [], addToCarts: [], positions: [], favourites: [] };
        stats.years.push(yearData);
      }
  
      const fieldData = yearData[field];
      let monthData = fieldData.find(m => m.month === month);
      if (!monthData) {
        const daysInMonth = getDaysInMonth(year, month);
        monthData = { month, days: Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, value: 0 })) };
        fieldData.push(monthData);
      }
  
      const dayData = monthData.days.find(d => d.day === day);
      if (dayData) {
        dayData.value += value; // Increment the value
      } else {
        monthData.days.push({ day, value });
      }
  
      await stats.save();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get Stats by Year and Month
export const getStatsByYearAndMonth = async (req, res) => {
  try {
    const { userId, year, month } = req.body;
    if (!userId || !year || !month) {
      return res.status(400).json({ error: 'User ID, Year, and Month are required' });
    }

    const stats = await Stats.findOne({ userId });
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }

    const yearData = stats.years.find(y => y.year === year);
    if (!yearData) {
      return res.status(404).json({ error: 'Year not found' });
    }

    const result = {};
    ['impressions', 'clicks', 'revenues', 'sales', 'addToCarts', 'positions', 'favourites'].forEach(field => {
      const monthData = yearData[field].find(m => m.month === month);
      result[field] = monthData ? monthData.days : [];
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Last 30 Days Stats
export const getLast30DaysStats = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const stats = await Stats.findOne({ userId });
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }

    const result = {};
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date;
    }).reverse();

    ['impressions', 'clicks', 'revenues', 'sales', 'addToCarts', 'positions', 'favourites'].forEach(field => {
      result[field] = last30Days.map(date => {
        const yearData = stats.years.find(y => y.year === date.getFullYear());
        if (!yearData) return { date, value: 0 };

        const monthData = yearData[field].find(m => m.month === date.getMonth() + 1);
        if (!monthData) return { date, value: 0 };

        const dayData = monthData.days.find(d => d.day === date.getDate());
        return { date, value: dayData ? dayData.value : 0 };
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};