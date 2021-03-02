
const {overlap} =require('./ServiceRangeOverlop')

module.exports={
    async overlapQueue(base,queue,err){

        if(!Array.isArray(base)) throw new TypeError('typeof base must be a array')

        if(typeof err !== 'function') throw new TypeError('typeof err must be a function')

        if(typeof queue !== 'object') throw new TypeError('typeof queue must be a object')
        
        let i;
        while (i<=queue.length){
            const verifing = queue[i];
            if(await overlap(base,[verifing.start_office,verifing.end_office])){
                err();
                break 
            }
            i++
        }
    }
}