import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: { 
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "pending", 
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'tasks',       
  timestamps: true          
});

export default Task;
