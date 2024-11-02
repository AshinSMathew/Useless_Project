from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

def count_holes(image):
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Adaptive thresholding for better hole detection
    binary = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 11, 2)

    # Morphological operations to remove small artifacts
    kernel = np.ones((3, 3), np.uint8)
    binary = cv2.erode(binary, kernel, iterations=2)
    binary = cv2.dilate(binary, kernel, iterations=2)

    # Find contours
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Filter and count only genuine holes
    holes = [contour for contour in contours if cv2.contourArea(contour) > 20]
    holes_count = len(holes)
    
    # Draw contours on the original image for visualization
    output_image = image.copy()
    cv2.drawContours(output_image, holes, -1, (0, 255, 0), 2)  # Draw contours in green
    
    # Save or display the image to cross-check
    cv2.imwrite("output_with_contours.jpg", output_image)
    # cv2.imshow("Holes", output_image)
    # cv2.waitKey(0)
    
    return holes_count

@app.route('/count_holes', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    # Read the image in OpenCV format
    file_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    # Count holes in the appam image
    holes_count = count_holes(image)
    
    return jsonify({"holes_count": holes_count})

if __name__ == '__main__':
    app.run(debug=True)
