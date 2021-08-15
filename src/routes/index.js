var router = require('ruta3')()
var Dash = require('./dashboard')

router.addRoute('/', function indexRoute (match) {
    return { view: Dash }
})

module.exports = router
