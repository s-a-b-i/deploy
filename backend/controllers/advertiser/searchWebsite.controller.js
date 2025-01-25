import Website from '../../models/website.model.js';

export async function searchWebsites(req, res) {
  try {
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
      filters.country = country;
    }
    if (gambling === 'true') {
      filters.sensitiveTopics = { $in: ['gambling'] };
    }
    if (cbd === 'true') {
      filters.sensitiveTopics = { $in: ['cbd'] };
    }
    if (adult === 'true') {
      filters.sensitiveTopics = { $in: ['adult'] };
    }
    if (trading === 'true') {
      filters.sensitiveTopics = { $in: ['trading'] };
    }
    if (googleNews) {
      filters.googleNews = googleNews === 'true';
    }

    const websites = await Website.find(filters);
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error searching websites', error: error.message });
  }
}