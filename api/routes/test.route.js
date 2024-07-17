const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const app = express();

const router = express.Router();


router.get("/should-be-logged-in", verifyToken , async (req, res) => {
    
    res.status(200).json({ message: "You are authenticated" })

});
router.get("/should-be-admin" ,(req, res) => {

    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated!" });

    jwt.verify(token, "SecRET", async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid." });
        }
        if (!payload.isAdmin) {
            return res.status(403).json({message: "not Authorized!"});
        }
    })
    res.status(200).json({ message: "You are authenticated" })
});


// export default router;
module.exports = router;




