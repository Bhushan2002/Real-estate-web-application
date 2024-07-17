const express = require('express');
const postRoute   = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const testRoute = require("./routes/test.route");
const userRoute = require("./routes/user.route")


const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(express.json());


app.use(cookieParser());


app.use('/api/post',postRoute);
app.use('/api/auth',authRoute);
app.use('/api/test',testRoute);
app.use('/api/user',userRoute)

app.listen(3000,()=>{
    console.log("server running at 3000!!");
})