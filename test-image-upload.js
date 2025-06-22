/**
 * Test script for image upload functionality
 * This script tests the image upload API endpoint
 */

const fs = require('fs');
const path = require('path');

async function testImageUpload() {
  try {
    console.log('🧪 Testing Image Upload API...');
    
    // Check if we can access the upload endpoint
    const response = await fetch('http://localhost:3001/api/upload/image', {
      method: 'OPTIONS'
    });
    
    console.log('✅ Upload endpoint accessible:', response.status);
    
    // Test with a simple text file (to simulate file upload without actual image)
    const testData = new FormData();
    const testFile = new Blob(['test image data'], { type: 'image/jpeg' });
    testData.append('image', testFile, 'test.jpg');
    
    console.log('📤 Testing file upload...');
    
    const uploadResponse = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: testData
    });
    
    const result = await uploadResponse.json();
    console.log('📋 Upload response:', result);
    
    if (uploadResponse.ok) {
      console.log('✅ Image upload API is working!');
      console.log('🔗 Image URL:', result.imageUrl);
    } else {
      console.log('❌ Upload failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testImageUpload();
