import Favourite from '../../models/favourite.model.js';

// get all favourites for a user
export const getFavourites = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const favourites = await Favourite.find({ userId });
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Favourite
export const createFavourite = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    if (!userId || !websiteId) return res.status(400).json({ error: 'User ID and Website ID are required' });

    const favourite = new Favourite({ userId, websiteId });
    await favourite.save();
    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Favourite by Favourite ID
export const getFavouriteById = async (req, res) => {
  try {
    const { userId } = req.body;
    const { favouriteId } = req.params;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const favourite = await Favourite.findOne({ _id: favouriteId, userId });
    if (!favourite) return res.status(404).json({ error: 'Favourite not found' });

    res.status(200).json(favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Favourite
export const updateFavourite = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    const { favouriteId } = req.params;
    if (!userId || !websiteId) return res.status(400).json({ error: 'User ID and Website ID are required' });

    const favourite = await Favourite.findOneAndUpdate({ _id: favouriteId, userId }, { websiteId }, { new: true });
    if (!favourite) return res.status(404).json({ error: 'Favourite not found' });

    res.status(200).json(favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Favourite
export const deleteFavourite = async (req, res) => {
  try {
    const { userId } = req.body;
    const { favouriteId } = req.params;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const favourite = await Favourite.findOneAndDelete({ _id: favouriteId, userId });
    if (!favourite) return res.status(404).json({ error: 'Favourite not found' });

    res.status(200).json({ message: 'Favourite deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};