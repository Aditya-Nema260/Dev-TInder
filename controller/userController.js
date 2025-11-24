
const showFeed = (req, res) => {
  try {
    const user = req.userInfo;
    res.status(200).json({
      message: `Welcome to ${user.firstName} feed`,
      user
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

module.exports = {showFeed}