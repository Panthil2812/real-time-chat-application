const express = require(`express`);
require(`dotenv`).config();
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);

const bodyParser = require(`body-parser`);
const http = require("http");
const socket = require("socket.io");

//initializing the port
const PORT = process.env.PORT || 5050;

//creating the server
const app = express();

// Database connection
require(`./config/mongodb`);

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: `50mb`, extended: true }));
app.use(bodyParser.json({ limit: `15mb` }));

// accessing the routes
app.use(`/user`, require(`./routes/user.route`));
app.use(`/message`, require(`./routes/message.route`));

//  default route
app.all(`/`, (req, res) => {
  return res
    .status(200)
    .send(`Real Time Chat Application running successfully`);
});

app.all(`*`, (req, res) => {
  return res.status(200).send({
    status: false,
    message: `URL not found.`,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
