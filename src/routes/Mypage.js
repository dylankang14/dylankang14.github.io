import { useSelector, useDispatch } from "react-redux"
import { getMovies } from '../features/movieSlice'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Container, Carousel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getFav, delFav } from "../features/userSlice";


export default function Home({ setModalShow }) {
  const { movies, loading } = useSelector(state => state.movies);
  const arrFav = useSelector(state => state.user.favorite);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const addFav = (e, itemFav) => {
    e.preventDefault();
    dispatch(getFav(itemFav));
  }
  const removeFav = (e, itemFav) => {
    e.preventDefault();
    dispatch(delFav(itemFav));
  }

  console.log(arrFav)

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-white m-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="text-white txt-24 bold">Now Loading...</div>
      </div>
    )
  }
  if (!loading && movies) {
    return (
      <div>
        <Container>
          <div className="txt-24 text-white py-4 text-center mb-2">
            <span className="txt-28 bold underline"><u>{user}</u></span>'s Favorite Movie List
          </div>
          <Row xs={1} md={2} lg={3} xxl={4} className="g-3 pb-4">
            {movies.map(movie => {
              if (arrFav.includes(movie.id)) {
                return (
                  <Col key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <Card className='h-100'>
                        <div className="bookMark" >
                          {arrFav.includes(movie.id) ?
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove this favorite movie?</Tooltip>}>
                              <i className="bi bi-bookmark-heart-fill text-danger" onClick={e => { removeFav(e, movie.id) }}></i>
                            </OverlayTrigger>
                            : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Your favorite movie?</Tooltip>}>
                              {user ?
                                <i className="bi bi-bookmark text-white" onClick={e => { addFav(e, movie.id) }}></i>
                                : <i className="bi bi-bookmark text-white" onClick={e => { e.preventDefault(); setModalShow(true) }}></i>
                              }
                            </OverlayTrigger>
                          }

                        </div>
                        <Card.Img variant="top" src={movie.medium_cover_image} />
                        <Card.Body>
                          <Card.Title>{movie.title} <div className="mt-1 fw-500 txt-16"> - {movie.year}</div></Card.Title>
                          <div>
                            <div>{movie.genres.join(' / ')}</div>
                            <div><i className="bi bi-star-fill"></i> {movie.rating} <span className="txt-16 fw-500">/ 10</span></div>
                            <div><i className="bi bi-stopwatch-fill"></i> {movie.runtime === 0 ? 'No Time info' : movie.runtime + ' mins'}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );

              }
            })}
          </Row>
        </Container>
      </div >
    )
  }

}