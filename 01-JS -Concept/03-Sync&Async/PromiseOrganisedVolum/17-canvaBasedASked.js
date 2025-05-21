function crawlJson(data, callback) {
  if (data === null || typeof data !== 'object') {
    callback(data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach(item => {
      crawlJson(item, callback);
    });
  } else {
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        crawlJson(data[key], callback);
      }
    }
  }
}

function createPrimitiveCollector(collectionArray) {
  return (value) => {
    if (value !== null && typeof value !== 'object' && !Array.isArray(value)) {
      collectionArray.push(value);
    }
  };
}