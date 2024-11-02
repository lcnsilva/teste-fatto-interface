import deleteTarefa from '../../services/deleteTarefa.js';
import * as S from './ModalExcluir.js'

const ModalExcluir = ({ onClose, tarefa, fetchData }) => {
    const handleDelete = async (event, value) => {
        console.log(event);
        if(value){
            await deleteTarefa(tarefa.id);
            fetchData();
            console.log('Deletou')
        }
        if(!value){
            console.log('não deletou')
        }
        onClose();
    } 
    return (
        <S.Container>
            <S.Title>Deseja excluir a tarefa:</S.Title>
            <S.NameTask>{tarefa.nome}</S.NameTask>
            <S.ContainerButton>
                <S.Button $buttonColor="#588157" onClick={(e) => handleDelete(e, true)}>Sim</S.Button>
                <S.Button onClick={(e) => handleDelete(e, false)}>Não</S.Button>
            </S.ContainerButton>
        </S.Container>
    )
}

export default ModalExcluir;