const { faker } = require("@faker-js/faker");

function generateStockData() {
  let date = faker.date.recent();
  let formattedDate = date.toISOString().replace("T", " ").substring(0, 19);

  let dataPoint = {
    time: formattedDate,
    price: faker.finance.amount(),
  };

  return dataPoint;
}

module.exports = generateStockData;
