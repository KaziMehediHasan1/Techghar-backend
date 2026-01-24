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

const getContactsData = catchAsync(async (_, res) => {
  const result = await contactService.getContactsDataIntoDB();
  sendResponse(res, {
    statusCode: 200,
    message: "email get successfully",
    success: true,
    data: result,
  });
});

const getContactData = catchAsync(async (req, res) => {
  const result = await contactService.getContactDataIntoDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "email get successfully",
    success: true,
    data: result,
  });
});

const deleteContactData = catchAsync(async (req, res) => {
  const result = await contactService.deleteContactIntoDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "email deleted successfully",
    success: true,
    data: result,
  });
});

export const contactController = {
  createContactData,
  getContactData,
  getContactsData,
  deleteContactData,
};
