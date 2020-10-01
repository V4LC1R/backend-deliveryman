const {range} =require('./base')

module.exports = {
    async overlap(one,two){
        

        if(!Array.isArray(one)) throw new TypeError('typeof one must be a array')

        if(!Array.isArray(two)) throw new TypeError('typeof two must be a array')

        if(!await range(one,two) && !await this.range(two,one))
            return false
        else return true
    }
}