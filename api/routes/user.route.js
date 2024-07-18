const express = require("express");
const verifyToken  = require("../middleware/verifyToken");
const { route } = require("./auth.route");
const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");




const router = express.Router();

router.get("/", async (req, res) => {
    
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);

  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Failed to get user!" });
  }
});

router.get("/:id", verifyToken, async (req,res) => {
  const id = req.params.id;
    try {
    const user = await prisma.user.findUnique(
        {
            where: {id},
        }
    );
    res.status(200).json(user);

  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Failed to get user!" });
  }
});

router.put("/:id", verifyToken, async (req,res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const {  password ,avatar, ...inputs } = req.body;


  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password,10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const {password: userPassword , ...rest} = updatedUser;
    res.status(200).json(rest)
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Failed to get user!" }); 
  }
});
router.delete("/:id",verifyToken, async (req,res) => {
    const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const user = prisma.user.delete({
        where: {id},
    });
    res.status(200).json({message: "user deleted successfully"});

  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Failed to get user!" });
  }
});

module.exports = router;
