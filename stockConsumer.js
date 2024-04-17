const { Kafka } = require("kafkajs");
const express = require("express");
const socketIO = require("socket.io");
const app = express();
const port = 3000;

const kafka = require("./client");

const consumer = kafka.consumer({ groupId: "my-group" });

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = socketIO(server, { cors: { origin: "*" } });

const topics = ["stock_stream_tcs", "stock_stream_mcx", "stock_stream_paytm"];

consumer.connect().then(() => {
  topics.forEach((topic) => {
    consumer.subscribe({ topic: topic, fromBeginning: true }).then(() => {
      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(
            "THIS IS FROM SERVER CONSUMER=>  ",
            topic,
            message.value.toString()
          );
          io.emit(topic, message.value.toString());
        },
      });
    });
  });
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});
