const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const rollno = req.body.rollno;
  const birthdate = Date.parse(req.body.birthdate);
  const username = req.body.username;
  const contact = req.body.contact;
  const vaccinename = req.body.vaccinename;
  const vaccine1 = req.body.vaccine1;
  const vaccine2 = req.body.vaccine2;
  //console.log(req.body);
  const newUser = new User({
    rollno,
    birthdate,
    username,
    contact,
    vaccinename,
    vaccine1,
    vaccine2,
  });
  newUser
    .save()
    .then(() => res.json("user added"))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
//get a particular id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json(err));
});

//update
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.rollno = req.body.rollno;
      user.birthdate = Date.parse(req.body.birthdate);
      user.username = req.body.username;
      user.contact = req.body.contact;
      user.vaccinename = req.body.vaccinename;
      user.vaccine1 = req.body.vaccine1;
      user.vaccine2 = req.body.vaccine2;

      user
        .save()
        .then(() => res.json("user updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
