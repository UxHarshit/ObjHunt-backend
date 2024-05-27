import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-node";
import fs from "fs/promises";

//temporary function name
const checkImage = async (image, room) => {
  try {
    const name = Math.random();
    await fs.writeFile("uploads/" + name + ".jpg", image);
    console.log("Image uploaded");
    
    // Loading the model and the image
    const image = await fs.readFile("uploads/" + filename);
    const [model, imageBuffer] = await Promise.all([
      cocoSsd.load(),
      image,
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
