import PageHeader from "./header"
import { Paper, Box, ImageList, ImageListItem, ImageListItemBar, Divider, Grid } from "@mui/material"
import GridExample from "./Examples/GridExample"

function Examples() {
  return(
  <Box style={{background: "#ffffff", display: "flex", flexDirection: "column"}}>
    <PageHeader/>
      <Box sx={{background:"#ffffff"}} className="content">
      </Box>
      <GridExample/>
  </Box>
  )
} 

export default Examples