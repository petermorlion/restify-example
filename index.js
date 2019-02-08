const restify = require('restify');

const server = restify.createServer();

const inMemoryCollection = {
    teams: [],
    games: []
};

server.get("/teams", (req, res, next) => {
    res.send(inMemoryCollection.teams);
    next();
});

server.get("/games", (req, res, next) => {
    res.send(inMemoryCollection.teams);
    next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
}); 
