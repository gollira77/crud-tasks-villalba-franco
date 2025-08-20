import User from './user.model.js';
import Task from './task.model.js';
import Profile from './profiles.model.js';
import Project from './projects.model.js';
import Tag from './tags.model.js';

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Profile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.belongsToMany(Tag, { through: 'task_tags', as: 'tags' });
Tag.belongsToMany(Task, { through: 'task_tags', as: 'tasks' });

User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

export { User, Task, Profile, Project, Tag };

