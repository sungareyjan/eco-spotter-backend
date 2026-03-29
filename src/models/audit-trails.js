'use strict';

module.exports = (sequelize, DataTypes) => {
    const AuditTrails = sequelize.define(
        'AuditTrails',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            timestamp: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            browser: DataTypes.STRING,

            browserVersion: {
                type: DataTypes.STRING,
                field: 'browser_version'
            },
            entityId: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'entity_id'
            },
            ip: DataTypes.STRING,

            log: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            moduleCode: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'module_code'
            },

            //  AUTO JSON HANDLING
            oldData: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'old_data',

                get() {
                    const value = this.getDataValue('oldData');
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    if (value === null || value === undefined) {
                        this.setDataValue('oldData', null);
                    } else {
                        this.setDataValue('oldData', JSON.stringify(value));
                    }
                }
            },
            os: DataTypes.STRING,
            remarks: DataTypes.TEXT,

            request: {
                type: DataTypes.TEXT,
                allowNull: true,

                get() {
                    const value = this.getDataValue('request');
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    if (value === null || value === undefined) {
                        this.setDataValue('request', null);
                    } else {
                        this.setDataValue('request', JSON.stringify(value));
                    }
                }
            },

            //  ENUM replaced with validation
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['success', 'failed', 'error']]
                }
            },
            username: DataTypes.STRING,
            role: DataTypes.STRING,

            device: {
                type: DataTypes.STRING,
                allowNull: true
            },
            deviceUnit: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'device_unit'
            }
        },
        {
            tableName: 'audit_trails',
            underscored: true,
            timestamps: true,
        }
    );

    return AuditTrails;
};