const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://0.0.0.0:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");

  var newDish = Dishes({
    name: "Uthappizza",
    description: "test",
  });

  newDish
    .save()
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        { $set: { description: "Updated test" } },
        { new: true }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: "it's good!",
        author: "leo",
      });
      return dish.save();
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
