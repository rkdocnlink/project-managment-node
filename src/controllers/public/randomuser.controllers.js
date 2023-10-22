import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getUserById = asyncHandler(async (req, res) => {
  const user = 1;
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {name:'rakesh bairwa'}, "User fetched successfully"));
});


export {getUserById };
