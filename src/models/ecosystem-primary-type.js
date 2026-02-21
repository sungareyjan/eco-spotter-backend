'use strict';

module.exports = (sequelize, DataTypes) => {
    const EcosystemPrimaryType = sequelize.define(
        'EcosystemPrimaryType',
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            publicId: {
                type: DataTypes.CHAR(36),
                allowNull: false,
                unique: true,
                field:'public_id'
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field:'created_at'
            },
            updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:'updated_at'
            }
        },
        {
            tableName: 'ecosystem_primary_types',
            timestamps: true,
            underscored: true,
        }
    );
    EcosystemPrimaryType.associate = models => {
        EcosystemPrimaryType.hasMany(models.EcosystemSecondaryType, { foreignKey: 'ecosystemSecondaryTypeId', as: 'ecosystemSecondaryType' });
    };
    return EcosystemPrimaryType;
};
