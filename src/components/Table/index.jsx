import { useState } from 'react';
import * as S from './Table.js'
import Modal from '../Modal/index.jsx';
import ModalExcluir from '../ModalExcluir/index.jsx';
import ModalUpdate from '../ModalUpdate/index.jsx';
import api from '../../services/api.js';

const Table = ({ fetchData, fetchError, tarefas }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tarefaOnClick, setTarefaOnClick] = useState({
        id: '',
        nome: '',
        custo: 0,
        dataLimite: '',
        ordemApresentacao: ''
    })

    const decimalPlace = (value) => {
        const newValue = parseFloat(value).toFixed(2);
        return newValue;
    }
    const removeHours = (value) => {
        if (!value) {
            return '';
        }
        return value.split('T')[0];
    }

    const isDelete = (tarefa, value) => {
        setTarefaOnClick(tarefa);
        if(value){
            setModalDelete(true);
            setIsOpen(true);
        }
        if(!value){
            setModalDelete(false);
            setIsOpen(true);
        }
    }

    const moveDown = async (tarefa) =>{
        if(tarefa.ordemApresentacao === tarefas.length){
            console.log('bateu')
        }
        const id = tarefa.id;
        const currentOrdemApresentacao = tarefa.ordemApresentacao;
        const newOrdemApresentacao = tarefa.ordemApresentacao + 1;
        await api.put(`/ordem/${id}`, {
            oldOrdemApresentacao: currentOrdemApresentacao,
            newOrdemApresentacao: newOrdemApresentacao
        })        
        console.log(currentOrdemApresentacao);
        console.log(newOrdemApresentacao);
        fetchData();

    }

    const moveUp = async (tarefa) =>{
        if(tarefa.ordemApresentacao === 1){
            console.log('Não é possível descer essa tarefa.')
            return
        }
        const id = tarefa.id;
        const currentOrdemApresentacao = tarefa.ordemApresentacao;
        const newOrdemApresentacao = tarefa.ordemApresentacao - 1;
        await api.put(`/ordem/${id}`, {
            oldOrdemApresentacao: currentOrdemApresentacao,
            newOrdemApresentacao: newOrdemApresentacao
        })        
        console.log(currentOrdemApresentacao);
        console.log(newOrdemApresentacao);
        fetchData();
    }

    return (
        <div>
            <S.Table>
                <S.TableHead>
                    <S.TableRow>
                        <S.TableTitle>ID</S.TableTitle>
                        <S.TableTitle>Nome da tarefa</S.TableTitle>
                        <S.TableTitle>Custo</S.TableTitle>
                        <S.TableTitle>Data Limite</S.TableTitle>
                        <S.TableTitle colSpan={4}>Funções</S.TableTitle>
                    </S.TableRow>
                </S.TableHead>
                <S.TableBody>
                    {fetchError ? (
                        <S.TableRow>
                            <S.TableData colSpan={6}>Não foi possível carregar as tarefas. Tente novamente mais tarde.</S.TableData>
                        </S.TableRow>
                    ):(
                        tarefas.map((tarefa, index) =>
                            <S.TableRow key={index}>
                                <S.TableData>
                                    {tarefa.id}
                                </S.TableData>
                                <S.TableData>
                                    {tarefa.nome}
                                </S.TableData>
                                <S.TableData>
                                    R$ {decimalPlace(tarefa.custo)}
                                </S.TableData>
                                <S.TableData>
                                    {removeHours(tarefa.dataLimite)}
                                </S.TableData>
                                <S.TableData>
                                    <S.EditButton onClick={() => {isDelete(tarefa, false)}}>Editar</S.EditButton>
                                </S.TableData>
                                <S.TableData>
                                    <S.DeleteButton onClick={() => {isDelete(tarefa, true)}}>Excluir</S.DeleteButton>
                                </S.TableData>
                                <S.TableData>
                                    <S.MoveButton onClick={() => moveUp(tarefa)}>Subir</S.MoveButton>
                                </S.TableData>
                                <S.TableData>
                                    <S.MoveButton onClick={() => moveDown(tarefa)}>Descer</S.MoveButton>
                                </S.TableData>
                            </S.TableRow>
                        )
                    )}
                    {modalDelete ?
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalExcluir onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData}/>
                        </Modal>
                        :
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalUpdate onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData} removeHours={removeHours}/>
                        </Modal>
                    }

                </S.TableBody>
            </S.Table>
        </div>
    )
}


export default Table;