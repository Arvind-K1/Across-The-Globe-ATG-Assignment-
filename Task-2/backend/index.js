import dbConnection from "./db/database.js";
import app from "./app.js";

import { config } from "dotenv";
config();

app.listen(process.env.PORT || 5000, async ()=> {
    await dbConnection();
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})