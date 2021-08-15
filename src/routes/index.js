var router = require('ruta3')()
var Dash = require('./dashboard')
var Add = require('./add')
var Update = require('./update')

router.addRoute('/', function indexRoute () {
    return { view: Dash }
})

router.addRoute('/add', function indexRoute () {
    return { view: Add }
})

router.addRoute('/update/:index', function updateRoute ({ params }) {
    return { view: Update(params.index) }
})

module.exports = router
