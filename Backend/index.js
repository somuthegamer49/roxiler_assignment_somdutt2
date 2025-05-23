const PORT =5000;
const server = require('./app')
const database=require('./datasource')

async function start(){
    try{
        await database
        server.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}
start()