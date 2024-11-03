import { useState } from 'react'
import * as S from './Form.js'
import api from '../../services/api.js'

const FormCriarTarefa = ({ onClose, fetchData }) => {

    const [tarefa, setTarefa] = useState({
        nome: '',
        custo: 0,
        dataLimite:''
    });
    const [fetchError, setFetchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const newDate = new Date(tarefa.dataLimite);
            await api.post('/tarefas', {
                nome: tarefa.nome,
                custo: parseFloat(tarefa.custo),
                dataLimite: newDate
            });
            fetchData();
            onClose();
        }catch(error){
            setFetchError(true);
            if (error.response) {
                setErrorMessage(error.response.data.msg);
            } else if (error.request) {
                setErrorMessage('Erro de conexão: Não foi possível conectar ao servidor.');
            } else {
                setErrorMessage('Erro: ' + error.message);
            }
        }
    }

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setTarefa((prevTarefa) => ({
                ...prevTarefa,
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
            required
            />           
            <S.Label htmlFor='custo'>Custo:</S.Label>
            <S.Input 
            name='custo' 
            type='number'
            step="0.01"
            onChange={handleChange}
            required
            />
            <S.Label htmlFor='dataLimite'>Data Limite:</S.Label>
            <S.Input 
            name='dataLimite' 
            type='date'
            onChange={handleChange}
            required
            />
            {fetchError ? (
                <S.ErrorContainer>{errorMessage}</S.ErrorContainer>
            ) : ('')}
            <S.SubmitButton>Criar Tarefa</S.SubmitButton>
        </S.Form>
    )
}

export default FormCriarTarefa;