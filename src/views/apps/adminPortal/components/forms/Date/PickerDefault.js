// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const PickerDefault = (props) => {
  // ** State
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Label className='form-label' for='default-picker'>
        {props.title}
      </Label>
      <Flatpickr
        className='form-control'
        value={picker}
        onChange={(date) => setPicker(date)}
        id='default-picker'
      />
    </Fragment>
  )
}

export default PickerDefault
