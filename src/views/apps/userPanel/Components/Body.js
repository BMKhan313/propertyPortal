import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Home } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'
import {homes} from '../Data/homesData'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useHistory } from 'react-router-dom'
import InnerBody from './RentDetails/InnerDetails/InnerBody'
import RentDetails from '../Pages/RentDetails'

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }))

const Body = () => {

    const [city, setCity] = useState('Islamabad')
    const history = useHistory()
    

    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
          React.useContext(VisibilityContext)
      
        return (
          <div disabled={isFirstItemVisible} onClick={() => scrollPrev()}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
          >
            <ArrowLeft style={{cursor: 'pointer'}} />
          </div>
        )
      }
      
      function RightArrow() {
        const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
      
        return (
          <div disabled={isLastItemVisible} onClick={() => scrollNext()}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
          >
            <ArrowRight style={{cursor: 'pointer'}} />
          </div>
        )
      }

      function Card({ onClick, selected, title, rent, sale, image }) {
        const visibility = React.useContext(VisibilityContext)
      
        return (
          <div className='body__house__card'>
            <div>
                <img src={image} className="scroller__image" />
                <div>{title}</div>
            </div>

            <hr style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', height: 1, color: '#808080'}} />
            <div className='d-flex justify-content-around w-100'>
                <div className='scroller__bottom'
                onClick={() => history.push('rentDetails')}
                >
                <div className='d-flex align-items-center justify-content-center'>
                    <Home size={18} />
                    <div style={{fontSize: 12, marginLeft: 4}}>{rent}</div>
                </div>
                <div className='houses__type'>On Rent</div>
                </div>

                <div className='scroller__bottom'>
                <div className='d-flex align-items-center'>
                <Home size={18} />
                    <div style={{fontSize: 12, marginLeft: 4}}>{sale}</div>
                </div>
                <div className='houses__type'>For Sale</div>
                </div>

            </div>
          </div>
        )
      }

    const [items, setItems] = useState(getItems)
    const [selected, setSelected] = useState([])
    const [position, setPosition] = useState(0)

    const isItemSelected = (id) => !!selected.find((el) => el === id)

    const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id)

      setSelected((currentSelected) => {
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      }
      )
    }
      

  return (
    <div className='user__body'>
        <Row className='mt-5'>
            <div className='body__section__title'>Top Areas</div>
        </Row>

        <Row>
            <Col className='body__section__buttons'>
            <Button outline onClick={() => setCity('Islamabad')} 
            style={{backgroundColor: city === 'Islamabad' ? '#0000ff80' : '', 
            color: city === 'Islamabad' ? '#fff' : ''
        }}
            >Islamabad</Button>
            <Button outline onClick={() => setCity('Peshawar')}
            style={{backgroundColor: city === 'Peshawar' ? '#0000ff80' : '', 
            color: city === 'Peshawar' ? '#fff' : ''
        }}
            >Peshawar</Button>
            <Button outline onClick={() => setCity('Rawalpindi')}
            style={{backgroundColor: city === 'Rawalpindi' ? '#0000ff80' : '', 
            color: city === 'Rawalpindi' ? '#fff' : ''
        }}
            >Rawalpindi</Button>
            <Button outline onClick={() => setCity('Lahore')}
            style={{backgroundColor: city === 'Lahore' ? '#0000ff80' : '', 
            color: city === 'Lahore' ? '#fff' : ''
        }}
            >Lahore</Button>
            </Col>
        </Row>
        <RentDetails />
        {/* <Row className='body__homes__counter'>
            <Col md={3} className="d-flex align-items-center">
                <div>
                <Home size={24} />
                </div>

                <div className='body__count__homes'>
                For Rent: <div className='body__count__homesss'>7535</div>
                </div>
            </Col>
            
            <Col md={3} className="d-flex align-items-center">
                <div>
                <Home size={24} />
                </div>
                
                <div className='body__count__homes'>
                For Sale: <div className='body__count__homesss'>272</div>
                </div>
            </Col>
        </Row> */}
        {/* <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}
        scrollContainerClassName="scroller"
        >
        {homes.map((home, index) => (
        <Card
          itemId={home.id}
          title={home.location}
          rent={home.countRent}
          sale={home.countSale}
          image={home.image}
          key={home.id}
          onClick={handleClick(home.id)}
          selected={isItemSelected(home.id)}
          
        />
        ))
        }
        </ScrollMenu> */}
    </div>
  )
}

export default Body