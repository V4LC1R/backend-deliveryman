module.exports={
    async range(start,end){

        if(!Array.isArray(start)) throw new TypeError('typeof start must be a array')

        if(!Array.isArray(end)) throw new TypeError('typeof end must be a array')

        const tableTrue = [];
       start.map((s,t)=>{
           const[HS,MS]=s.split(':');
           end.map((e,n)=>{
           const [HE,ME]=e.split(':')
                if(n<=0){
                    if(HS<=HE){
                        if(HS==HE){
                            if(MS < ME){
                                return tableTrue.push(true);
                            }else tableTrue.push(false);
                        }else return tableTrue.push(true);
                    }else return null
                }else{
                    if(HS>=HE){
                        if(HS==HE){
                            if(MS > ME){
                                return tableTrue.push(true);
                            }else return tableTrue.push(false);
                        }else return tableTrue.push(true);
                    }else{
                        const [a,b]=end[0].split(':');
                        if( HS >= a && HS <= HE){
                            if(HS==a){
                                if(MS < b){
                                    return tableTrue.push(true);
                                }else tableTrue.push(false);
                            }else tableTrue.push(false);
                        }else tableTrue.push(true);
                    }
                }
           })
       })
       //true == in range
       //false == out range
       if(tableTrue.filter(e=>{return e ==false}).length >0)
        return true
       else return false
    }
}