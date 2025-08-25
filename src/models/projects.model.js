import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {               
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'projects', 
  timestamps: true,
});

export default Project;
