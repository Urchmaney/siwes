const PlacementRequest = require('../models/placementRequest');

const addPlacementRequest = async (placementRequest) => {
  try {
    placementRequest = new PlacementRequest(placementRequest);
    const error = placementRequest.validateSync();

    if (error) {
      return {
        status: false,
        result: Object.keys(error.errors).map(ele => error.errors[ele].message),
      };
    }
    await placementRequest.save();
    return { status: true, result: placementRequest };
  } catch (e) {
    return { status: false, result: [e.message] };
  }
};

module.exports = {
  addPlacementRequest,
};