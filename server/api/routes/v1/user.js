const express = require("express");
const router = express.Router();

const User = require("../../controllers/User");

router.get("/contacts", User.getContacts);
router.post("/contact", User.addContact);
router.patch("/contact/:id", User.saveContact);
router.delete("/contact/:id", User.deleteContact);


module.exports = router;
