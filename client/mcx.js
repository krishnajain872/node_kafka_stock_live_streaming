$(document).ready(function () {
    const data = {
      labels: ["money", "time"],
      datasets: [
        {
          label: "Stock Price ",
          backgroundColor: [],
          data: [],
        },
      ],
    };
    const updateData = function (newVal) {
      const labels = data["labels"];
      const dataSetInitial = data["datasets"][0]["data"];
      const backgroundColor = data["datasets"][0]["backgroundColor"];
      labels.push(newVal.time);
      if (labels.length > 100) labels.shift(); // Keep max 100 data points
      const newData = parseFloat(newVal.price);
      dataSetInitial.push(newData);
      if (dataSetInitial.length > 1) {
        // Compare the new price with the previous price
        const color =
          newData > dataSetInitial[dataSetInitial.length - 2] ? "green" : "red";
        backgroundColor.push(color);
      } else {
        backgroundColor.push("green"); // Default color for the first data point
      }
      if (dataSetInitial.length > 100) {
        dataSetInitial.shift();
        backgroundColor.shift();
      }
    };
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data,
      options: {
        animation: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock Price",
            },
          },
        },
      },
    });
  
    function webSocketInvoke() {
      var socket = io("http://localhost:3000");
      socket.on("stock_stream_mcx", (value) => {
        updateData(JSON.parse(value));
        chart.update();
      });
    }
    webSocketInvoke();
  });
  