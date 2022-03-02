class Validations{

    // valida que los datos obtenidos del body no sean nulos, ni que esten en blanco
    static notNull(data){
        for(let i in data){
            if(!data[i] || data[i] === null || data[i] === '' || data[i] === []) return true
        }
        return false
    }

    // obtiene y retorna los nombres de los archivos cargados para guardarlos en la db
    static Photos(files){
        const filesNames = []
        files.forEach(element => {
            filesNames.push(element.filename)
        });
        return filesNames
    }
    
    // valida la existencia de un dato en la db, atravez del modelo y del id
    static async Exists(model,_id){
        let data
        try{
            data = await model.findOne({_id})
        }catch{
            data = null
        }finally{
            if(data) return true
            return false
        }

    }

}

module.exports = Validations