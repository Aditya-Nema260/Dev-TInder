const UserConnection = require("../models/UserConnection");
const User = require("../models/User");
const InterestedUser = async (req, res) => {
  try {
    const fromUserID = req.userId;
    const toUserID = req.params.toUserID;
    const { status } = req.params;

    const fromUser = await User.findById(fromUserID);
    const toUser = await User.findById(toUserID);
    console.log("From", fromUserID);
    console.log("To", toUserID);
    console.log("status", status);

    const allowedStatus = ["interested", "rejected"];
    const exist = await User.findById(toUser);
    if (!allowedStatus.includes(status)) {
      throw new Error("This status is not allowed");
    }
    if (!exist) {
      res.status(404).message("User not found");
    }
    if (fromUserID === toUserID) {
      throw new Error("Can't make this request");
    }
    const existingRequest = await UserConnection.findOne({
      $or: [
        { fromUserID, toUserID },
        { fromUserID: toUserID, toUserID: fromUserID },
      ],
    });

    if (existingRequest) {
      throw new Error("Connection Request already exist");
    }
    const connectionRequest = await UserConnection.create({
      fromUserID,
      toUserID,
      status,
    });
    res.status(200).json({
      message: `${fromUser.firstName}, Connection request sent successfully to ${toUser.firstName}`,
      connectionRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  InterestedUser,
};
