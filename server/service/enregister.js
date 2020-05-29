const fs = require('fs')
//const path = "../data"

enregistrer = function (data,path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

module.exports = enregistrer