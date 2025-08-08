import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exictosa con la DB");
    await sequelize.sync({ alter: true }); 
    console.log("Tablas sincronizadas correctamente.");
    
  } catch (error) {
    console.error("No hubo conexión con la BD por:", error);
  }
})();

app.listen(PORT, () => {
    console.log(`servidor en http://localhost:${PORT}`)
});