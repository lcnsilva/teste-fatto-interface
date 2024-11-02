import { useEffect, useState } from 'react';
import * as S from './ModalUpdate.js'
import updateTarefa from '../../services/updateTarefa.js';

const ModalUpdate = ({ onClose, tarefa, fetchData}) => {

    const [newTarefa, setNewTarefa] = useState({
        id: '',
        nome: '',
        custo: 0,
        dataLimite:''
    })

    useEffect(() => {
        if (tarefa) {
            const novaData = tarefa.dataLimite.split('T')[0]; //GAMBIARRA POIS O VALOR SALVO NO BANCO DE DADOS ESTÁ ERRADO.
            setNewTarefa({
                id: tarefa.id,
                nome: tarefa.nome,
                custo: tarefa.custo,
                dataLimite: novaData
            });
        }
    }, [tarefa])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newTarefa);
        const status = await updateTarefa(newTarefa);
        if(status === 406){
            console.log('TAREFA JA EXISTEEEEEEEEEEE ')
        }
        if(status === 200){
            console.log('Tarefa atualizada com sucesso');
            fetchData();
            onClose();
        }
    }

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setNewTarefa((prevNewTarefa) => ({
                ...prevNewTarefa,
                [name]: value
            }));
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
            {/*CRIAR CAMPO DE ERRO AQUI*/}
            <S.SubmitButton>Atualizar Tarefa</S.SubmitButton>
        </S.Form>
    )
}

export default ModalUpdate;