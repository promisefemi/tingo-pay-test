const { Router } = require("express");
const router = Router();
const Commonmodel = require("../model/commonmodel");
const userModel = new Commonmodel("user");
const tranasctionModel = new Commonmodel("transactions");

router.get("/", async (req, res) => {
  let users = await userModel.find({});
  if (users.length) {
    res.json({
      status: true,
      data: users,
    });
  } else {
    res.json({
      status: false,
      data: [],
    });
  }
});

router.post("/add", async (req, res) => {
  let { email, amount } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    res.json({
      status: false,
      message: "User not found",
    });
  }

  let parsedAmount = parseFloat(amount);

  let insertCREDIT = await tranasctionModel.insert({
    from: "NOWHERE",
    to: user.email,
    amount: parsedAmount,
    type: "CREDIT",
  });

  if (insertCREDIT) {
    let updateUserBalance = await userModel.update(
      { email: email },
      { balance: user.balance + parsedAmount }
    );
    res.json({
      status: true,
      message: "Credit successful",
    });
  } else {
    res.json({
      status: false,
      messsage: "Something went very wrong",
    });
  }
});

router.post("/pay", async (req, res) => {
  let { from, to, amount } = req.body;
  let parsedAmount = parseFloat(amount);

  let userFrom = await userModel.findOne({ email: from });
  let userTo = await userModel.findOne({ email: to });

  console.log(userFrom);
  console.log(parsedAmount);
  if (userFrom.balance < parsedAmount) {
    console.log("inside");
    return res.json({
      status: false,
      mesage: "Inssufficient funds",
    });
  }

  let insertCREDIT = await tranasctionModel.insert({
    from: userFrom.email,
    to: userTo.email,
    amount: parsedAmount,
    type: "CREDIT",
  });

  let insertDEBIT = await tranasctionModel.insert({
    from: userFrom.email,
    to: userTo.email,
    amount: parsedAmount,
    type: "DEBIT",
  });

  let updatefromBalance = await userModel.update(
    { email: userFrom.email },
    { balance: userFrom.balance - parsedAmount }
  );
  let updatetoBalance = await userModel.update(
    { email: userTo.email },
    { balance: userTo.balance + parsedAmount }
  );

  if (insertCREDIT && insertDEBIT && updatefromBalance && updatetoBalance) {
    res.json({
      status: true,
      message: "Payment successful",
    });
  } else {
    res.json({
      status: false,
      messsage: "Something went very wrong",
    });
  }
});

module.exports = router;
