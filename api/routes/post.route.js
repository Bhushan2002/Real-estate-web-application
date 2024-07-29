const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const app = express();
const prisma = require("../lib/prisma")

const router = express.Router();


router.get("/", verifyToken, async (req,res)=>{
    const query = req.query;
    console.log(query)
    try { 

        const posts = await prisma.post.findMany({

        
           where: {
            city: query.city || undefined,
            type: query.type || undefined,
            property: query.property || undefined,
            bedroom: parseInt( query.bedroom) || undefined,
            price:{
                gte: parseInt(query.minPrice) ||0,
                lte: parseInt(query.maxPrice) ||10000000,

            },
           },
    });
    
        res.status(200).json(posts);
  
    } catch (err) {
        console.log(err)

        res.status(500).json({message: "Failed to get posts."});
        
    }



});


router.get("/:id",verifyToken,async(req,res)=>{
    const id = req.params.id;
    try { 
        const post = await prisma.post.findUnique({     
            where: {id},
            include: {
                postDetail: true,
                user: {
                    select: {
                        username:true,
                        avatar: true,
                    }
                },
            }
        });

        res.status(200).json(post)



    } catch (err) {
        console.log(err)

        res.status(500).json({message: "Failed to get posts."});
        
    }

});


router.post("/",verifyToken, async (req,res)=>{
    const body = req.body;
    const tokenUserId = req.userId;
    try { 
       const newPost = await prisma.post.create({
        data: {
            ...body.postData,
            userId : tokenUserId,
            postDetail: {
                create: body.postDetail,
            }
        }
       })   
       res.status(200).json(newPost);
        
    } catch (err) {
        console.log(err)

        res.status(500).json({message: "Failed to upload posts."});
        
    }

});


router.put("/:id", (req,res)=>{
    try { 
        
    } catch (err) {
        console.log(err)

        res.status(500).json({message: "Failed to update posts."});
        
    }

});


router.delete("/:id", verifyToken, async (req,res)=>{
    const id = req.params.id;
    const tokenUserId  = req.userId;
    try { 
        const delPost = await prisma.post.findUnique({
            where: {id}
        });
        if(post.userId !== tokenUserId){
            return res.status(403).json({message: "not authorized."})

        }
        await prisma.post.delete({
            where: {id}
        })
        res.status(200).json({message: "post successfully deleted."});
        
    } catch (err) {
        console.log(err)

        res.status(500).json({message: "Failed to delete posts."});
        
    }

})

module.exports = router;




