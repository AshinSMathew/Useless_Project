import React, { useState } from 'react'

export default function Index() {
  const [image, setImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setResult(null)
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image first!')
      return
    }

    setIsProcessing(true)
    setResult(null)

    // Create FormData to send the image
    const formData = new FormData();
    const responseImage = await fetch(image);
    const blob = await responseImage.blob();
    formData.append('file', blob, 'appam.jpg');

    try {
      const response = await fetch('http://127.0.0.1:5000/count_holes', {
        method: 'POST',
        body: formData,
    });
    

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(`Your appam has approximately ${data.holes_count} holes!`);
    } catch (error) {
      alert('Error processing the image: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#FFF8E1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    card: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderRadius: '1.5rem',
      overflow: 'hidden',
    },
    cardContent: {
      padding: '1.5rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textAlign: 'center',
      color: '#B45309',
    },
    subtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#92400E',
    },
    button: {
      width: '100%',
      padding: '1rem',
      fontSize: '1.125rem',
      background: 'linear-gradient(to right, #F59E0B, #D97706)',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      marginBottom: '1rem',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    uploadIcon: {
      marginRight: '0.5rem',
    },
    imageContainer: {
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      marginTop: '2rem',
      marginBottom: '1rem',
    },
    placeholderText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: '#FFF8E1',
      color: '#92400E',
      fontSize: '1.125rem',
      textAlign: 'center',
      padding: '1rem',
    },
    uploadedImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    resultText: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#B45309',
      marginTop: '1rem',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <h1 style={styles.title}>Welcome to AppamScope</h1>
          <p style={styles.subtitle}>Discover the Perfect Appam: Count the Holes!</p>
          
          <div>
            <label htmlFor="upload" style={{ cursor: 'pointer' }}>
              <div style={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" style={styles.uploadIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload Your Appam Image
              </div>
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            <div style={styles.imageContainer}>
              {image ? (
                <img
                  src={image}
                  alt="Uploaded Appam"
                  style={styles.uploadedImage}
                />
              ) : (
                <div style={styles.placeholderText}>
                  Your delicious appam will appear here!
                </div>
              )}
            </div>

            <button 
              onClick={handleSubmit} 
              style={{...styles.button, ...(isProcessing || !image ? styles.disabledButton : {})}}
              disabled={isProcessing || !image}
            >
              {isProcessing ? 'Processing...' : 'Analyze Appam'}
            </button>

            {result && <p style={styles.resultText}>{result}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
