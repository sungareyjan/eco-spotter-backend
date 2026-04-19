const {ConservationMetric} = require ('../models');

class DashBoardService{

    //  ? get summary data of that country or location
    // todo get summary data of that country or location
    // * temporary get all latest summary of data
    async conservationMetric(){
        return await  ConservationMetric.findAll({
            attributes:['metricName','metricValue']
        });
    }

}

module.exports = new DashBoardService();