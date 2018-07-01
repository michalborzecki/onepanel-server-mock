module.exports = function getModel(state, modelName, query, returnMany) {
  if (!state[modelName]) {
    return null;
  }
  if (typeof query !== 'object') {
    query = { id: query };
  }
  const toCheck = Object.keys(query);
  const queryResult = state[modelName].filter(model =>
    toCheck
      .map(field => model[field] === query[field])
      .reduce((prev, next) => prev && next, true)
  );
  return returnMany ? queryResult : queryResult[0];
};
