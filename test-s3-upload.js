/**
 * Test S3 upload specifically
 */

async function testS3Upload() {
  try {
    console.log('🧪 Testing S3 Image Upload...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageData = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x5C, 0xC2, 0x5D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const formData = new FormData();
    const testFile = new Blob([testImageData], { type: 'image/png' });
    formData.append('image', testFile, 'test-s3-upload.png');
    
    console.log('📤 Uploading to S3...');
    
    const uploadResponse = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: formData
    });
    
    const result = await uploadResponse.json();
    
    console.log('📋 Response Status:', uploadResponse.status);
    console.log('📋 Response Body:', JSON.stringify(result, null, 2));
    
    if (uploadResponse.ok && result.success) {
      console.log('✅ S3 Upload Successful!');
      console.log('🔗 Image URL:', result.imageUrl);
      
      // Test if the image is accessible
      console.log('🔍 Testing image accessibility...');
      try {
        const imageResponse = await fetch(result.imageUrl, { method: 'HEAD' });
        console.log('📋 Image Response Status:', imageResponse.status);
        if (imageResponse.ok) {
          console.log('✅ Image is accessible!');
        } else {
          console.log('⚠️ Image not accessible yet (may take a moment)');
        }
      } catch (error) {
        console.log('⚠️ Could not test image accessibility:', error.message);
      }
      
    } else {
      console.log('❌ S3 Upload Failed');
      console.log('Error:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testS3Upload();
