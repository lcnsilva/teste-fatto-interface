import { useEffect, useState } from 'react';
import * as S from './Table.js'
import getTarefas from '../../services/getTarefas.js';
import Modal from '../Modal/index.jsx';
import ModalExcluir from '../ModalExcluir/index.jsx';
import ModalUpdate from '../ModalUpdate/index.jsx';
// import tarefas from '../../Tarefas.json'
const Table = () => {

    const [tarefas, setTarefas] = useState([{}]);
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
    const fetchData = async () => {
        console.log('fiz o fetch')
        const tarefasData = await getTarefas();
        setTarefas(tarefasData);
    }
    useEffect(() => {
        fetchData();
    }, [])
 
    return (
        <div>
            <S.Table>
                <S.TableHead>
                    <S.TableRow>
                        <S.TableTitle>ID</S.TableTitle>
                        <S.TableTitle>Nome da tarefa</S.TableTitle>
                        <S.TableTitle>Custo</S.TableTitle>
                        <S.TableTitle>Data Limite</S.TableTitle>
                        <S.TableTitle></S.TableTitle>
                        <S.TableTitle></S.TableTitle>
                    </S.TableRow>
                </S.TableHead>
                <S.TableBody>
                    {tarefas.map((tarefa, index) =>
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
                                {tarefa.dataLimite}
                            </S.TableData>
                            <S.TableData>
                                <S.EditButton onClick={() => {isDelete(tarefa, false)}}>Editar</S.EditButton>
                            </S.TableData>
                            <S.TableData>
                                <S.DeleteButton onClick={() => {isDelete(tarefa, true)}}>Excluir</S.DeleteButton>
                            </S.TableData>
                        </S.TableRow>
                    )}
                    {modalDelete ?
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalExcluir onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData}/>
                        </Modal>
                        :
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalUpdate onClose={() => setIsOpen(false)} tarefa={tarefaOnClick} fetchData={fetchData}/>
                        </Modal>
                    }

                </S.TableBody>
            </S.Table>
        </div>
    )
}


export default Table;