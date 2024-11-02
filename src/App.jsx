import { useState } from 'react'
import * as S from './App.js'
import Header from './components/Header/index.jsx'
import Table from './components/Table/index.jsx'
import Footer from './components/Footer/index.jsx'
import Modal from './components/Modal/index.jsx'
import FormCriarTarefa from './components/FormCriarTarefa/index.jsx'

function App() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.Container>
      <Header />
      <S.Wrapper>
          <Table />
      </S.Wrapper>
      <S.Button onClick={() => setIsOpen(true)}>Incluir Tarefa</S.Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <FormCriarTarefa onClose={() => setIsOpen(false)}/>
      </Modal>
      <Footer />
    </S.Container>

  )
}

export default App
