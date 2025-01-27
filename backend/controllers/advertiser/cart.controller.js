import Cart from '../../models/cart.model.js';

// Create Cart
export const createCart = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    if (!userId || !websiteId) return res.status(400).json({ error: 'User ID and Website ID are required' });

    const cart = new Cart({ userId, websiteId });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart by Cart ID
export const getCartById = async (req, res) => {
  try {
    const { userId } = req.body;
    const { cartId } = req.params;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const cart = await Cart.findOne({ _id: cartId, userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Cart
export const updateCart = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    const { cartId } = req.params;
    if (!userId || !websiteId) return res.status(400).json({ error: 'User ID and Website ID are required' });

    const cart = await Cart.findOneAndUpdate({ _id: cartId, userId }, { websiteId }, { new: true });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Cart
export const deleteCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { cartId } = req.params;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const cart = await Cart.findOneAndDelete({ _id: cartId, userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};