import api from "./api.js";

const getTarefas = async () => {
    try{
        const response = await api.get('/tarefas')
        const data = response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}

export default getTarefas;
