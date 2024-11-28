require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

sequelize.sync({ force: true })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Unable to sync the database:", error));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    details: err.message
  });
});
