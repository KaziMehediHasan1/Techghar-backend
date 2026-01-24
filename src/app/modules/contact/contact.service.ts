import contactModel from "@/app/modules/contact/contact.model.js";
import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/utils/appError.js";

const createContactDataIntoDB = async (payload: any) => {
  const { userId, email } = payload;
  const checkUserExist = await userModel.findById({
    _id: userId,
    email: email,
  });
  if (!checkUserExist) {
    throw new AppError(404, "please login first, then try again");
  }
  const result = await contactModel.create(payload);
  if (!result) {
    throw new AppError(404, "email wan't send! try again");
  }
  return result;
};

const getContactsDataIntoDB = async () => {
  const result = await contactModel.find();
  if (!result) {
    throw new AppError(404, "not found, try 10sec later");
  }
  return result;
};

const getContactDataIntoDB = async (payload: any) => {};

const deleteContactIntoDB = async (payload: any) => {};

export const contactService = {
  createContactDataIntoDB,
  getContactDataIntoDB,
  getContactsDataIntoDB,
  deleteContactIntoDB,
};
