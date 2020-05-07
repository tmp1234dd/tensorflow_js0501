const tf = require("@tensorflow/tfjs");
const split = require("./split");
const insert_words = require("./switch");
const model_initialize = require("./model_initialize");
require("@tensorflow/tfjs-node");

async function main() {
  model = model_initialize();

  const learning_data = await split("./dataset/acde.csv");
  const x_test = [
    [
      70,
      66,
      10,
      0,
      39,
      53,
      40,
      54,
      50,
      55,
      56,
      39,
      28,
      0,
      8,
      26,
      43,
      47,
      50,
      52,
      41,
      24,
      38,
      52,
      37,
      29,
      42,
      22,
      26,
      29,
      22,
      99,
      97,
      93,
      46,
    ],
  ];
  const y_test = [[1, 0, 0, 0, 0, 0]];
  const x_data = [];
  const y_data = [];

  learning_data.forEach((el) => {
    x_data.push(el.splice(0, 35));
    y_data.push(el);
  });

  const x_realtime = tf.tensor2d(x_test);
  const y_realtime = tf.tensor2d(y_test);

  try {
    loadedModel = await tf.loadLayersModel("file://./model/model.json");
  } catch (e) {
    console.log("불러오기 실패");
  }

  console.log("==============================================");
  const predictions = loadedModel.predict(x_realtime, 20).argMax(1);
  var p = predictions.dataSync()[0];
  const label = y_realtime.argMax(1);
  var l = label.dataSync()[0];

  console.log(`예측한 자세는 ${insert_words(p)}입니다`);
  console.log(`실제 자세는 ${insert_words(l)}입니다`);
  console.log("==============================================");
}

main();