import User from './user.model.js';
import Task from './task.model.js';
import Profile from './profiles.model.js';
import Project from './projects.model.js';
import Tag from './tags.model.js';

// 1:N → User - Task 
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

Project.belongsToMany(Tag, { through: 'project_tags' });
Tag.belongsToMany(Project, { through: 'project_tags' });

export { User, Task, Profile, Project, Tag };
