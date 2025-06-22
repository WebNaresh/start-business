/**
 * Simple test to verify S3 upload and create a blog
 */

async function simpleTest() {
  try {
    console.log('🧪 Simple S3 Upload Test...');
    
    // Test S3 upload first
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
    formData.append('image', testFile, 'simple-test.png');
    
    const uploadResponse = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: formData
    });
    
    const uploadResult = await uploadResponse.json();
    console.log('Upload Status:', uploadResponse.status);
    console.log('Upload Result:', uploadResult);
    
    if (uploadResponse.ok && uploadResult.success) {
      console.log('✅ S3 Upload Working!');
      console.log('Image URL:', uploadResult.imageUrl);
      
      // Now create a simple blog
      const blogData = {
        title: 'Simple Test Blog with S3 Image',
        content: '<p>This is a simple test blog with S3 image upload.</p>',
        excerpt: 'Simple test blog',
        featuredImage: uploadResult.imageUrl,
        author: 'Test User',
        status: 'published'
      };
      
      const blogResponse = await fetch('http://localhost:3001/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      
      const blogResult = await blogResponse.json();
      console.log('Blog Status:', blogResponse.status);
      console.log('Blog Result:', blogResult);
      
      if (blogResponse.ok) {
        console.log('✅ Blog Created Successfully!');
        console.log('View at: http://localhost:3001/blog/' + blogResult.slug);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

simpleTest();
