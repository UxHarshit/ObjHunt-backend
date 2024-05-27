import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-node";
import fs from "fs/promises";
import { GetRoomDetails } from "./roomManager.js";


//temporary function name
const checkImage = async (image, roomId) => {
  try {
    const name = Math.random();
    await fs.writeFile("uploads/" + name + ".jpg", image);
    console.log("Image uploaded");
    
    // Loading the model and the image
    const loadimage = await fs.readFile("uploads/" + name + ".jpg");
    const [model, imageBuffer] = await Promise.all([
      cocoSsd.load(),
      loadimage,
    ]);

    // Decoding the image to tensor
    const img = tf.node.decodeImage(imageBuffer, 3);

    // Detecting objects in the image
    const predictions = await model.detect(img);
    console.log("Predictions: ", predictions);

    let object = GetRoomDetails(roomId)
    object = object.current_obj;

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
