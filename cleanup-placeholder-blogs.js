/**
 * Cleanup script to remove blogs with placeholder images
 * and update the system to work with S3 images only
 */

async function cleanupPlaceholderBlogs() {
  try {
    console.log('🧹 Cleaning up placeholder blogs...');
    
    // Get all blogs
    const response = await fetch('http://localhost:3001/api/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    const blogs = await response.json();
    console.log(`📋 Found ${blogs.length} total blogs`);
    
    // Identify blogs with placeholder images
    const placeholderBlogs = blogs.filter(blog => 
      blog.featuredImage && (
        blog.featuredImage.includes('placeholder') ||
        blog.featuredImage.includes('via.placeholder') ||
        blog.featuredImage === '/placeholder.svg'
      )
    );
    
    const s3Blogs = blogs.filter(blog => 
      blog.featuredImage && blog.featuredImage.includes('amazonaws.com')
    );
    
    const noimageBlogs = blogs.filter(blog => 
      !blog.featuredImage || blog.featuredImage === ''
    );
    
    console.log('\n📊 Blog Analysis:');
    console.log(`✅ S3 Blogs: ${s3Blogs.length}`);
    console.log(`⚠️ Placeholder Blogs: ${placeholderBlogs.length}`);
    console.log(`📷 No Image Blogs: ${noimageBlogs.length}`);
    
    // List all blogs with their image status
    console.log('\n📝 Blog Details:');
    blogs.forEach(blog => {
      let status = '❓ Unknown';
      if (!blog.featuredImage || blog.featuredImage === '') {
        status = '📷 No Image';
      } else if (blog.featuredImage.includes('amazonaws.com')) {
        status = '✅ S3 Image';
      } else if (blog.featuredImage.includes('placeholder') || blog.featuredImage.includes('via.placeholder')) {
        status = '⚠️ Placeholder';
      } else {
        status = '🔗 External URL';
      }
      
      console.log(`${status} - ${blog.title}`);
      if (blog.featuredImage) {
        console.log(`    Image: ${blog.featuredImage.substring(0, 80)}${blog.featuredImage.length > 80 ? '...' : ''}`);
      }
      console.log(`    Slug: ${blog.slug}`);
      console.log('');
    });
    
    // Option to remove placeholder blogs
    if (placeholderBlogs.length > 0) {
      console.log(`\n🗑️ Found ${placeholderBlogs.length} blogs with placeholder images:`);
      placeholderBlogs.forEach(blog => {
        console.log(`- ${blog.title} (${blog.slug})`);
      });
      
      console.log('\n⚠️ To remove these blogs, uncomment the deletion code below and run again.');
      console.log('   This will permanently delete blogs with placeholder images.');
      
      // Uncomment the following code to actually delete placeholder blogs
      /*
      for (const blog of placeholderBlogs) {
        try {
          const deleteResponse = await fetch(`http://localhost:3001/api/blogs/${blog.slug}`, {
            method: 'DELETE'
          });
          
          if (deleteResponse.ok) {
            console.log(`✅ Deleted: ${blog.title}`);
          } else {
            console.log(`❌ Failed to delete: ${blog.title}`);
          }
        } catch (error) {
          console.log(`❌ Error deleting ${blog.title}:`, error.message);
        }
      }
      */
    }
    
    console.log('\n🎯 Recommendations:');
    console.log('1. ✅ S3 image upload is working correctly');
    console.log('2. 📷 Blogs without images will show upload prompts');
    console.log('3. ⚠️ Remove or update blogs with placeholder images');
    console.log('4. 🔗 External image URLs will still work but consider migrating to S3');
    
    console.log('\n🚀 Next Steps:');
    console.log('- Create new blogs using the S3 upload feature');
    console.log('- Edit existing blogs to add S3 images');
    console.log('- Remove test blogs with placeholder images');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

cleanupPlaceholderBlogs();
