import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getMovies } from '../features/movieSlice'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Container, Carousel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import axios from "axios";
import { getFav, delFav } from "../features/userSlice";


export default function Home({ setModalShow }) {
  const { movies, loading } = useSelector(state => state.movies);
  const arrFav = useSelector(state => state.user.favorite);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [titleMovie, setTitleMovie] = useState([]);
  const addFav = (e, itemFav) => {
    e.preventDefault();
    dispatch(getFav(itemFav));
  }
  const removeFav = (e, itemFav) => {
    e.preventDefault();
    dispatch(delFav(itemFav));
  }
  console.log(arrFav)

  useEffect(() => {
    dispatch(getMovies())
      .unwrap()
      .then(console.log(movies));
    axios.get('https://yts.mx/api/v2/list_movies.json?limit=3&minimum_rating=9&sort_by=rating')
      .then(res => setTitleMovie(res.data.data.movies));
  }, [])

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
        <Carousel className="mb-4">
          {titleMovie.map((movie, i) => {
            return (
              <Carousel.Item key={i}>
                <div className="bgCarousel" style={{ background: `url(${movie.background_image}) center /cover` }}></div>
                <Row className="p-5 justify-content-center align-items-center">
                  <Col xs={10} md={5} xl="auto" className="mr-md-4">
                    <img
                      className="d-block img-fluid boxShadow"
                      src={movie.large_cover_image}
                      alt="First slide"
                    />
                  </Col>
                  <Col xs={10} md={5} lg={6} xxl="auto" className="mxw-50">
                    <div className="txt-26 bold">{movie.title}</div>
                    <div className="txt-18 fw-500">- {movie.year}</div>
                    <div className="pt-2 pt-md-5">
                      <div className="txt-20"><i className="bi bi-star-fill"></i> {movie.rating} <span className="txt-16 fw-500">/ 10</span></div>
                      <div className="txt-20 mb-3"><i className="bi bi-stopwatch-fill"></i> {movie.runtime} mins</div>
                      <Button variant="outline-light bold"> <Link to={`/movie/${movie.id}`}> See Detail <i className="bi bi-arrow-right"></i> </Link></Button>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            )
          })}
        </Carousel>
        <Container>
          <Row xs={1} md={2} lg={3} xxl={4} className="g-3 pb-4">
            {movies.map(movie => {
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
            })}
          </Row>
        </Container>
      </div >
    )
  }

}