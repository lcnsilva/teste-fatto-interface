import { useEffect, useState } from 'react';
import * as S from './ModalUpdate.js'
import api from '../../services/api.js'

const ModalUpdate = ({ onClose, tarefa, fetchData}) => {

    const [newTarefa, setNewTarefa] = useState({
        id: '',
        nome: '',
        custo: 0,
        dataLimite:''
    });
    const [fetchError, setFetchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if(tarefa){
            const onlyDate = tarefa.dataLimite.split('T')[0];
            setNewTarefa({
                id: tarefa.id,
                nome: tarefa.nome,
                custo: tarefa.custo,
                dataLimite: onlyDate
            });
        }
    }, [tarefa])

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const newDate = new Date(newTarefa.dataLimite);
            await api.put(`/tarefas/${newTarefa.id}`, {
                nome: newTarefa.nome,
                custo: parseFloat(newTarefa.custo),
                dataLimite: newDate
            })
            fetchData();
            onClose();
        }catch(error){
            setFetchError(true);
            setErrorMessage(error.response.data.msg);
        }
    }

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setNewTarefa((prevNewTarefa) => ({
                ...prevNewTarefa,
                [name]: value
            }));
            setFetchError(false);
            setErrorMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor='nome'>Nome da tarefa:</S.Label>
            <S.Input 
            name='nome'
            onChange={handleChange}
            value={newTarefa.nome}
            />           
            <S.Label htmlFor='custo'>Custo:</S.Label>
            <S.Input 
            name='custo' 
            type='number'
            onChange={handleChange}
            value={newTarefa.custo}
            />
            <S.Label htmlFor='dataLimite'>Data Limite:</S.Label>
            <S.Input 
            name='dataLimite' 
            type='date'
            onChange={handleChange}
            value={newTarefa.dataLimite}
            />
            {fetchError ? (
                <S.ErrorContainer>{errorMessage}</S.ErrorContainer>

            ) : ('')}
            <S.ButtonContainer>
                <S.CancelButton type='button' onClick={() => onClose()}>Cancelar</S.CancelButton>
                <S.SubmitButton type='submit'>Atualizar Tarefa</S.SubmitButton>
            </S.ButtonContainer>

        </S.Form>
    )
}

export default ModalUpdate;