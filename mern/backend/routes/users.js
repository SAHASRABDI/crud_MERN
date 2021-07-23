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
    .catch((err) => res.status(400).json("error: " + err));
});
//get a particular id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("error: " + err));
});

//update
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      users.rollno = req.body.rollno;
      users.birthdate = Date.parse(req.body.birthdate);
      users.username = req.body.username;
      users.contact = req.body.contact;
      users.vaccinename = req.body.vaccinename;
      users.vaccine1 = req.body.vaccine1;
      users.vaccine2 = req.body.vaccine2;

      users
        .save()
        .then(() => res.json("user updated"))
        .catch((err) => res.status(400).json("error: " + err));
    })
    .catch((err) => res.status(400).json("error: " + err));
});

module.exports = router;
