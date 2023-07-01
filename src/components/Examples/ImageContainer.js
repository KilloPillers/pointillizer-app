import { Paper, ImageList, ImageListItem, ImageListItemBar, Divider } from "@mui/material"
import "./Examples.css"

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

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
      col: 1,
      row: 1
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      cols: 2,
      rows: 3
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      cols: 1,
      rows: 2
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      cols: 1,
      rows: 2
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      cols: 1,
      rows: 1
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      cols: 3,
      rows: 1
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      cols: 1,
      rows: 1
    },]
  }

  return (
    <Paper sx={{background: "#4591DB", width: "70%", height: "auto", padding:"10px", margin:"20px"}} elevation={16}>
      <ImageList variant="quilted" cols={4} rowHeight={"25%"}>
        {itemData.images.map((item) => (
          <ImageListItem  key={item.img} cols={item.cols} rows={item.rows}>
            <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
          </ImageListItem>
        ))}
      </ImageList>
      <h3 style={{fontSize:"10px"}}>Image Source: </h3>
    </Paper>
  )
}

export default ImageContainer