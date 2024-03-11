import { UserInput } from "./types";
import { User, UserDocument } from "./user.model";

/**
 * Create a user
 * @param {Object} payload
 * @returns {Promise<UserDocument>}
 */

const createUser = async (payload: UserInput): Promise<UserDocument> => {
  const user = new User(payload);
  return user.save();
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<UserDocument>}
 */

const getAllUsers = async (filter: any): Promise<UserDocument[]> => {
  const users = await User.find(filter);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<UserDocument>}
 */
const getUserById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id);
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<UserDocument>}
 */
const updateUserById = async (
  userId: string,
  updateBody: UserInput
): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<UserDocument>}
 */
const deleteUserById = async (userId: string): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }
  await User.findOneAndDelete({ _id: userId }).exec();
  return user;
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
