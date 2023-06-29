import { Paper, ImageList, ImageListItem, ImageListItemBar, Divider } from "@mui/material"
import "./Examples.css"

function ImageContainer() {
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
    images: [{
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Input',
      author: '@bkristastucchio',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Output',
      author: '@rollelflex_graphy726',
    }]
  }

  return (
  <div className="image-container">
    <Paper sx={{background: "#4591DB", width: "60%", height: "%100"}} elevation={16} className="images">
      <ImageList sx={{ width: "60%", height: "%100" }}>
        {itemData.images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{textAlign:"center"}}
              title={item.title}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  </div>
  )
}

export default ImageContainer