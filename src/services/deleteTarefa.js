import api from "./api.js";

const deleteTarefa = async (id) => {
    try{
        const response = await api.delete(`/tarefas/${id}`)
        const data = response.status;
        return data;
    }catch(error){
        console.log(error);
    }
}

export default deleteTarefa;
