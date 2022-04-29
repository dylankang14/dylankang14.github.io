import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Container, Navbar, Nav, Modal, Button } from 'react-bootstrap'
import Home from '../routes/Home'
import Detail from '../routes/Detail'
import Mypage from '../routes/Mypage'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setFav } from '../features/userSlice'

function MyVerticallyCenteredModal(props) {

  const [name, setName] = useState('')
  const arrFav = useSelector(state => state.user.favorite);
  const dispatch = useDispatch();

  const setUser = e => {
    e.preventDefault();
    dispatch(getUser(name));
    localStorage.setItem('user', name)
  }
  const handleChange = e => {
    setName(e.target.value);
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form id='myForm' onSubmit={setUser}>
          <div className='txt-18 bold mb-3'>If you want to make 'Favotie move list', you have to save 'User Name'.</div>
          <div className="form-floating my-2">
            <input type="text" className="form-control" id="user" placeholder='User Name' onChange={handleChange} />
            <label htmlFor="user" value={name} >User Name</label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button type='submit' form='myForm' onClick={props.onHide}>Save User Name</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {

  const userName = localStorage.getItem('user');
  const arrFav = JSON.parse(localStorage.getItem('favorite'));
  const user = useSelector(state => state.user.user);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  console.log(user)

  useEffect(() => {
    if (userName) { dispatch(getUser(userName)); }
    if (arrFav) { dispatch(setFav(arrFav)); }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
          <Container>
            <Navbar.Brand href="/" className='bold'>Movie World</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link></Nav.Link>
              </Nav>
              <Nav>
                {user ?
                  <Navbar.Text as={NavLink} to="/mypage">
                    Hi, <span className='bold text-white likeLink'>{user}</span>
                  </Navbar.Text>
                  : <Navbar.Text>
                    We need <span className='bold text-white likeLink' onClick={() => setModalShow(true)}>User Name</span>
                  </Navbar.Text>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home setModalShow={setModalShow} />} />
          <Route path='/movie/:id' element={<Detail />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
      </Router>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
