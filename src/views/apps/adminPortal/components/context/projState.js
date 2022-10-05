import React, { useState } from 'react'
import projContext from './projContext'

const ProjState = props => {
  const [ProjectAllDetails, setProjectAllDetails] = useState({
    masterDetails: {
      ProjectTitle: 'Default Title',
      developerId: 0,
      cityId: 0,
      areaId: 0,
      startDate: '',
      EndDate: '',
      countFloors: 0,
      countBasements: 0,
      countStages: 8,
      priceShops: '',
      priceHotelSuites: '',
      priceApartments: '',
      priceCorporateOffices: '',
      priceServiceApartments: '',
      priceFoodCourts: '',
      MoreDetails: {
        Others1: 'b',
        Others2: 'c'
      }
    },
    minorDetails: {
      others3: 'd'
    },
    floors: [],
    stages: [
      {
        stageid: 0,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 1,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 2,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 3,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 4,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 5,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 6,
        // id: cont,
        sname: '',
        details: '',
        stageDate: ''
      },
      {
        stageid: 7,
        // id: count,
        sname: '',
        details: '',
        stageDate: ''
      }
    ]
  })
  const [tempShops, settempShops] = useState({
    shops: []
  })

  const [ProjectTitle, setProjectTitle] = useState('')
  const [developerId, setDeveloperId] = useState(1)
  const [cityId, setCityId] = useState('')
  const [areaId, setAreaId] = useState('')

  return (
    <projContext.Provider
      value={{
        ProjectTitle,
        setProjectTitle,
        developerId,
        setDeveloperId,
        cityId,
        setCityId,
        areaId,
        setAreaId,

        ProjectAllDetails,
        setProjectAllDetails
      }}
    >
      {props.children}
    </projContext.Provider>
  )
}
export default ProjState

// {
//   "masterDetails": {
//       "ProjectTitle": "Default Title",
//       "developerId": 0,
//       "cityId": 0,
//       "areaId": 0,
//       "countFloors": 2,
//       "MoreDetails": {
//           "Others1": "b",
//           "Others2": "c"
//       }
//   },
//   "minorDetails": {
//       "others3": "d"
//   },
//   "floors": [
//       {
//           "floorid": 0,
//           "noHotelSuites": 0,
//           "noApartments": 0,
//           "noCorporateOffices": 0,
//           "noParkings": 0,
//           "noShops": 3,
//           "noServiceApartments": 0,
//           "hotelSuites": [],
//           "apartments": [],
//           "corporateOffices": [],
//           "parkings": [],
//           "shops": [
//               {
//                   "shopid": 0,
//                   "ShopLabel": "565"
//               },
//               {
//                   "shopid": 1,
//                   "ShopLabel": "565"
//               }
//           ],
//           "serviceApartments": []
//       },
//       {
//           "floorid": 1,
//           "noHotelSuites": 0,
//           "noApartments": 0,
//           "noCorporateOffices": 0,
//           "noParkings": 2,
//           "noShops": 2,
//           "noServiceApartments": 0,
//           "noFoodCourts": 0,
//           "hotelSuites": [],
//           "apartments": [],
//           "corporateOffices": [],
//           "parkings": [],
//           "shops": [],
//           "serviceApartments": []
//           "foodCourts": []
//       }
//   ]
// }
