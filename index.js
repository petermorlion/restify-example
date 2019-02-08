const restify = require('restify');
const uuid = require("uuid/v4");

const inMemoryCollection = {
    teams: [],
    games: []
};

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get("/teams", (req, res, next) => {
    res.send({ data: inMemoryCollection.teams });
    return next();
});

server.post("/teams", (req, res, next) => {
    req.body.id = uuid();
    inMemoryCollection.teams.push(req.body);
    res.send(201);
    return next();
});

server.get("/games", (req, res, next) => {
    res.send({ data: inMemoryCollection.games });
    return next();
});

server.post("/games", (req, res, next) => {
    req.body.id = uuid();
    inMemoryCollection.games.push(req.body);
    res.send(201);
    return next();
});

server.get({name: "team", path: "/teams/:id"}, (req, res, next) => {
    const team = inMemoryCollection.teams.filter(value => value.id === req.params.id);
    res.send(team);
    return next();
});

server.get("/games/:id", (req, res, next) => {
    const game = inMemoryCollection.games.filter(value => value.id === req.params.id);
    res.send({
        id: game.id,
        homeTeam: server.router.render("team", { id: game.homeTeamId }),
        awayTeam: server.router.render("team", { id: game.awayTeamId })
    });
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
}); 
