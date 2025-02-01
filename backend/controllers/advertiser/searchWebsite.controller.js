import Website from '../../models/website.model.js';
import { User } from '../../models/user.model.js';

export async function searchWebsites(req, res) {
  try {
    const userId = req.body.userId;

    if(!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // perfrom user check 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // perfrom block check 
    if (user.status === false) {
      return res.status(403).json({ message: 'User is blocked' });
    }

    const {
      searchQuery,
      minPrice,
      maxPrice,
      da,
      ascore,
      mediaType,
      category,
      country,
      gambling,
      cbd,
      adult,
      trading,
      googleNews
    } = req.query;

    const filters = {};

    if (searchQuery) {
      filters.webDomain = { $regex: searchQuery, $options: 'i' };
    }
    if (minPrice) {
      filters.price = { ...filters.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }
    if (da) {
      filters.da = { $gte: Number(da[0]), $lte: Number(da[1]) };
    }
    if (ascore) {
      filters.ascore = { $gte: Number(ascore[0]), $lte: Number(ascore[1]) };
    }
    if (mediaType) {
      filters.mediaType = mediaType;
    }
    if (category) {
      filters.category = { $in: [category] };
    }
    if (country) {
      filters.language = country;
    }
    if (gambling ) {
      filters.sensitiveTopics = { $in: ['Gambling'] };
    }
    if (cbd ) {
      filters.sensitiveTopics = { $in: ['CBD'] };
    }
    if (adult ) {
      filters.sensitiveTopics = { $in: ['Adult'] };
    }
    if (trading ) {
      filters.sensitiveTopics = { $in: ['Trading'] };
    }
    if (googleNews) {
      filters.googleNews = googleNews === 'true';
    }

    // fetch websites with filters and approved true
    const websites = await Website.find({ ...filters, status: 'approved' });
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error searching websites', error: error.message });
  }
}