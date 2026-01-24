import { contactService } from "@/app/modules/contact/contact.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createContactData = catchAsync(async (req, res) => {
  const result = await contactService.createContactDataIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "email is send",
    success: true,
    data: result,
  });
});

const getContactsData = catchAsync(async (req, res) => {});

const getContactData = catchAsync(async (req, res) => {});

const deleteContactData = catchAsync(async (req, res) => {});

export const contactController = {
  createContactData,
  getContactData,
  getContactsData,
  deleteContactData,
};
