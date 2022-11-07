// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as actions from './ActionTypes'
import moment from 'moment'
//a simple date formatting function
const dateFormat = (inputDate, format) => {
  //parse the input date
  const date = new Date(inputDate)

  //extract the parts of the date
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  //replace the month
  format = format.replace('MM', month.toString().padStart(2, '0'))

  //replace the year
  if (format.indexOf('yyyy') > -1) {
    format = format.replace('yyyy', year.toString())
  } else if (format.indexOf('yy') > -1) {
    format = format.replace('yy', year.toString().substr(2, 2))
  }

  //replace the day
  format = format.replace('dd', day.toString().padStart(2, '0'))

  return format
}

export const addProjectSlice = createSlice({
  name: 'addProject',
  initialState: {
    userPanel: {
       cityName: '',
       priceRanges:{
        priceLowRange: 0,
        priceHighRange: 0
       },
       areaRange: 0,
       downPaymentAmount: 0
    },
    projectData: {
      // cityName: 'hariskhan..',
      masterDetails: {
        user_id: 1,
        developerId: 0,
        cityId: 0,
        areaId: 0,
  
        countFloors: 0,
        countBasements: 0,
        countStages: 0,
        countLowerGrounds: 0,
        countMezzanine: 0,
        countGroundFloors: 0,
        approvalStatus: false,
        legalStatus: false,
        countShops: 0,

        projectImages: [],
        projectVideos: [],
        projectPdf: [],
        MoreDetails: {
          Others1: 'b',
          Others2: 'c'
        }
      },
      minorDetails: {
        others3: 'd'
      },
      project_details: {
        project_title: '',
        latitude: 0,
        longitude: 0,

        // land_mark: '',

        startDate: moment(
          Math.round(new Date().setUTCHours(0, 0, 0, 0))
        ).format('D-MMM-YYYY'),
        // startDate: Math.round(new Date().setUTCHours(0, 0, 0, 0)),
        completionDate: moment(
          Math.round(new Date().setUTCHours(0, 0, 0, 0))
        ).format('D-MMM-YYYY')
      },
      floors: [],
      basements: [],
      mezzanine: [],
      groundFloors: [],
      lowerGrounds: [],
      stages: [],
      shops: []
    }
  },
  reducers: {
    updateWholeObject: (state, action) => {
      const projectData = action.payload
      return {
        projectData
      }
      return state
    },
    updateMasterDetails: (state, action) => {
      return {
        ...state,
        projectData: {
          ...state.projectData,
          masterDetails: {
            ...state.projectData.masterDetails,
            [action.payload[1]]: action.payload[0]
          }
        }
      }
      return state
    },
    updateProjectDetails: (state, action) => {
      return {
        ...state,
        projectData: {
          ...state.projectData,
          project_details: {
            ...state.projectData.project_details,
            [action.payload[1]]: action.payload[0]
          }
        }
      }
      return state
    },
    updateNoOfFloorsBasements: (state, action) => {
      let cond = false

      const ind = state.projectData[action.payload[2]].findIndex(
        _item => _item.floorid === action.payload[0] - 1
      )
      if (ind > -1 || action.payload[0] === 0) {
        cond = false
      } else {
        cond = true
      }
      return {
        ...state,
        projectData: {
          ...state.projectData,
          masterDetails: {
            ...state.projectData.masterDetails,
            [action.payload[1]]: action.payload[0]
          },
          ...(cond
            ? {
                [action.payload[2]]: [
                  ...state.projectData[action.payload[2]],
                  {
                    floorid: action.payload[0] - 1,
                    label: `${action.payload[3]}-${action.payload[0]}`,
                    furnishedState: false,
                    noHotelSuites: 0,
                    noApartments: 0,
                    noCorporateOffices: 0,
                    carParkings: 0,
                    bikeParkings: 0,
                    noParkings: 0,
                    noShops: 0,
                    noServiceApartments: 0,
                    noFoodCourts: 0,

                    // priceShops: 0,
                    // priceFoodCourts: 0,
                    // priceCorporateOffices: 0,
                    // priceApartments: 0,
                    // priceServiceApartments: 0,
                    // priceHotelSuites: 0,

                    hotelSuites: [],
                    apartments: [],
                    corporateOffices: [],
                    parkings: [],
                    shops: [],
                    serviceApartments: [],
                    foodCourts: []
                  }
                ]
              }
            : {
                [action.payload[2]]: state.projectData[action.payload[2]].slice(
                  0,
                  -1
                )
              })
        }
      }
      return state
    },

    updateFloorNoOfShopEtc: (state, action) => {
      //  e          action.payload[0]
      // i           action.payload[1],
      // Floorparam  action.payload[2]
      // InnerParam  action.payload[3]
      // Floor/Basement  action.payload[4]
      let cond = false
      const ind = state.projectData[action.payload[4]][action.payload[1]][
        action.payload[3]
      ].findIndex(_item => _item.id === action.payload[0] - 1)
      if (ind > -1 || action.payload[0] === 0) {
        cond = false
      } else {
        cond = true
      }

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [action.payload[4]]: [
            ...state.projectData[action.payload[4]].slice(0, action.payload[1]),
            {
              ...state.projectData[action.payload[4]][action.payload[1]],
              [action.payload[2]]: action.payload[0],
              ...(cond
                ? {
                    [action.payload[3]]: [
                      ...state.projectData[action.payload[4]][
                        action.payload[1]
                      ][action.payload[3]],
                      {
                        id: action.payload[0] - 1,
                        label: `${action.payload[5]}-${action.payload[0]}`,
                        status: 'Available',
                        monthlyPlan: true,
                        quarterPlan: false,
                        qmPlan: false,
                        amPlan: false
                      }
                    ]
                  }
                : {
                    [action.payload[3]]: state.projectData[action.payload[4]][
                      action.payload[1]
                    ][action.payload[3]].slice(0, -1)
                  })
            },
            ...state.projectData[action.payload[4]].slice(action.payload[1] + 1)
          ]
        }
      }
      return state
    },
    updateFloorProperties: (state, action) => {
      //checking if floor exist, but floor exist anyways so check is not needed

      // e,          action.payload[0]
      //'floors/basement'     action.payload[1]
      // , i         action.payload[2]
      // 'floorparam' action.payload[3]

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [action.payload[1]]: [
            ...state.projectData[action.payload[1]].slice(0, action.payload[2]),
            {
              ...state.projectData[action.payload[1]][action.payload[2]],
              [action.payload[3]]: action.payload[0]
            },
            ...state.projectData[action.payload[1]].slice(action.payload[2] + 1)
          ]
        }
      }
    },

    updateFloorInnerProperties: (state, action) => {
      //checking if floor exist, but floor exist anyways so check is not needed

      // e,                action.payload[0]
      //'floors/basement    action.payload[1]
      // , i                action.payload[2]
      // 'floorparam'       action.payload[3]
      // 'floorParamIndex'       action.payload[4]
      // 'innerparam'       action.payload[5]

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [action.payload[1]]: [
            ...state.projectData[action.payload[1]].slice(0, action.payload[2]),
            {
              ...state.projectData[action.payload[1]][action.payload[2]],
              [action.payload[3]]: [
                ...state.projectData[action.payload[1]][action.payload[2]][
                  action.payload[3]
                ].slice(0, action.payload[4]),
                {
                  ...state.projectData[action.payload[1]][action.payload[2]][
                    action.payload[3]
                  ][action.payload[4]],
                  [action.payload[5]]: action.payload[0]
                },
                ...state.projectData[action.payload[1]][action.payload[2]][
                  action.payload[3]
                ].slice(action.payload[4] + 1)
              ]
            },
            ...state.projectData[action.payload[1]].slice(action.payload[2] + 1)
          ]
        }
      }
    },
    updateNoOfStages: (state, action) => {
      let cond = false

      cond = action.payload[3]

      return {
        ...state,
        projectData: {
          ...state.projectData,
          masterDetails: {
            ...state.projectData.masterDetails,

            ...(cond
              ? {
                  [action.payload[1]]:
                    state.projectData.masterDetails[action.payload[1]] - 1
                }
              : {
                  [action.payload[1]]:
                    state.projectData.masterDetails[action.payload[1]] + 1
                })
          },
          ...(cond
            ? {
                [action.payload[2]]: state.projectData[action.payload[2]].slice(
                  0,
                  -1
                )
              }
            : {
                [action.payload[2]]: [
                  ...state.projectData[action.payload[2]],
                  {
                    id: state.projectData.masterDetails[action.payload[1]],
                    idDb: '',
                    stageDate: moment(
                      Math.round(new Date().setUTCHours(0, 0, 0, 0))
                    ).format('LL'),
                    desc: ''
                  }
                ]
              })
        }
      }
      return state
    },
    updateStageProperties: (state, action) => {
      //checking if Stage exist, but floor exist anyways so check is not needed

      // e,          action.payload[0]
      //'Stage'     action.payload[1]
      // , i         action.payload[2]
      // 'stageParam' action.payload[3]

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [action.payload[1]]: [
            ...state.projectData[action.payload[1]].slice(0, action.payload[2]),
            {
              ...state.projectData[action.payload[1]][action.payload[2]],
              [action.payload[3]]: action.payload[0]
            },
            ...state.projectData[action.payload[1]].slice(action.payload[2] + 1)
          ]
        }
      }
    },
    //
    getValuesFromUserFilter: (state = initialState, action) => {
       return {
        ...state,
        userPanel:{
          ...state.userPanel,
          cityName: action.payload.cityName,
          
        },
       }
    },
   getPriceRangesFromFilter: (state = initialState, action) => {
        return{
          ...state,
          userPanel: {
            ...state.userPanel,
            priceRanges: {
              ...state.userPanel.priceRanges,
              priceLowRange: action.payload.priceLowRange,
              priceHighRange: action.payload.priceHighRange
            }
          }
        }
   } ,
  getAreaRanges: (state = initialState, action) => {
    return {
     ...state,
     userPanel:{
       ...state.userPanel,
       areaRange: action.payload.areaRange
       
     },
    }
 },
 getDownPaymentAmount: (state = initialState, action) => {
  return {
   ...state,
   userPanel:{
     ...state.userPanel,
     downPaymentAmount: action.payload.downPaymentAmount
     
   },
  }
}
    
  }
})

export const {
  updateMasterDetails,
  updateWholeObject,
  updateNoOfFloorsBasements,
  updateFloorNoOfShopEtc,
  updateFloorProperties,
  updateFloorInnerProperties,
  updateNoOfStages,
  updateProjectDetails,
  updateStageProperties,
  getValuesFromUserFilter,
  getPriceRangesFromFilter,
  getAreaRanges,
  getDownPaymentAmount
} = addProjectSlice.actions
export default addProjectSlice.reducer