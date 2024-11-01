import * as S from './App.js'
import Header from './components/Header/index.jsx'
import Table from './components/Table/index.jsx'

function App() {
  return (
    <S.Container>
      <Header />
      <S.Wrapper>
          <Table />
      </S.Wrapper>
    </S.Container>

  )
}

export default App
