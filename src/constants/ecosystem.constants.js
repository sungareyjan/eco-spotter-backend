'use strict';

const PRIMARY_TYPES = Object.freeze({
    TERRESTRIAL: 'Terrestrial',
    AQUATIC: 'Aquatic'
});

const SECONDARY_TYPES = Object.freeze({
    TERRESTRIAL: Object.freeze(['Forest','Grassland','Desert','Tundra','Mountain']),
    AQUATIC: Object.freeze(['Freshwater','Marine'])
});

const HABITAT_VALUES = Object.values(PRIMARY_TYPES);
const ALL_SECONDARY_TYPES = Object.values(SECONDARY_TYPES).flat();

module.exports ={
    PRIMARY_TYPES,
    SECONDARY_TYPES,
    HABITAT_VALUES,
    ALL_SECONDARY_TYPES
}
