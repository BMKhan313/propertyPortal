// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive
} from 'react-feather'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      'light-success',
      'light-danger',
      'light-warning',
      'light-info',
      'light-primary',
      'light-secondary'
    ],
    color = states[stateNum]

  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        color={color || 'primary'}
        className='me-1'
        content={row.fullName || 'John Doe'}
        initials
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`}
      />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'id',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.id
    // cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  },
  {
    name: 'first_name',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.first_name
  },
  {
    name: 'last_name',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.last_name
  },
  {
    name: 'phone',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.phone
  },
  {
    name: 'gender',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.gender
  },
  {
    name: 'age',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.age
  },
  {
    name: 'address',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.address
  },
  {
    name: 'website_link',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.website_link
  },

  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => e.preventDefault()}
            >
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
