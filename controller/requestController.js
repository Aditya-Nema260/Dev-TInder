const UserConnection = require("../models/UserConnection");
const User = require("../models/User");
const sendStatus = async (req, res) => {
  try {
    const fromUserID = req.userId;
    const toUserID = req.params.toUserID;
    const { status } = req.params;

    const fromUser = await User.findById(fromUserID);
    const toUser = await User.findById(toUserID);
    console.log("From", fromUserID);
    console.log("To", toUserID);
    console.log("status", status);

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error("This status is not allowed");
    }
    const exist = await User.findById(toUser);
    if (!exist) {
      return res.status(404).json({ message: "User not found" });
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
      message:
        status === "interested"
          ? `${fromUser.firstName}, Connection request sent successfully to ${toUser.firstName}`
          : ` ${fromUser.firstName}, ignored ${toUser.firstName}`,
      connectionRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const responseRequest = async (req, res) => {
  try {
    const loggedUser = req.userId;
    const { status, requestId } = req.params;
    

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      throw new Error("This status is not allowed");
    }

    console.log("LOGGED USER ",loggedUser);
    console.log("REQ ID",requestId);
    
    const request = await UserConnection.findOne({
      _id: requestId,
      toUserID: loggedUser,
      status: "interested",
    });
    console.log("Request",request);
    
    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    request.status = status
    const data =  await request.save()

    res.status(200).json({
      message : `Connection request ${status}`,
      data
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendStatus,
  responseRequest,
};
