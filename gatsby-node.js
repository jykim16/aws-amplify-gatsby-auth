const fetch = require('node-fetch');

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest, createNodeId
}) => {
  // get data from API at build time
  const result = await fetch(`https://86qg7pg1oi.execute-api.us-east-1.amazonaws.com/architectures`)
  const resultData = await result.json()
  // create node for build time data example in the docs
  for (const item of resultData) {
    createNode({
      name: item.name,
      services: item.services,
      id: `${item.id}`,
      parent: null,
      children: [],
      internal: {
        type: `Architectures`,
        contentDigest: createContentDigest(resultData),
      },
    })
  }
}
