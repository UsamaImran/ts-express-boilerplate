import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

import { sendResponse } from "../../utils/response";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./user.service";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req?.body);
    let message = `User has been created successfully.`;
    if (!user) {
      message = `Something went wrong while creating user.`;
      sendResponse(res, user, message, httpStatus.BAD_REQUEST, true, false);
    } else {
      sendResponse(res, user, message, httpStatus.OK, false, true);
    }
  } catch (error) {
    const message = `Something went wrong while retrieving users.`;
    sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers(req.query);
    let message = `Users has been retrieved successfully.`;
    if (!users) {
      message = `Something went wrong while retrieving users.`;
      sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
    } else {
      sendResponse(res, users, message, httpStatus.OK, false, true);
    }
  } catch (error) {
    const message = `Something went wrong while retrieving users.`;
    sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.params?.id);
    let message = `User has been retrieved successfully.`;
    if (!user) {
      message = `User not found.`;
      sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
    } else {
      sendResponse(res, user, message, httpStatus.OK, false, true);
    }
  } catch (error) {
    const message = `Something went wrong while retrieving user.`;
    sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
  }
};

export const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUserById(req.params?.id, req?.body);
    let message = `User has been update successfully.`;
    if (!user) {
      message = `User not found.`;
      sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
    } else {
      sendResponse(res, user, message, httpStatus.OK, false, true);
    }
  } catch (error) {
    const message = `Something went wrong while updating user.`;
    sendResponse(res, null, message, httpStatus.NOT_FOUND, true, false);
  }
};

export const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await deleteUserById(req.params?.id);
    let message = `User has been deleted successfully.`;
    if (!user) {
      message = `User not found.`;
      sendResponse(res, null, message, httpStatus.BAD_REQUEST, true, false);
    } else {
      sendResponse(res, user, message, httpStatus.OK, false, true);
    }
  } catch (error) {
    const message = `Something went wrong while deleting user.`;
    sendResponse(res, null, message, httpStatus.NOT_FOUND, true, false);
  }
};
