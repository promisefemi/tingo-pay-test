const { Router } = require("express");
 const router = Router();
const Commonmodel = require("../model/commonmodel");
const model = new Commonmodel("user");

router.post("/signup", async (req, res) => {
  let body = req.body;

  const item = await model.insert(body);
  if (item) {
    res.json({
      status: true,
      message: "User created",
    });
  } else {
    res.json({
      status: false,
      message: "User was not creates",
    });
  }
});

module.exports = router;
