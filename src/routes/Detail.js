import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFav, delFav } from "../features/userSlice";

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const arrFav = useSelector(state => state.user.favorite);
  const dispatch = useDispatch();
  console.log(arrFav)
  const addFav = (itemFav) => {
    dispatch(getFav(itemFav));
  }
  const removeFav = (itemFav) => {
    dispatch(delFav(itemFav));
  }



  useEffect(() => {
    axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then(res => setDetail(res.data.data.movie));
  }, [])


  return (
    <div className="detail">
      <div className="bgImage" style={{ background: `url(${detail.background_image}) center /cover` }}></div>
      <Row className="justify-content-center align-items-center py-4">
        <Col xs='auto' md={5} className="text-center mb-4 mb-md-0">
          <div className="inDetail">
            <div className="bookMark">
              {arrFav.includes(detail.id) ?
                <i className="bi bi-bookmark-heart-fill text-danger"></i>
                : <i className="bi bi-bookmark text-white"></i>
              }
            </div>
            <Image src={detail.large_cover_image} fluid={true} className='boxShadow'></Image>
          </div>
        </Col>
        <Col xs={10} md={6} className="">
          <div className="d-flex flex-column justify-content-between align-items-start">
            <div className="txt-28 bold mb-1">{detail.title}</div>
            <div>- {detail.year} -</div>
            <div className="mb-3">{detail?.genres?.join(' / ')}</div>
            <div className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="justify-self-end">
              <div className="txt-20"><i className="bi bi-star-fill"></i> {detail.rating} <span className="txt-16 fw-500">/ 10</span></div>
              <div className="txt-20 mb-3"><i className="bi bi-stopwatch-fill"></i> {detail.runtime} mins</div>
              {arrFav.includes(detail.id) ?
                <Button variant="outline-light bold" onClick={() => { removeFav(detail.id) }}>
                  <i className="bi bi-heart-fill"></i> Remove this in favorite movie?
                </Button>
                : <Button variant="outline-light bold" onClick={() => { addFav(detail.id) }}>
                  <i className="bi bi-heart-fill"></i> Add your favorite movie?
                </Button>
              }
            </div>
          </div>
        </Col>

      </Row>
    </div >
  )
}