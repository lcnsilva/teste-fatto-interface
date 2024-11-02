import * as S from './Modal.js'
import ReactDom from 'react-dom'

const Modal = ({ open, children, onClose }) => {
    if(!open) return null

    return ReactDom.createPortal(
        <div>
            <S.Overlay onClick={onClose}></S.Overlay>
            <S.ModalContainer>
                { children }
            </S.ModalContainer>
        </div>,
        document.getElementById('portal')
    )
}

export default Modal;