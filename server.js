const express = require("express");
const cors = require("cors");
const app = express();

const config = require("config");
const port = config.get("portENV");

// CORS
app.use(cors());
// Body-Parser Middleware
app.use(express.json());

// Auth
auth = require("./routes/api/auth");
app.use("/api/auth", auth);

// Register
register = require("./routes/api/register");
app.use("/api/register", register);

// Users
users = require("./routes/api/users");
app.use("/api/users", users);

// Department
departments = require("./routes/api/dep");
app.use("/api/departments", departments);

// Active/Inactive Service
add_service = require("./routes/api/manage/add_service");
app.use("/api/users/service/add", add_service);

// Get All list Service
list_service = require("./routes/api/manage/get_service");
app.use("/api/users/service/list", list_service);

// Research Service
list_research = require("./routes/api/manage/research/get_service");
app.use("/api/service/list/research", list_research);

// Research Email
email_research = require("./routes/api/manage/research/get_email");
app.use("/api/service/email/research", email_research);

// app.listen(port);
app.listen(port, () => console.log(`Server ทำงานอยู่ที่ Port ${port}`));
