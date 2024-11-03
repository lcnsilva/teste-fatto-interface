import { useState } from 'react';
import * as Styled from './Table.js'
import Modal from '../Modal/index.jsx';
import ModalExcluir from '../ModalExcluir/index.jsx';
import ModalUpdate from '../ModalUpdate/index.jsx';
import api from '../../services/api.js';
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import upIcon from '../../assets/up-arrow.svg'
import downIcon from '../../assets/down-arrow.svg'



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
        if (value) {
            setModalDelete(true);
            setIsOpen(true);
        }
        if (!value) {
            setModalDelete(false);
            setIsOpen(true);
        }
    }

    const moveDown = async (tarefa, index) => {
        if (tarefa.ordemApresentacao === tarefas.length) {
            console.log('Não é possível subir mais essa tarefa.')
            return
        }
        const id = tarefa.id;
        const currentOrdemApresentacao = tarefa.ordemApresentacao;
        const newOrdemApresentacao = tarefas[index + 1].ordemApresentacao;
        await api.put(`/ordem/${id}`, {
            oldOrdemApresentacao: currentOrdemApresentacao,
            newOrdemApresentacao: newOrdemApresentacao
        })
        fetchData();
    }

    const moveUp = async (tarefa, index) => {
        if (tarefa.ordemApresentacao === 1) {
            console.log('Não é possível descer mais essa tarefa.')
            return
        }
        const id = tarefa.id;
        const currentOrdemApresentacao = tarefa.ordemApresentacao;
        const newOrdemApresentacao = tarefas[index - 1].ordemApresentacao;
        await api.put(`/ordem/${id}`, {
            oldOrdemApresentacao: currentOrdemApresentacao,
            newOrdemApresentacao: newOrdemApresentacao
        })
        fetchData();
    }
    return (
        <div>
            <Styled.Table>
                <Styled.TableHead>
                    <Styled.TableRow>
                        <Styled.TableTitle>ID</Styled.TableTitle>
                        <Styled.TableTitle>Nome da tarefa</Styled.TableTitle>
                        <Styled.TableTitle>Custo</Styled.TableTitle>
                        <Styled.TableTitle>Data Limite</Styled.TableTitle>
                        <Styled.TableTitle colSpan={4}>Funções</Styled.TableTitle>
                    </Styled.TableRow>
                </Styled.TableHead>
                <Styled.TableBody>
                    {fetchError ? (
                        <Styled.TableRow>
                            <Styled.TableData colSpan={6}>Não foi possível carregar as tarefas. Tente novamente mais tarde.</Styled.TableData>
                        </Styled.TableRow>
                    ) : (
                        tarefas.map((tarefa, index) =>
                            <Styled.TableRow key={tarefa.id} style={{ backgroundColor: tarefa.custo >= 1000 ? '#f2cc8f' : '#FFFFFF' }}>
                                <Styled.TableData>
                                    {tarefa.id}
                                </Styled.TableData>
                                <Styled.TableData>
                                    {tarefa.nome}
                                </Styled.TableData>
                                <Styled.TableData>
                                    R$ {decimalPlace(tarefa.custo)}
                                </Styled.TableData>
                                <Styled.TableData>
                                    {removeHours(tarefa.dataLimite)}
                                </Styled.TableData>
                                <Styled.TableData>
                                    <Styled.EditButton onClick={() => { isDelete(tarefa, false) }}>
                                        <Styled.Icon src={editIcon} />
                                    </Styled.EditButton>
                                </Styled.TableData>
                                <Styled.TableData>
                                    <Styled.DeleteButton onClick={() => { isDelete(tarefa, true) }}>
                                        <Styled.Icon src={deleteIcon} />
                                    </Styled.DeleteButton>
                                </Styled.TableData>
                                <Styled.TableData>
                                    <Styled.MoveButton onClick={() => moveUp(tarefa, index)}>
                                        <Styled.Icon src={upIcon} />
                                    </Styled.MoveButton>
                                </Styled.TableData>
                                <Styled.TableData>
                                    <Styled.MoveButton onClick={() => moveDown(tarefa, index)}>
                                        <Styled.Icon src={downIcon} />
                                    </Styled.MoveButton>
                                </Styled.TableData>
                            </Styled.TableRow>
                        )
                    )}
                    {modalDelete ?
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalExcluir onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData} />
                        </Modal>
                        :
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalUpdate onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData} removeHours={removeHours} />
                        </Modal>
                    }

                </Styled.TableBody>
            </Styled.Table>
        </div>
    )
}


export default Table;