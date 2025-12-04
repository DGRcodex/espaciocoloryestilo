from PIL import Image
import sys

def crop_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        # Convert to RGBA to handle transparency if present, or RGB if not
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-zero regions
        # For a white background JPG, we might need to treat white as transparent
        # But let's first try standard getbbox which works on alpha channel or black background usually?
        # Actually getbbox() works on the *non-zero* data. 
        # If it's a JPG with white background, pixels are (255,255,255).
        
        # Let's try to detect if it's white background and make it transparent or just crop white.
        bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
        diff =  Image.frombytes(mode='1', size=img.size, data=img.tobytes()) # This is wrong
        
        # Better approach:
        # Convert to grayscale, invert if background is white, then getbbox?
        # Let's assume white background since it was a JPG.
        
        gray = img.convert("L")
        # Threshold to find "content" (darker than white)
        # Invert so content is bright and bg is dark
        from PIL import ImageOps
        inverted = ImageOps.invert(gray)
        
        bbox = inverted.getbbox()
        
        if bbox:
            cropped = img.crop(bbox)
            # Resize to square if needed? Favicons are usually square.
            # Let's keep aspect ratio but center it in a square?
            # Or just save the cropped version. Browser will scale it.
            # But if it's not square, it might look distorted or small again.
            
            # Let's make it square by adding padding to the smaller dimension
            w, h = cropped.size
            size = max(w, h)
            new_img = Image.new("RGBA", (size, size), (255, 255, 255, 0)) # Transparent bg
            
            # Center it
            x = (size - w) // 2
            y = (size - h) // 2
            new_img.paste(cropped, (x, y))
            
            new_img.save(output_path)
            print(f"Cropped and saved to {output_path}")
        else:
            print("No content found to crop.")
            
    except Exception as e:
        print(f"Error: {e}")

crop_image("app/icon.png", "app/icon.png")
