import fs from "fs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-node";


const checkImage = (filename, buffer, object) => {
  //Saving image temporarily. images are not meant to save in production. the image will be sent to ML model to detect if the object matches the image.
  fs.writeFile("uploads/" + filename, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image uploaded:", filename);
      // Loading the model and image to check if the object is present in the image.
      Promise.all([cocoSsd.load(), fs.promises.readFile("uploads/" + filename)])
        .then((results) => {
          const model = results[0];
          // Decoding the image to tensor.
          const img = tf.node.decodeImage(results[1], 3);
          // Detecting the object in the image.
          return model.detect(img);
        }).then((predictions) => {
          console.log("Predictions: ", predictions);
          // Checking if the object is present in the image.
          predictions.forEach((prediction) => {
            if (prediction.class === object) {
              return true
            }
          });
          return false;
        });
    }
  });

  // The model will return true if the object and image are same and false if they are different.
  // sending a random response for now.
  return Math.round(Math.random()) === 0 ? true : false;
};

export { checkImage };
