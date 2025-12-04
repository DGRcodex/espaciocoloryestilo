from PIL import Image
import os

def generate_icons():
    # Source image (using the high-res favicon we set earlier)
    source_path = "app/icon.png"
    output_dir = "public/icons"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    sizes = [192, 512]
    
    try:
        with Image.open(source_path) as img:
            # Ensure RGBA
            img = img.convert("RGBA")
            
            for size in sizes:
                # Resize with high quality resampling
                resized = img.resize((size, size), Image.Resampling.LANCZOS)
                output_path = os.path.join(output_dir, f"android-chrome-{size}x{size}.png")
                resized.save(output_path, "PNG")
                print(f"Generated {output_path}")
                
    except Exception as e:
        print(f"Error generating icons: {e}")

if __name__ == "__main__":
    generate_icons()
