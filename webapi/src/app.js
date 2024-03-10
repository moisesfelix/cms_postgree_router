const express = require("express")
const cors = require('cors')

// Import Routes
const router_api_cms = require("./routes/api-cms");
const router_api_router = require("./routes/api-router");
const app = express();

const allowedOrigins = [
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin 

        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get("/", (request, response) => {
    return response.json({
        message: "Termos de Serviço"
    });
});

app.use("/", router_api_cms);
app.use("/", router_api_router);

app.use(express.json());

//app.listen(3001, () => console.log("SERVER IS RUNNING ON localhost:3001"));
module.exports = app;
