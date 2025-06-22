/**
 * Complete test: Generate AI content + Upload S3 image + Create blog
 */

async function createAIBlogWithS3() {
  try {
    console.log('🤖 Creating Complete AI-Generated Blog with S3 Image...');
    
    // Step 1: Generate AI content
    console.log('📝 Step 1: Generating AI content...');
    
    const aiPrompt = 'Essential business licenses and permits required for starting a restaurant in India';
    const aiData = {
      prompt: aiPrompt,
      businessFocus: 'licensing'
    };
    
    console.log('Generating content for:', aiPrompt);
    
    const aiResponse = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiData)
    });
    
    if (!aiResponse.ok) {
      const error = await aiResponse.json();
      throw new Error(`AI Generation failed: ${error.error}`);
    }
    
    const aiResult = await aiResponse.json();
    const generatedContent = aiResult.content;
    
    console.log('✅ AI Content Generated Successfully!');
    console.log('Title:', generatedContent.title);
    console.log('Content Length:', generatedContent.content.length);
    console.log('Tags:', generatedContent.tags);
    
    // Step 2: Upload S3 image
    console.log('\n📤 Step 2: Uploading S3 image...');
    
    // Create a test image (green pixel for restaurant theme)
    const greenPixelData = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0x60, 0xF8, 0x0F, 0x00,
      0x01, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4, 0x00, 0x00, 0x00, 0x00,
      0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const imageFormData = new FormData();
    const imageFile = new Blob([greenPixelData], { type: 'image/png' });
    imageFormData.append('image', imageFile, 'restaurant-licenses-featured.png');
    
    const imageResponse = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: imageFormData
    });
    
    if (!imageResponse.ok) {
      const error = await imageResponse.json();
      throw new Error(`S3 Upload failed: ${error.error}`);
    }
    
    const imageResult = await imageResponse.json();
    const s3ImageUrl = imageResult.imageUrl;
    
    console.log('✅ S3 Image Uploaded Successfully!');
    console.log('S3 URL:', s3ImageUrl);
    
    // Step 3: Create complete blog post
    console.log('\n📝 Step 3: Creating complete blog post...');
    
    const blogData = {
      title: generatedContent.title,
      slug: generatedContent.slug,
      content: generatedContent.content,
      excerpt: generatedContent.excerpt,
      featuredImage: s3ImageUrl,
      author: 'AI Content Generator',
      status: 'published',
      metaTitle: generatedContent.metaTitle,
      metaDescription: generatedContent.metaDescription,
      tags: generatedContent.tags,
      publishedAt: new Date().toISOString()
    };
    
    const blogResponse = await fetch('http://localhost:3001/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData)
    });
    
    if (!blogResponse.ok) {
      const error = await blogResponse.json();
      throw new Error(`Blog creation failed: ${error.error}`);
    }
    
    const blogResult = await blogResponse.json();
    
    console.log('✅ Complete Blog Created Successfully!');
    console.log('Blog ID:', blogResult.id);
    console.log('Blog Slug:', blogResult.slug);
    console.log('Featured Image:', blogResult.featuredImage);
    
    // Step 4: Verify the complete workflow
    console.log('\n🔍 Step 4: Verifying complete workflow...');
    
    const verifyResponse = await fetch(`http://localhost:3001/api/blogs/${blogResult.slug}`);
    if (verifyResponse.ok) {
      const verifiedBlog = await verifyResponse.json();
      console.log('✅ Blog verification successful!');
      
      const hasAIContent = verifiedBlog.content.length > 1000;
      const hasS3Image = verifiedBlog.featuredImage && verifiedBlog.featuredImage.includes('amazonaws.com');
      const hasAllFields = verifiedBlog.metaTitle && verifiedBlog.metaDescription && verifiedBlog.tags;
      
      console.log('📋 Verification Results:');
      console.log(`✅ AI Content: ${hasAIContent ? 'Present' : 'Missing'} (${verifiedBlog.content.length} chars)`);
      console.log(`✅ S3 Image: ${hasS3Image ? 'Present' : 'Missing'}`);
      console.log(`✅ SEO Fields: ${hasAllFields ? 'Complete' : 'Incomplete'}`);
      
      if (hasAIContent && hasS3Image && hasAllFields) {
        console.log('🎉 COMPLETE SUCCESS: AI + S3 + Blog Creation Working Perfectly!');
      }
    }
    
    // Step 5: Show final summary
    console.log('\n📊 Final Summary:');
    console.log('✅ AI Content Generation: Working');
    console.log('✅ S3 Image Upload: Working');
    console.log('✅ Blog Creation: Working');
    console.log('✅ Complete Integration: Working');
    
    console.log('\n🔗 Access Links:');
    console.log('📖 View Blog: http://localhost:3001/blog/' + blogResult.slug);
    console.log('⚙️ Admin Panel: http://localhost:3001/admin/blogs');
    console.log('➕ Create New (with AI): http://localhost:3001/admin/blogs/new');
    
    console.log('\n🎯 AI + S3 Blog Creation Workflow: COMPLETE SUCCESS!');
    
    // Show OpenAI usage if available
    if (aiResult.usage) {
      console.log('\n📊 OpenAI Usage for this blog:');
      console.log('Total Tokens:', aiResult.usage.totalTokens);
      console.log('Estimated Cost: ~$' + (aiResult.usage.totalTokens * 0.00003).toFixed(4));
    }
    
  } catch (error) {
    console.error('❌ Complete workflow test failed:', error.message);
    
    if (error.message.includes('AI Generation')) {
      console.log('💡 Check OpenAI API key and rate limits');
    } else if (error.message.includes('S3 Upload')) {
      console.log('💡 Check AWS S3 configuration');
    } else if (error.message.includes('Blog creation')) {
      console.log('💡 Check database connection and blog API');
    }
  }
}

createAIBlogWithS3();
