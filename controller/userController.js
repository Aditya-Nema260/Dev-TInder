const UserConnection = require("../models/UserConnection");
const User = require("../models/User");

const showFeed = async (req, res) => {
  try {
    const loggedUserId = req.userId;
    const connectionRequest = await UserConnection.find({
      $or: [{ fromUserID: loggedUserId }, { toUserID: loggedUserId }],
    }).select("fromUserID toUserID");

    const notShow = new Set();
    connectionRequest.forEach((request) => {
      notShow.add(request.fromUserID.toString());
      notShow.add(request.toUserID.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: [...notShow] } }, 
        { _id: { $ne: loggedUserId } },
      ],
    }).select("firstName lastName about email age techStack gender about imageUrl _id");

    console.log("UNIQUE ", notShow);

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const showRequestList = async (req, res) => {
  try {
    const loggedInUser = req.userId;
    console.log("USER CONNECCTION", loggedInUser);

    const connectionRequest = await UserConnection.find({
      toUserID: loggedInUser,
      status: "interested",
    })
      .populate(
        "fromUserID",
        "firstName lastName email age gender imageUrl about techStack"
      )
      .select("fromUserID");

    res.status(200).json({
      message: "Requests fetched",
      requests: connectionRequest,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const showConnection = async (req, res) => {
  try {
    const loggedInUser = req.userId;
    const connectionRequest = await UserConnection.find({
      $or: [
        {
          toUserID: loggedInUser,
          status: "accepted",
        },
        {
          fromUserID: loggedInUser,
          status: "accepted",
        },
      ],
    });
    console.log(connectionRequest);

    let populateConnection;
    let arrayPopulatated = [];

    // console.log(connectionRequest.toUserID);
    for (let connection of connectionRequest) {
      if (connection.fromUserID == loggedInUser) {
        populateConnection = await connection.populate(
          "toUserID",
          "firstName lastName email age gender imageUrl about techStack"
        );
        console.log(connection.toUserID);

        arrayPopulatated.push(connection.toUserID);
      } else {
        populateConnection = await connection.populate(
          "fromUserID",
          "firstName lastName  age gender imageUrl about techStack"
        );
        arrayPopulatated.push(connection.fromUserID);
      }
    }

    console.log(arrayPopulatated);

    res.status(200).json({
      message: "your connection",
      connections: arrayPopulatated,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = { showFeed, showRequestList, showConnection };
