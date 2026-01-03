import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { userService } from "./user.service.js";

const createUsers = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await userService.createUser(payload);
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User created successfully",
        data: result,
    })
})


export const userController = {
    // Controller methods will be defined here 
    createUsers,

};