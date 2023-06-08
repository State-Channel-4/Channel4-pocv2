const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Channel4 API",
            version: "1.0.0",
            description: "Channel4 discovery API",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"], // files containing annotations as above
};

module.exports = options;
