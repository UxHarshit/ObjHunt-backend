import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs-node";
import fs from "fs/promises";
import { GetRoomDetails } from "./roomManager.js";


//temporary function name
const checkImage = async (image, roomId) => {
  try {
    const name = Math.random();
    await fs.writeFile("uploads/" + name + ".jpg", image);
    console.log("Image uploaded");

    // image is base64 encoded, so we need to decode it
    const buffer = Buffer.from(image, "base64");

    image = tf.node.decodeImage(buffer, 3); // 3 channels for RGB
    
    // Load the model
    const model = await mobilenet.load(
      {
        version: 2, // mobilenet version 2 has better accuracy
        /**
         * alpha is a numeric value in [0, 1], which controls the width of the network.
         * The value of alpha is multiplied to the number of filters in each layer.
         * Higher alpha means more weights, which increases the capacity of the network.
         * Lower alpha reduces the number of weights, which reduces the capacity of the network.
         * ⚠ Higher alpha reduces the speed of the network (i.e., the time taken to make a prediction).
         */
        alpha: 1.0,
      },
      { strict: true } // called for unsupported operations must be handled strictly
    );
    // Checking if the object is present in the image
    const predictions = await model.classify(image);
    console.log(predictions);
    const obj = predictions.find((prediction) => prediction.className === room);
    if (obj) {
      console.log("Object found");
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false; 
  }
};

export { checkImage };
