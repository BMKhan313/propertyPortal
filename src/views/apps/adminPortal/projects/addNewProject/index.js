// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

import AddNewProject from './AddNewProject'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

const NewProject = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle='Add New Project'
        breadCrumbParent='Projects'
        breadCrumbActive='Add New'
      />
      <Row>
        <Col sm='12'>
          <AddNewProject />
        </Col>
        <Col sm='12'></Col>
        <Col sm='12'></Col>
        <Col sm='12'></Col>
      </Row>
    </Fragment>
  )
}
export default NewProject
