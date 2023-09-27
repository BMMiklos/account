const eventById = async (args, res) => {
  try {
    return null;
  } catch (error) {
      return new Error(error);
  }
};

const eventsByFilter = async (args, res) => {
  try {
    return [];
  } catch (error) {
      return new Error(error);
  }
};

export const eventQueries = {
  eventById,
  eventsByFilter
};
