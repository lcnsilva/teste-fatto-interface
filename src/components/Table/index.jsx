import * as S from './Table.js'
import tarefas from '../../Tarefas.json'
const Table = () => {



    return (
        <S.Table>
            <S.TableRow>
                <S.TableTitle>
                    Id
                </S.TableTitle>
                <S.TableTitle>
                    Nome 
                </S.TableTitle>
                <S.TableTitle>
                    Custo
                </S.TableTitle>
                <S.TableTitle>
                    Data Limite
                </S.TableTitle>
                <S.TableTitle>
                </S.TableTitle>
                <S.TableTitle>
                </S.TableTitle>
            </S.TableRow>
            {tarefas.map((tarefa) => 
                <S.TableRow key={tarefa.id}>
                    <S.TableData>
                        {tarefa.id}
                    </S.TableData>
                    <S.TableData>
                        {tarefa.nome}
                    </S.TableData>
                    <S.TableData>
                        {tarefa.custo}
                    </S.TableData>
                    <S.TableData>
                        {tarefa.dataLimite}
                    </S.TableData>
                    <S.TableData>
                        <S.EditButton>Editar</S.EditButton>
                    </S.TableData>
                    <S.TableData>
                        <S.DeleteButton>Excluir</S.DeleteButton>
                    </S.TableData>
                </S.TableRow>
            )}
        </S.Table>
    )
}


export default Table;