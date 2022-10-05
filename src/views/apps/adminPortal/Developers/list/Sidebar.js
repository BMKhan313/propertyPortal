// ** React Import
import { useState, useEffect } from 'react'

// ** Axios Imports
import Axios from 'axios'

// Base URL
import baseURL from '../../../../../baseURL/baseURL'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

import { toast } from 'react-toastify'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  first_name: '',
  last_name: '',
  city_id: null,
  address: '',
  age: '',
  phone: '',
  website_link: '',
  gender: null,
  Province: null
}

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' }
]
const checkIsValid = data => {
  return Object.values(data).every(field =>
    (typeof field === 'object' ? field !== null : field.length > -1)
  )
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [cities, setCities] = useState([])
  const [province, setProvince] = useState([])
  const [citySelected, setCitySelected] = useState()
  const [provinceSelected, setProvinceSelected] = useState()
  const [gender, setGender] = useState(2)

  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const addDeveloper = data => {
    console.log('submit', data)
    if (data === null) {
      toast('Fill out fields correctly!')
    } else {
      fetch(`${baseURL}/postDeveloper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer 5|6jkglYPjqEJy0ZLc4bK33KhG1qPJXlfyR800Ozdg`
        },
        // mode: 'no-cors',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          if (data.Message === 'Record Stored') {
            toast('develper saved successfully!', data)
          } else {
            toast('develper did not add, Please try again ', data)
          }
        })
        .catch(err => {
          console.log('ERROR :2:3:4: ', err)
        })
    }
    setTimeout(() => {
      // setIsButtonDisabled(false)
    }, 3000)
  }

  // ** Function to handle form submit
  const onSubmit = data => {
    // setData(data)
    addDeveloper(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      toast('Validation OKAY!')
    } else {
      toast('Validation error!')

      for (const key in data) {
        if (data[key] === null) {
          setError(key, {
            type: 'manual'
          })
        }

        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getProvince`)

      .then(response => {
        const rec = response.data.AllProvince.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setProvince(rec)

        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const GetCity = e => {
    Axios.get(`${baseURL}/showcity?province_id=${e}`)

      .then(response => {
        const rec = response.data.City.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setCities(rec)

        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='fullName'>
            first Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='first_name'
            control={control}
            render={({ field }) => (
              <Input
                id='first_name'
                placeholder='John Doe'
                invalid={errors.first_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='username'>
            last_name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='last_name'
            control={control}
            render={({ field }) => (
              <Input
                id='last_name'
                placeholder='johnDoe99'
                invalid={errors.last_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            Email <span className='text-danger'>*</span>
          </Label>
          {/* <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText> */}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='contact'>
            Contact <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input
                id='phone'
                placeholder='(+92) 1234567890'
                invalid={errors.phone && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='company'>
            age <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='age'
            control={control}
            render={({ field }) => (
              <Input
                id='age'
                placeholder='Company Pvt Ltd'
                invalid={errors.age && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='company'>
            address <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <Input
                id='address'
                placeholder='Company Pvt Ltd'
                invalid={errors.address && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='company'>
            Website Link <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='website_link'
            control={control}
            render={({ field }) => (
              <Input
                id='website_link'
                placeholder='Company Pvt Ltd'
                invalid={errors.website_link && true}
                {...field}
              />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='country'>
            Province <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='Province'
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                id='Province'
                isClearable={false}
                classNamePrefix='select'
                options={province}
                theme={selectThemeColors}
                onChange={val => {
                  onChange(val.value)
                  GetCity(val.id)
                }}
                value={province.find(c => c.value === value)}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.Province === null
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='city_id'>
            City <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='city_id'
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={cities}
                theme={selectThemeColors}
                value={cities.find(c => c.value === value)}
                //  onChange={e => setCitySelected(e.id)}
                onChange={val => onChange(val.value)}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.City === null
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='country'>
            gender <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gender'
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={genderOptions}
                theme={selectThemeColors}
                value={genderOptions.find(c => c.value === value)}
                //  onChange={e => setCitySelected(e.id)}
                onChange={val => onChange(val.value)}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.gender === null
                })}
                {...field}
              />
            )}
          />
        </div>

        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
