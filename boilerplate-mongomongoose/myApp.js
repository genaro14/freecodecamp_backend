require('dotenv').config();
const res = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = process.env.MONGO_URI
//DB Connection
mongoose.connect(db, { useNewUrlParser: true })
  .catch(error => handleError(error));

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);
const otherPerson = new Person({
  name: 'Jonh',
  age: 36,
  favoriteFoods: ['jam', 'jelly']
});
const arrayOfPeople = [
  { name: "Gourav", age: 20, favoriteFoods: ["Burguer"] },
  { name: "Ana", age: 20, favoriteFoods: ["Empanadas"] },
  { name: "Chechu", age: 32, favoriteFoods: ["Mushrooms"] }
];
arrayOfPeople.forEach(element => {
  console.log(element);
});
const createAndSavePerson = (done) => {
  otherPerson.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName,
  }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
     favoriteFoods: food 
    }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findOne({
    _id: personId
  }, function(err,data) {
    if (err) return console.log(err);
    done(null ,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({
    _id: personId
  },(err,person)=> {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.markModified("favoriteFoods")
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({
    name: personName
  },(err,person)=> {
    if (err) return console.log(err);
    person.age = ageToSet
    person.save((err, updatePerson) => {
      if(err) return console.log(err);
      done(null,updatePerson)
    });
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=>{
    if(err) return console.log(err);
    done(null, data);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.find({name: nameToRemove},(err,data)=> {
    if (err) return console.log(err);
    Person.remove((err,data) => {
      done(null , data);
    })
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const resultQuery = Person
  .find({favoriteFoods: foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({ name: 1, favoriteFoods:1 })
  .exec( (err,people) => {
    if (err) return console.log(err);
    done(null, people);

  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
