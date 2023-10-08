import React, {useState,useEffect} from 'react'
import CommonSection from '../shared/commonSection'
import './tours.css'
import { Container,Row,Col } from 'reactstrap'
import TourCard from './../shared/tourCard'
import SearchBar from './../shared/searchbar'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utills/config'

const Tours = () => {

  const [pageCount, setPageCount]=useState(0)
  const [page,setPage]=useState(0)
  const {data:tours,loading,error}=useFetch(`${BASE_URL}/tours?page=${page}`);
  const {data:tourCount}=useFetch(`${BASE_URL}/tours/search/getTourCount`);
  // console.log(tourCount);

  useEffect(()=>{
    const pages = Math.ceil(tourCount/8);
    setPageCount(pages);
    window.scrollTo(0,0)
  },[page,tourCount,tours]);

  return (
    <>
      <CommonSection title={"All Tours"}/>
      <section>
        <Container>
          <Row>
            <SearchBar/>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading......</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {
            !loading && !error && <Row>
            {tours?.map(tour=> (
              <Col lg='3'className='mb-4' key={tour.id}>
              <TourCard tour={tour}/>
              </Col>
              )) }
              <Col lg='12'>
                <div className="tourpage d-flex align-items-center justify-content-center mt-4 gap-3 ">
                  {[...Array(pageCount).keys()].map(number=>
                    (
                      <span key={number} onClick={()=> 
                      setPage(number)} className={page===number ? "active_page": " "}>
                          {number+1}
                      </span>
                    ))}
                </div>
              </Col>
          </Row>
          }
        </Container>
      </section>
    </>
  )
}

export default Tours
