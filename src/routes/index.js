var router = require('ruta3')()
var Dash = require('./dashboard')
var Add = require('./add')
var Update = require('./update')

router.addRoute('/', function indexRoute () {
    return { View: Dash }
})

router.addRoute('/add', function indexRoute () {
    return { View: Add }
})

router.addRoute('/update/:index', function updateRoute ({ params }) {
    return { View: Update(params.index) }
})

module.exports = router
