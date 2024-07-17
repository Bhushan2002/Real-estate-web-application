const express = require("express");
const app = express();

const router = express.Router();


router.get("/",(req,res)=>{
    res.send("routes working...");
});
router.post("/",(req,res)=>{
    res.send("routes working...");
});
router.put("/",(req,res)=>{
    res.send("routes working...");
});
router.delete("/",(req,res)=>{
    res.send("routes working...");
});

// export default router;
module.exports = router;




