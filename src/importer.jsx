import * as helpers from './main.jsx'
import * as globals from './loader'
import * as main from './main.jsx'
import * as app from './App.jsx'
window.helpers = helpers
window.globals = globals
window.THREEAPI = {
    create3DWindow : main.create3DWindow,
    helpers : helpers,
    globals : globals,
    app : app

}