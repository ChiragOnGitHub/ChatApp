const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const {cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);


//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

