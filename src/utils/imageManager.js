import fs from "fs";

const checkImage = (filename, buffer, object) => {
  //Saving image temporarily. images are not meant to save in production. the image will be sent to ML model to detect if the object matches the image.
  fs.writeFile("uploads/" + filename, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image uploaded:", filename);
    }
  });

  // The model will return true if the object and image are same and false if they are different.
  // sending a random response for now.
  return Math.round(Math.random()) === 0 ? true : false;
};

export { checkImage };
