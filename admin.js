const kafka = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin Connection Success...");

  await admin.createTopics({
    topics: [
      {
        topic: "stock_stream_tcs",
      },
      {
        topic: "stock_stream_paytm",
      },
      {
        topic: "stock_stream_mcx",
      },
    ],
  });
  const topics = await admin.listTopics();
  console.log(topics);
  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();
