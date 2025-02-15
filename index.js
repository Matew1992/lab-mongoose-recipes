const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const scrambledEggs = {
  title: "Scrambled Eggs",
  level: "Amateur Chef",
  ingredients: "eggs",
  cuisine: "International",
  dishType: "main_course",
  duration: 15,
  creator: "Unknown",
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log(scrambledEggs.title)
    return Recipe.create(scrambledEggs);
  })
  .then(() => {
    data.forEach((element)=>console.log(element.title));
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log("the recipe of Rigatoni alla Genovese was updated");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    console.log("the recipe of Carrot Cake was deleted");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
