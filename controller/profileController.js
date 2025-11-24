const viewProfile = async (req,res) => {
    try {
        const user = req.userInfo
        res.status(200).json({
            message : `Here's the profile of ${user.firstName}`,
            user
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    viewProfile
}