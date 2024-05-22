import fs from "fs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-node";

const checkImage = async (filename, buffer, object) => {
  try {
    // Saving the image temporarily
    await fs.promises.writeFile("uploads/" + filename, buffer);
    console.log("Image uploaded:", filename);

    // Loading the model and the image
    const [model, imageBuffer] = await Promise.all([
      cocoSsd.load(),
      fs.promises.readFile("uploads/" + filename),
    ]);

    // Decoding the image to tensor
    const img = tf.node.decodeImage(imageBuffer, 3);

    // Detecting objects in the image
    const predictions = await model.detect(img);
    console.log("Predictions: ", predictions);

    // Checking if the object is present in the image
    for (let prediction of predictions) {
      if (prediction.class === object) {
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { checkImage };
