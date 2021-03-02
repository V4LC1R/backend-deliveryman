module.exports={
    async equal(firstDate,secondDate){
        //Ano Atual != Ano do inicio do contrato
        if(firstDate.getFullYear() != secondDate.getFullYear())
            return false
        
        //Mes Atual != Mes do Inicio do Contrato
        if(firstDate.getMonth() != secondDate.getMonth())
            return false
        
        //Dia Atual != Dia do Inicio do Contrato
        if(firstDate.getDate() != secondDate.getDate())
            return false
        
        return true
        
    },
    async different(firstDate,secondDate){
        //Ano Atual != Ano do inicio do contrato
        if(firstDate.getFullYear() == secondDate.getFullYear())
            return false
        
        //Mes Atual != Mes do Inicio do Contrato
        if(firstDate.getMonth() == secondDate.getMonth())
            return false
        
        //Dia Atual != Dia do Inicio do Contrato
        if(firstDate.getDate() == secondDate.getDate())
            return false
        
        return true
        
    },
    async grantThan(firstDate,secondDate){
        //Ano Atual < Ano do inicio do contrato
        if(firstDate.getFullYear() < secondDate.getFullYear())
            return false
        
        //Mes Atual < Mes do Inicio do Contrato
        if(firstDate.getMonth() < secondDate.getMonth())
            return false
        
        //Dia Atual < Dia do Inicio do Contrato
        if(firstDate.getDate() < secondDate.getDate())
            return false
        
        return true
    },
    async lessThan(firstDate,secondDate){
        //Ano Atual > Ano do inicio do contrato
        if(firstDate.getFullYear() > secondDate.getFullYear())
            return false
        
        //Mes Atual > Mes do Inicio do Contrato
        if(firstDate.getMonth() > secondDate.getMonth())
            return false
        
        //Dia Atual > Dia do Inicio do Contrato
        if(firstDate.getDate() > secondDate.getDate())
            return false
        
        return true
    }
}