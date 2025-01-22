import Website  from '../models/website.model.js';

// Get all websites
export async function getWebsites(req, res) {
  try {
    const websites = await Website.find();
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