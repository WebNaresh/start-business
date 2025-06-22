/**
 * Remove the specific placeholder blog
 */

async function removePlaceholderBlog() {
  try {
    console.log('🗑️ Removing placeholder blog...');
    
    const blogSlug = 'test-blog-post-image-upload-1750576677259';
    
    const deleteResponse = await fetch(`http://localhost:3001/api/blogs/${blogSlug}`, {
      method: 'DELETE'
    });
    
    if (deleteResponse.ok) {
      console.log('✅ Successfully removed placeholder blog!');
      
      // Verify it's gone
      const checkResponse = await fetch(`http://localhost:3001/api/blogs/${blogSlug}`);
      if (checkResponse.status === 404) {
        console.log('✅ Confirmed: Blog has been deleted');
      }
      
      // Show remaining blogs
      const allBlogsResponse = await fetch('http://localhost:3001/api/blogs');
      const allBlogs = await allBlogsResponse.json();
      
      console.log(`\n📋 Remaining blogs (${allBlogs.length}):`);
      allBlogs.forEach(blog => {
        const imageType = blog.featuredImage?.includes('amazonaws.com') ? '✅ S3' : 
                         blog.featuredImage ? '🔗 External' : '📷 No Image';
        console.log(`${imageType} - ${blog.title}`);
      });
      
    } else {
      console.log('❌ Failed to delete blog');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removePlaceholderBlog();
