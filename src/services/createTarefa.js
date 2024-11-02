import api from "./api.js";

const createTarefa = async (tarefaData) => {
    try{
        const dataLimite = new Date(tarefaData.dataLimite)
        dataLimite.setHours(0, 0, 0, 0);
        console.log('TESTE DE DATA:' + dataLimite);
        const response = await api.post('/tarefas', {
            nome: tarefaData.nome,
            custo: parseFloat(tarefaData.custo),
            dataLimite: dataLimite
        })
        const statusCode = response.status;
        return statusCode;
    }catch(error){
        if(error.response){
            if(error.response.status === 406){
                return error.response.status
            }
            console.log(error.response.data);
            console.log(error.response.status);
        }
    }
}

export default createTarefa;
