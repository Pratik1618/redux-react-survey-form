import React, { useState, useRef, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import Webcam from 'react-webcam';

const CameraCapture = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null); // To store the error
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('Captured Image (Data URL):', imageSrc);

      if (!imageSrc) {
        throw new Error('No image captured from webcam');
      }

      // Create a new image element to draw on the canvas
      const img = new Image();
      img.src = imageSrc;

      img.onload = async () => {
        // Create a canvas and draw the image onto it
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set the canvas size to match the captured image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the captured image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Add current date and time to the image
        const now = new Date();
        const dateString = now.toLocaleString(); // Format the date and time
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(dateString, 10, canvas.height - 30); // Position the text

        // Convert the canvas to a Blob
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Convert the data URL to a Blob for compression
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        if (!blob || blob.size === 0) {
          throw new Error('Failed to create a valid Blob');
        }

        // Compress the captured image (Blob)
        const options = {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedImage = await imageCompression(blob, options);
        console.log('Compressed Image:', compressedImage);

        const imageUrl = URL.createObjectURL(compressedImage);
        setCapturedImage(imageUrl);
      };
    } catch (err) {
      console.error('Capture error:', err);
      setError('Failed to capture and compress the image');
    }
  }, []);

  const downloadImage = () => {
    if (capturedImage) {
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'captured-image.jpg'; // You can change the filename here
      link.click(); // Programmatically click the link to trigger the download
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
