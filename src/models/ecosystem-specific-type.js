'use strict';

module.exports = (sequelize, DataTypes) => {
    const EcosystemSpecificType = sequelize.define(
        'EcosystemSpecificType',
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

            ecosystemTertiaryTypeId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field:'ecosystem_tertiary_type_id'
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            keyCharacteristics: {
                type: DataTypes.TEXT,
                allowNull: true,
                field:'key_characteristics'
            },
            exampleSpecies:{
                type: DataTypes.TEXT,
                allowNull:true,
                field:'example_species'
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
            tableName: 'ecosystem_specific_types',
            timestamps: true,
            underscored: true,
        }
    );
    EcosystemSpecificType.associate = models => {
        EcosystemSpecificType.hasMany(models.Species, { foreignKey: 'ecosystemSpecificTypeId', as: 'species' });
        EcosystemSpecificType.belongsTo(models.EcosystemTertiaryType, { foreignKey: 'ecosystemTertiaryTypeId', as: 'ecosystemTertiaryType' });
    };
    return EcosystemSpecificType;
};
