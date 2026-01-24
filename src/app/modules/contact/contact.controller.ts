import catchAsync from "@/utils/catchAsync.js";

const createContactData = catchAsync(async (req, res) => {});

const getContactsData = catchAsync(async (req, res) => {});

const getContactData = catchAsync(async (req, res) => {});

const deleteContactData = catchAsync(async (req, res) => {});

export const contactController = {
  createContactData,
  getContactData,
  getContactsData,
  deleteContactData,
};
