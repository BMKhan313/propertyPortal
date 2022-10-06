// ** React Imports
import { useRef, useState, useContext, useEffect } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Finalize from './stepsProject/Finalize'
import FloorDetails from './stepsProject/FloorDetails'
import InFloorDetails from './stepsProject/InFloorDetails'
import PersonalInfo from './stepsProject/PersonalInfo'
import ProjectDetails from './stepsProject/ProjectDetails'

import { FileText } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateWholeObject } from '../../redux/addNewProject/store'

const WizardHorizontal = () => {
  const store = useSelector(state => state.addNewProject)
  const dispatch = useDispatch()

  useEffect(() => {
    if ('RLSProjectAllDetails' in localStorage) {
      dispatch(
        updateWholeObject(
          JSON.parse(window.localStorage.getItem('RLSProjectAllDetails'))
        )
      )
    }
  }, [])

  useEffect(() => {
    try {
      if (store.projectData !== undefined) {
        window.localStorage.setItem(
          'RLSProjectAllDetails',
          JSON.stringify(store.projectData)
        )
      }

      console.log(store.projectData)
    } catch (error) {
      console.log(error, error.message)
    }
  }, [store])

  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'project-details',
      title: 'Project Details',
      subtitle: 'Enter Your Project Details.',
      icon: <FileText size={18} />,
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'floor-details',
      title: 'Floor Details',
      subtitle: 'Add Floor Details',
      content: <FloorDetails stepper={stepper} />
    },
    {
      id: 'floor-full-details',
      title: 'Floor Full Details',
      subtitle: 'Add Floor Full Details',
      content: <FloorDetails stepper={stepper} />
    },
    {
      id: 'Inner-Floor-details',
      title: 'Inner Floor Details',
      subtitle: 'Add shops/Commercial etc Details',
      content: <InFloorDetails stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Finalize',
      subtitle: 'Add Final Details',
      content: <Finalize stepper={stepper} />
    }
  ]

  return (
    <div className='modern-horizontal'>
      <Wizard
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
        ref={ref}
        steps={steps}
      />
    </div>
  )
}

export default WizardHorizontal
