const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");
const app = express();

const router = express.Router();




router.post("/register", async (req,res)=> {
    const {username ,email,password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,10);
   

        const newUser =  await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });
    
        console.log(newUser)
    
        res.status(201).json({message: "User created successfully."})
    }
    catch(e){
        res.status(500).json({message: "Failed to create user"});
    }
    
} );
router.post("/login", async (req,res)=>{
    const {username, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: { username }
          });
          if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid Credentials!" });
      

        const age= 1000 * 60 * 24 *7;

          const token = jwt.sign({
            id: user.id,
            isAdmin:true,
          },"SecRET",{expiresIn: age})


          const {password:userPassword, ...userinfo}  =user;
        res.cookie("token", token,{
            httpOnly: true,
            maxAge: age,
            // secure:true
        }).json(userinfo);
}catch(e){
    console.log(e);
    res.status(500).json({message: "Failed to login"});
}   
});




router.post("/logout", (req,res)=>{
    res.clearCookie("token").status(200).json({message: "logout Successfully."});
});


module.exports = router;
 



