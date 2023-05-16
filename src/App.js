import React, { useState } from 'react'

function App() {
  const [image, setImage] = useState(null)
  const [imageProperties, setImageProperties] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader  = new FileReader()
      reader.onload = (e) => {
        const image = new Image()
        
        image.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height

          const ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0)

          const imageData = ctx.getImageData(0,0,image.width, image.height)
          const pixelData = imageData.data

          let width = image.width
          let height = image.height
       
          let pixels = []
          for (let i = 0; i < pixelData.length; i+=4){
            const red = pixelData[i]
            const green = pixelData[i+1]
            const blue = pixelData[i+2]
            pixels.push([red, green, blue])
          }
          setImageProperties({width, height, pixels}) 
        }

        image.src = e.target.result
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <input type='file' accept='image/*'onChange={handleImageUpload}/>
      {imageProperties && (
        <div>
          <img src={image} alt='Upload Image'/>
          <p> Width: {imageProperties.width} </p>
          <p> Height: {imageProperties.height} </p>
          <p> Pixels: </p>
          <ul>
            {imageProperties.pixels.slice(0,10).map((pixel, index) => (
              <li key={index}>
                RGB({pixel[0]}, {pixel[1]}, {pixel[2]})
              </li>
            ))}
          </ul>
        </div>
        )
      }
    </div>
  );
}

export default App;
