    'use strict';

    module.exports = (sequelize, DataTypes) => {
        const ConservationMetric = sequelize.define(
            'ConservationMetric',
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                },
                metricName: {
                    type: DataTypes.STRING,
                    field: 'metric_name',
                    allowNull: false,
                    unique: true,
                },
                metricValue: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'metric_value'
                },
            },
            {
                tableName: 'conservation_metrics',
                underscored: true,
                timestamps: true,
            }
        );

        ConservationMetric.associate = models => {
        };

        return ConservationMetric;
    };
