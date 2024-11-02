import { useState } from 'react'
import * as S from './Form.js'
import createTarefa from '../../services/createTarefa.js'

const FormCriarTarefa = ({ onClose }) => {

    const [tarefa, setTarefa] = useState({
        nome: '',
        custo: 0,
        dataLimite:''
    })

    const handleSubmit = async (e) => {
        console.log(tarefa)
        e.preventDefault();
        const data = await createTarefa(tarefa);
        if(data === undefined){
            console.log("Erro ao criar tarefa")
        }
        if(data === 406){
            console.log('TAREFA JA EXISTEEEEEEEEEEE ')
        }
        if(data === 201){
            console.log('Tarefa criada com sucesso');
            onClose();
        }

        //VER O PORQUE ELE TA SALVANDO TEMPO E NÃO SÓ A DATA
    }

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setTarefa((prevTarefa) => ({
                ...prevTarefa,
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
            {/*CRIAR CAMPO DE ERRO AQUI*/}
            <S.SubmitButton>Criar Tarefa</S.SubmitButton>
        </S.Form>
    )
}

export default FormCriarTarefa;