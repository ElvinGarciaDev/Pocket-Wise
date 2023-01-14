const express = require("express");
const app = express();
const mongoose = require("mongoose"); // Handle interaction with out database.
const passport = require("passport/lib"); // For handleing autothac
const session = require("express-session"); // Enable us to stay logged in
const MongoStore = require("connect-mongo")(session); // Enable us to stay logged in. Someone can close their browser, come back and stay logged in
const methodOverride = require("method-override"); // So we don't have to use client side javascript
const flash = require("express-flash"); // Notification for when error happens. EX: Email has been used error. 
const logger = require("morgan");
const connectDB = require("./config/database"); // Holds our Database connect
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

const bookmarkAttractionRoutes = require("./routes/bookmarkAttraction") // Bring in the routes comments
const localUploadRoutes = require("./routes/localUpload") // Bring in the routes comments

// Bring in the expense model
const expenseModel = require("./models/localUpload");
// bring in the budget model
const budgeteModel = require("./models/BookmarkAttraction");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing so we can look at the stuff coming in from the forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// //Setup Routes For Which The Server Is Listening
// app.use("/", mainRoutes); // If any '/' route come in. Use the mainRoutes file
// app.use("/post", postRoutes); // If any /post routes come in. Use the postRoutes. When user is viewing a specific bookmarked attraction
// app.use("/bookmarkAttraction", bookmarkAttractionRoutes) // For any routes that use the /bookmarkAttraction go to this router. When a user is searching for attractions or bookmarks an attraction
// app.use("/localUpload", localUploadRoutes) //Users can create/upload any attractions.

app.get("/api", async (req, res) => {

  try {
    
    // get all the expenses and budget from the database
    let data = await expenseModel.find({})
    let budgetData = await budgeteModel.find({})

    // let allExpenses = data.reduce((accumulator, current) => accumulator += current.price, 0)

    //we want to set the state for both the expenses and the budget on page load. 
    res.json({data, budgetData})
    
  } catch (error) {
    
  }
})

app.post(`/expense/:id`, async (req, res) => {

  try {
    let newExpence = await expenseModel.create({
      title: req.body.title,
      price: Number(req.body.price)
    })

    // Get the current balance
    let balance = await budgeteModel.findOne({_id: req.params.id})
    
    // Subtract the expense that was entered from the current balance
    let newBalance = balance.balance - Number(req.body.price)
    console.log(newBalance, "newBalance")

    // Update the balance in the DB with the newBalance Varible
    //We also need to update the balance. When somone adds a new expense. We need to detuct it from the balance
    let budget = await budgeteModel.findOneAndUpdate({_id : req.params.id}, 
      {
        $set: { balance: newBalance},
      })

    // Get the current budget data. This includes the newest balance. We'll need it to update the budget state in react.
    // When somone adds a new expense we'll need to update the balance. This is help us with that
    let budgetData = await budgeteModel.find({})

    res.json({newExpence, budgetData})


  } catch (error) {
    
  }
})

app.delete("/expense/:id", async (req, res) => {
  try {

    // Find the expense thay needs to be deleted. We'll need to find it so we can do the math and add it back to the balance. 
    // If someone remvoes an expense. the balance needs to go up. 
    let expense = await expenseModel.findOne({ _id: req.params.id })

    // Get the current balance
    let balance = await budgeteModel.findOne({_id: "63c201b5658d30527eb613fc"})

    // add the expense that was removed back to the balance
    let newBalance = balance.balance + expense.price

     // Update the balance in the DB with the newBalance Varible
    //We also need to update the balance. When somone adds a new expense. We need to detuct it from the balance
    let budget = await budgeteModel.findOneAndUpdate({_id : "63c201b5658d30527eb613fc"}, 
      {
        $set: { balance: newBalance},
      })


    // Delete post from db
    let deleteExpense = await expenseModel.deleteOne({ _id: req.params.id });

    // Get the current budget data. This includes the newest balance. We'll need it to update the budget state in react.
    // When somone deletes a expense we'll need to update the balance. This is help us with that
    let budgetData = await budgeteModel.find({})
    console.log(budgetData, "here")

    res.json({budgetData})

    // res.json(deleteExpense)
  } catch (error) {
    
  }
})

// Requests for budget. When somone want's to create a budget
app.post("/budget", async (req, res) => {
  console.log("here", req.body)


  try {

    // Setting the budget using the budgetModel
    // We also need to keep track of the balance. When somone first sbumits a budget. The balance should equal the same
    let budget = await budgeteModel.create({budget: Number(req.body.text), balance: Number(req.body.text)})

    res.json(budget)
  } catch (error) {
    console.log(error)
  }

})

// When user wants to update the budget
app.put("/budget/:id", async (req, res) => {
  console.log("here", req.body)


  try {

    let budget = await budgeteModel.findOneAndUpdate({_id: req.params.id}, 
      {
        $set: { budget: Number(req.body.text)},
      })

      // not sure why budget returns the old budget. Why would it not return the new budget??
      // We need the new budget to send back the react and update the budget state.
      let updatedBudget = await budgeteModel.findById({_id: req.params.id})

    res.json(updatedBudget)
  } catch (error) {
    
  }

})

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});