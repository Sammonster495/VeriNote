from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import matplotlib.pyplot as plt
import numpy as np
from skimage.metrics import structural_similarity as ssim

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    image = request.files.get('image')

    if not image:
        return jsonify({'error': 'No file provided'}), 400
    
    bytes = image.read()
    f = cv2.imdecode(np.frombuffer(bytes, np.uint8), cv2.IMREAD_COLOR)

    real = cv2.imread('real_500.jpg')
    fake = cv2.resize(f, (real.shape[1], real.shape[0]))
    a = cv2.cvtColor(real, cv2.COLOR_BGR2GRAY)
    p = cv2.cvtColor(fake, cv2.COLOR_BGR2GRAY)
    a2_str = a[30:160, 222:245]
    p2_str = p[30:160, 222:245]
    hsvImageReal = cv2.cvtColor(real, cv2.COLOR_BGR2HSV)

    hsvImageFake = cv2.cvtColor(fake, cv2.COLOR_BGR2HSV)
    croppedImageReal = hsvImageReal[30:160, 222:245]
    croppedImageFake = hsvImageFake[30:160, 222:245]
    satThresh = 0.3
    valThresh = 0.9

    g = croppedImageReal[:,:,1]>satThresh
    h = croppedImageReal[:,:,2] < valThresh
    
    g1 = croppedImageFake[:,:,1]>satThresh
    h1 = croppedImageFake[:,:,2] < valThresh

    BWImageReal = g&h
    BWImageFake = g1&h1
    def bwareaopen(img, min_size, connectivity=8):
    
        # Find all connected components (called here "labels")
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(
            img, connectivity=connectivity)
        
        # check size of all connected components (area in pixels)
        for i in range(num_labels):
            label_size = stats[i, cv2.CC_STAT_AREA]
            
            # remove connected components smaller than min_size
            if label_size < min_size:
                img[labels == i] = 0
                
        return img
    binr = cv2.threshold(a2_str, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
    
    # define the kernel
    kernel = np.ones((3, 3), np.uint8)
    
    # invert the image
    invert = cv2.bitwise_not(binr)
    
    # use morph gradient
    BWImageCloseReal = cv2.morphologyEx(invert, cv2.MORPH_GRADIENT, kernel)
    binr2 = cv2.threshold(p2_str, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
    
    # define the kernel
    kernel2 = np.ones((3, 3), np.uint8)
    
    # invert the image
    invert2 = cv2.bitwise_not(binr2)
    
    # use morph gradient
    BWImageCloseFake = cv2.morphologyEx(invert2, cv2.MORPH_GRADIENT, kernel2)
    areaopenReal = bwareaopen(BWImageCloseReal, 15);

    areaopenFake = bwareaopen(BWImageCloseFake, 15);
    # Get the stats of the connected components
    _, _, statsReal, _ = cv2.connectedComponentsWithStats(areaopenReal)
    _, _, statsFake, _ = cv2.connectedComponentsWithStats(areaopenFake)

    # Get the sizes of the largest connected component (excluding the background)
    maxSizeReal = np.max(statsReal[1:, cv2.CC_STAT_AREA])
    maxSizeFake = np.max(statsFake[1:, cv2.CC_STAT_AREA])
    def corr2(A, B):
        A_mA = A - A.mean(1)[:, None]
        B_mB = B - B.mean(1)[:, None]
    
        # Sum of squares across rows
        ssA = (A_mA**2).sum(1)
        ssB = (B_mB**2).sum(1)
    
        # Finally get corr coeff
        return np.dot(A_mA, B_mB.T) / np.sqrt(np.dot(ssA[:, None], ssB[None]))

    # Assuming a and p are your images represented as numpy arrays

    # Extracting the regions of interest
    a2tr = real[40:150, 120:220]
    p2tr = fake[40:150, 120:220]

    a2tr_gray = cv2.cvtColor(a2tr, cv2.COLOR_BGR2GRAY)
    p2tr_gray = cv2.cvtColor(p2tr, cv2.COLOR_BGR2GRAY)

    # Check if shapes are compatible

    st = ""
    # Calculate correlation coefficient
    co = corr2(a2tr_gray, p2tr_gray)
    if co.any() >= 0.5:
        if (abs(maxSizeReal - maxSizeFake) < 15 and abs(maxSizeReal - maxSizeFake) > 8) or abs(maxSizeReal - maxSizeFake) == 0:
            st = "REAL"
        else:
            st = "FAKE"
    else:
        st = "FAKE"

    return jsonify({'result': st}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)