

class oTest{
    constructor(){ }
    teste(req,res,next){
        res.status(200).json({
            message:'Acesso funcionando',
            
        })
    }

}

module.exports = new oTest();