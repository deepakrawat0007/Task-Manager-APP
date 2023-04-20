const app = require("./app");
const mongoose = require("mongoose");
const port = 5000;
const API = "mongodb+srv://root:root123@cluster0.hzhvoqr.mongodb.net/TaskManager?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);


async function main() {
    await mongoose.connect(API);
    console.log('connected to database');
    app.listen(port, () => console.log(`Server is live at PORT => ${port}`));
};
main();