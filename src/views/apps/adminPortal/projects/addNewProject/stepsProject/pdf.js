// list/tablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
// import pakLogo from '../../../../assets/images/logo/size-2.png'
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"

// define a generatePDF function that accepts a tickets argument
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()
  console.log(sorted)

  let yPos = 20

  doc.setFontSize(24)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Koncept Property Portal", 46, yPos)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 10
//   doc.text("Ground Floor Sami Plaza High Court Road Rawalpindi", 47, 26)
  doc.text("Project Details", 47, yPos)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  yPos += 15

  // define the columns we want and their titles
  const basementTable = ["Label", "Floor Type", "Area", "Parkings"]
  const basementParkingTable = ["Label", "Area", "Price/Sq.Ft", "Total Price", "Bike Parkings", "Car Parkings"]

  // define an empty array of rows
  const basementTableRows = []
  const basementParkingTableRows = []

//   for each ticket pass all its data into an array
  sorted?.basements.forEach(data => {
    const basementTableData = [
        data.label,
        data.floorType,
        !data.area ? data.length * data.width : data.area,
        data.noParkings,
        data.parkings,
    ]
    basementTableRows.push(basementTableData)
  })

  sorted.basements.forEach(data => {
    data.parkings.forEach(newData => {
      const basementParkingTableData = [
        newData.label,
        !newData.area ? newData.length * newData.width : newData.area,
        newData.price,
        !newData.area ? ((newData.length * newData.width) * newData.price) : newData.area,
        newData.bikeParkings,
        newData.carParkings

    ]
    basementParkingTableRows.push(basementParkingTableData)
    })
  })
  doc.autoTable(basementTable, basementTableRows, { startY: yPos })
  yPos += 30
  doc.autoTable(basementParkingTable, basementParkingTableRows, { startY: yPos })

  
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`ProjectDetails_${dateStr}.pdf`)
}

export default generatePDF