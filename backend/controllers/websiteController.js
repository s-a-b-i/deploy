import Website  from '../models/website.model.js';
import { createOrUpdateStats } from '../utils/stats.js';

// Get all websites
export async function getWebsites(req, res) {
  try {
    const websites = await Website.find({approved : true});
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// view a single website
export async function viewWebsite(req, res) {
  try {

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }

    // Update stats
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth() + 1; // Months are 0-based in JavaScript
    // const day = today.getDate();

    // await createOrUpdateStats({
    //   userId,
    //   websiteId : req.params.id,
    //   year,
    //   month,
    //   day,
    //   field: 'clicks',
    //   value: 1
    // });

    res.status(200).json(website);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching website', error: error.message });
  }
}


// get recently created 5 websites
export async function getRecentlyCreatedWebsites(req, res) {
  try {
    const websites = await Website.find({approved : true}).sort({ createdAt: -1 }).limit(req.params.limit || 5);
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// Get single website
export async function getWebsite(req, res) {
  try {
    const foundwebsite = await Website.findById(req.params.id);
    if (!foundwebsite) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(foundwebsite);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching website', error: error.message });
  }
}

// Create website
export async function createWebsite(req, res) {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const website = new Website(req.body);
    const savedWebsite = await website.save();
    res.status(201).json(savedWebsite);
  } catch (error) {
    res.status(400).json({ message: 'Error creating website', error: error.message });
  }
}

// Update website
export async function updateWebsite(req, res) {
  try {
    const website = await Website.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error updating website', error: error.message });
  }
}

// Delete website
export async function deleteWebsite(req, res) {
  try {
    const website = await Website.findByIdAndDelete(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json({ message: 'Website deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting website', error: error.message });
  }
}


// discount
export async function discount(req, res) {
  try {
    const website = await Website.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error applying discount to website', error: error.message });
  }
}


// highlight media
export async function highlightMedia(req, res) {
  try {
    const { months } = req.body;
    
    const website = await Website.findByIdAndUpdate(
      req.params.id,
      { highlightMonths: months },
      { new: true, runValidators: true }
    );
    
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ message: 'Error to highlight media', error: error.message });
  }
}


// Get websites for a user where approved is false
export async function getWebsitesForUserNotApproved(req, res) {
  try {
    const websites = await Website.find({ userId: req.body.userId, approved: false });
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// Get websites for a user where approved is true
export async function getWebsitesForUserApproved(req, res) {
  try {
    const websites = await Website.find({ userId: req.body.userId, approved: true });
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}