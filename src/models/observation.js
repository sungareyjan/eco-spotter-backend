'use strict';

module.exports = (sequelize, DataTypes) => {
    const Observation = sequelize.define(
        'Observation',
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

            speciesId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field:'species_id'
            },

            proposedSpeciesId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field:'proposed_species_id'
            },

            kingdomGroup: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field:'kingdom_group'
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            observedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field:'observed_at'
            },

            latitude: {
                type: DataTypes.DECIMAL(10, 7),
                allowNull: false,
            },

            longitude: {
                type: DataTypes.DECIMAL(10, 7),
                allowNull: false,
            },

            locationName: {
                type: DataTypes.STRING(255),
                allowNull: true,
                field:'location_name'
            },

            confidenceLevel: {
                type: DataTypes.ENUM('Low', 'Medium', 'High'),
                allowNull: false,
                defaultValue: 'Low',
                field:'confidence_level'
            },

            createdBy: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field:'created_by'
            },

            status: {
                type: DataTypes.ENUM('Pending', 'Verified', 'Rejected'),
                allowNull: false,
                defaultValue: 'Pending',
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
            tableName: 'observations',
            timestamps: true,
            underscored: true,
        }
    );
    Observation.associate = models => {
        Observation.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
        Observation.belongsTo(models.Species, { foreignKey: 'speciesId', as: 'species' });
        Observation.hasMany(models.ObservationImage, { foreignKey: 'observationId', as: 'ObservationImages' });
    };
    return Observation;
};
