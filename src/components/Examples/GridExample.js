import { Paper, ImageList, ImageListItem, ImageListItemBar, Divider } from "@mui/material"
import ImageContainer from "./ImageContainer"
import "./Examples.css"

function GridExample() {
  const itemData = {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
    Donec dui lectus, sagittis et sapien nec, mollis posuere mi. Integer commodo \
    tempus porta. Aliquam et eros sit amet lorem viverra luctus. Fusce imperdiet \
    velit consectetur nibh sodales posuere. Vestibulum eget rutrum lectus. Donec \
    ornare lorem nec arcu pellentesque varius. Nulla scelerisque, neque id porta \
    posuere, magna ipsum feugiat sapien, vel mattis lorem est sed sapien. Aenean \
    aliquam pretium leo, elementum luctus ex gravida nec. Suspendisse potenti. \
    Curabitur gravida sapien elit, quis tempor enim convallis nec. Fusce metus velit, \
    vestibulum ac congue in, ornare nec risus. Aliquam erat volutpat.", 
  }

  return (
    <div className="item">
      <div elevation={4} sx={{background: "#4591DB"}} className="description">
        <Paper elevation={4} sx={{background: "#4591DB"}}>
          <h1>{itemData.title}</h1>
        </Paper>
        <Paper elevation={4} sx={{background: "#4591DB"}}>
          <h3>{itemData.description}</h3>
        </Paper>
      </div>
      <ImageContainer/>
    </div>
  )
}

export default GridExample