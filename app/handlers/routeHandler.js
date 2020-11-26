let routeNotFoundHandler = (req, res, next) => {
    res.send('Route Not Found');
}

module.exports = {
    routeNotFoundHandler: routeNotFoundHandler
}