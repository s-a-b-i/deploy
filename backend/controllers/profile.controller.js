import Profile from '../models/profile.model.js';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Create a new profile
export async function createProfile(req, res) {
  try {
    const { avatar } = req.body;
    let avatarUrl = '';

    if (avatar) {
      const result = await cloudinary.v2.uploader.upload(avatar);
      avatarUrl = result.secure_url;
    }

    const newProfile = new Profile({ ...req.body, avatar: avatarUrl });
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error: error.message });
  }
}

// Get all profiles
export async function getProfiles(req, res) {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error: error.message });
  }
}

// Get a single profile by ID
export async function getProfile(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
}

// Update a profile by ID
export async function updateProfile(req, res) {
  try {
    const { avatar } = req.body;
    let avatarUrl = '';

    if (avatar) {
      const result = await cloudinary.v2.uploader.upload(avatar);
      avatarUrl = result.secure_url;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, { ...req.body, avatar: avatarUrl }, { new: true });
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
}

// Delete a profile by ID
export async function deleteProfile(req, res) {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error: error.message });
  }
}