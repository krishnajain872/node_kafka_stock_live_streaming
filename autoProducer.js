const { Kafka } = require("kafkajs");
const fakeStockData = require("./service/stockData.service");

const kafka = require("./client");

const producer = kafka.producer();

const produceDataTCS = async () => {
  await producer.connect();
  setInterval(async () => {
    const data = fakeStockData();
    let payload = {
      topic: "stock_stream_tcs",
      messages: [{ value: JSON.stringify(data) }],
    };
    console.log("THIS IS FROM TCS PRODUCER => ", payload);
    await producer.send(payload);
  }, 500);
};
const produceDataMCX = async () => {
  await producer.connect();
  setInterval(async () => {
    const data = fakeStockData();
    let payload = {
      topic: "stock_stream_mcx",
      messages: [{ value: JSON.stringify(data) }],
    };
    console.log("THIS IS FROM MCX PRODUCER => ", payload);
    await producer.send(payload);
  }, 500);
};
const produceDataPaytm = async () => {
  await producer.connect();
  setInterval(async () => {
    const data = fakeStockData();
    let payload = {
      topic: "stock_stream_paytm",
      messages: [{ value: JSON.stringify(data) }],
    };
    console.log("THIS IS FROM Paytm PRODUCER => ", payload);
    await producer.send(payload);
  }, 500);
};

produceDataTCS().catch(console.error);
produceDataMCX().catch(console.error);
produceDataPaytm().catch(console.error);
