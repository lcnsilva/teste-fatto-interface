import { useEffect, useState } from 'react'
import * as S from './App.js'
import Header from './components/Header/index.jsx'
import Table from './components/Table/index.jsx'
import Footer from './components/Footer/index.jsx'
import Modal from './components/Modal/index.jsx'
import FormCriarTarefa from './components/FormCriarTarefa/index.jsx'
import api from './services/api.js'

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [fetchError, setFetchError] = useState(true);
  const [tarefas, setTarefas] = useState([{}]);
  
  const fetchData = async () => {
    try {
      const tarefasData = await api.get('/tarefas')
      setTarefas(tarefasData.data);
      setFetchError(false);
      console.log(tarefasData);
    } catch (error) {
      setFetchError(true);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <S.Container>
      <Header />
      <S.Wrapper>
          <Table fetchError={fetchError} fetchData={fetchData} tarefas={tarefas}/>
      </S.Wrapper>
      <S.Button onClick={() => setIsOpen(true)} >Incluir Tarefa</S.Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <FormCriarTarefa onClose={() => setIsOpen(false)} fetchData={fetchData}/>
      </Modal>
      <Footer />
    </S.Container>

  )
}

export default App
