import ProjectMediaPictures from './ProjectMediaPictures'
import ProjectMediaVideos from './ProjectMediaVideos'
import ProjectMediaPdf from './ProjectMediaPdf'
import PaymentPlan from './PaymentPlan'
import FloorPlan from './FloorPlan'
// import FileUploaderMultiple from '../../../../components/forms/FileUploader/FileUploaderMultiple'

const ProjectMedia = () => {
  return (
    <div>
      <ProjectMediaPictures />
      <ProjectMediaVideos />
      <ProjectMediaPdf />
      <PaymentPlan />
      <FloorPlan />
      {/* <FileUploaderMultiple /> */}
    </div>
  )
}
export default ProjectMedia
