export default [
    {
        modelName: 'Role',
        definition: (sequelize, DataTypes) => {
            return sequelize.define('Role', {
                Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
                RoleName: { type: DataTypes.STRING }
            });
        }
    },
    {
        modelName: 'User',
        definition: (sequelize, DataTypes) => {
            return sequelize.define('User', {
                Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
                Name: DataTypes.STRING,
                Surname: DataTypes.STRING,
                Email: { type: DataTypes.STRING, unique: true },
                PasswordHash: DataTypes.STRING,
                ExternalLoginToken: DataTypes.STRING
            });
        }
    },
    {
        modelName: 'UserRole',
        definition: (sequelize, DataTypes) => {
            return sequelize.define('UserRole', {
                Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
                UserId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: User,
                        key: 'Id',
                        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
                    }
                },
                RoleId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Role,
                        key: 'Id',
                        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
                    }
                }
            });
        }
    }
]