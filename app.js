import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js'; 
import projectRoutes from "./src/routes/project.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import "./src/models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tags", tagRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa con la DB");
    await sequelize.sync({ alter: true }); 
    console.log("Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("No hubo conexión con la BD por:", error);
  }
})();


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});