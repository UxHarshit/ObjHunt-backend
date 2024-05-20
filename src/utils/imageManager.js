import fs from "fs/promises";

// const checkImage = (buffer, object) => {
//   //Saving image temporarily. images are not meant to save in production. the image will be sent to ML model to detect if the object matches the image.
//   fs.writeFile("uploads/" + Math.random(), buffer, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("Image uploaded:");
//     }
//   });

//   // The model will return true if the object and image are same and false if they are different.
//   // sending a random response for now.
//   return Math.round(Math.random()) === 0 ? true : false;
// };

//temporary function name
const checkImage = async (image, room) => {
  try {
    await fs.writeFile("uploads/" + Math.random()+ ".jpg", image);
    console.log("Image uploaded");

    // The model will return true if the object and image are same and false if they are different.
    // sending a random response for now.
    return Math.round(Math.random()) === 0 ? true : false;
  } catch (err) {
    console.error(err);
  }
};

export { checkImage };
