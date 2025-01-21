import Website from '../models/website.model.js';
import mongoose from 'mongoose';

// Get all websites
export async function getWebsites(req, res) {
  try {
    const websites = await Website.find({});
    if (websites.length === 0) {
      return res.status(404).json({ message: 'No websites found' });
    }
    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching websites', error: error.message });
  }
}

// Get single website
export async function getWebsite(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid website ID' });
    }
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
    const website = new Website(req.body); // Ensure required fields are validated in the model
    const savedWebsite = await website.save();
    res.status(201).json(savedWebsite);
  } catch (error) {
    res.status(400).json({ message: 'Error creating website', error: error.message });
  }
}

// Update website
export async function updateWebsite(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid website ID' });
    }
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid website ID' });
    }
    const website = await Website.findByIdAndDelete(req.params.id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.status(200).json({ message: 'Website deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting website', error: error.message });
  }
}
