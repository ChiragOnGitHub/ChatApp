const express = require("express");
const http = require("http"); // Added to create an HTTP server
const socketIo = require("socket.io"); // Added for Socket.IO
const app = express();
const passport = require('passport');
const session = require("express-session");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");
const chatRoutes = require("./routes/chatroutes");
const messageRoutes = require("./routes/messageRoutes");
const googleRoutes = require("./routes/googleroutes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const {cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

require("./config/passport");
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

// Passport and session setup
app.use(
    session({
      secret: process.env.SESSION_SECRET || "your_secret_key",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

//routes
app.use("/api/v1/google",googleRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);


//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

const server=app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

// const server = http.createServer(app); // Create an HTTP server using the Express app
const io = socketIo(server, { // Attach Socket.IO to the server
	cors: {
		origin: "http://localhost:3000",
        credentials: true,
	}
});

// Socket.IO setup
io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id !== newMessageRecieved.sender._id) 
        socket.in(user._id).emit("message received", newMessageRecieved);
      });
    });

    socket.on("update group", (groupData) => {
        socket.in(groupData._id).emit("group update again",groupData);

        groupData.users.forEach((user) => {
          socket.in(user._id).emit("group update", groupData);
        });
      });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
      });
  
  }
);
