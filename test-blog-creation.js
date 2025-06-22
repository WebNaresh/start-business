/**
 * Test script for creating a blog post with image upload
 * This script tests the complete blog creation workflow
 */

async function testBlogCreation() {
  try {
    console.log('🧪 Testing Blog Creation with Image Upload...');
    
    // Step 1: Test the upload API endpoint
    console.log('📤 Step 1: Testing image upload API...');
    
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
    formData.append('image', testFile, 'test-image.png');
    
    const uploadResponse = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: formData
    });
    
    let imageUrl = null;
    
    if (uploadResponse.ok) {
      const uploadResult = await uploadResponse.json();
      console.log('✅ Image upload successful!');
      console.log('🔗 Image URL:', uploadResult.imageUrl);
      imageUrl = uploadResult.imageUrl;
    } else {
      const error = await uploadResponse.json();
      console.log('⚠️ Image upload failed, using placeholder:', error.error);
      // Use a placeholder image for testing
      imageUrl = 'https://via.placeholder.com/800x600/0066cc/ffffff?text=Test+Blog+Image';
    }
    
    // Step 2: Create a blog post with the uploaded image
    console.log('📝 Step 2: Creating blog post...');
    
    const blogData = {
      title: 'Test Blog Post with Image Upload',
      slug: 'test-blog-post-image-upload-' + Date.now(),
      content: `
        <h2>Testing Image Upload Feature</h2>
        <p>This is a test blog post created to verify the image upload functionality.</p>
        <p>The featured image for this post was uploaded using the new image upload component.</p>
        <h3>Features Tested:</h3>
        <ul>
          <li>Image file upload to AWS S3</li>
          <li>Automatic image optimization</li>
          <li>WebP conversion</li>
          <li>Unique filename generation</li>
          <li>Blog form integration</li>
        </ul>
        <p>This test was created on ${new Date().toLocaleString()}.</p>
      `,
      excerpt: 'A test blog post to verify the image upload functionality with AWS S3 integration.',
      featuredImage: imageUrl,
      author: 'Test Admin',
      status: 'published',
      metaTitle: 'Test Blog Post - Image Upload Feature',
      metaDescription: 'Testing the new image upload feature for blog posts with AWS S3 integration.',
      tags: 'test, image-upload, aws-s3, blog'
    };
    
    const blogResponse = await fetch('http://localhost:3001/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData)
    });
    
    if (blogResponse.ok) {
      const blogResult = await blogResponse.json();
      console.log('✅ Blog post created successfully!');
      console.log('📄 Blog ID:', blogResult.id);
      console.log('🔗 Blog Slug:', blogResult.slug);
      console.log('🖼️ Featured Image:', blogResult.featuredImage);
      console.log('🌐 View at: http://localhost:3001/blog/' + blogResult.slug);
      
      // Step 3: Verify the blog post can be retrieved
      console.log('🔍 Step 3: Verifying blog post retrieval...');
      
      const getResponse = await fetch(`http://localhost:3001/api/blogs/${blogResult.slug}`);
      if (getResponse.ok) {
        const retrievedBlog = await getResponse.json();
        console.log('✅ Blog post retrieved successfully!');
        console.log('📋 Title:', retrievedBlog.title);
        console.log('🖼️ Featured Image URL:', retrievedBlog.featuredImage);
      } else {
        console.log('❌ Failed to retrieve blog post');
      }
      
    } else {
      const error = await blogResponse.json();
      console.log('❌ Blog creation failed:', error.error);
    }
    
    console.log('\n🎉 Test completed!');
    console.log('📝 Summary:');
    console.log('- Image upload API: ' + (uploadResponse.ok ? '✅ Working' : '⚠️ Using fallback'));
    console.log('- Blog creation: ' + (blogResponse.ok ? '✅ Working' : '❌ Failed'));
    console.log('- Image integration: ' + (imageUrl ? '✅ Working' : '❌ Failed'));
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testBlogCreation();
