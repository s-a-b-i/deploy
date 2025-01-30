import { User } from '../../models/user.model.js';

/**
 * POST /api/admin/users/search
 * Body: { adminId, query }
 * Searches users by name or email. Only an admin can perform this.
 */
export const searchUsers = async (req, res) => {
  try {
    const { adminId, query } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Search by regex on name or email
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      isAdmin: false,
    }).lean();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/all
 * Body: { adminId }
 * Returns all non-admin users (isAdmin: false). Only an admin can perform this.
 */
export const getAllUsers = async (req, res) => {
  try {
    const { adminId } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Fetch only non-admin users
    const users = await User.find({ isAdmin: false }).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/status
 * Body: { adminId, active }  // active should be boolean
 * Fetch all users with the given status. Only an admin can perform this.
 */
export const getUsersByStatus = async (req, res) => {
  try {
    const { adminId, active } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const users = await User.find({ status: !!active }).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/change-status
 * Body: { adminId, userId, status }  // status should be boolean
 * Changes the status (active/inactive) of a user. Only an admin can perform this.
 */
export const changeUserStatus = async (req, res) => {
  try {
    const { adminId, userId, status } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: !!status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ message: 'Status updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/delete
 * Body: { adminId, userId }
 * Deletes a user by ID. Only an admin can perform this.
 */
export const deleteUser = async (req, res) => {
  try {
    const { adminId, userId } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};