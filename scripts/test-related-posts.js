// Script to test the related posts functionality
async function testRelatedPosts() {
  try {
    console.log('🔍 Testing Related Posts Functionality...\n');
    
    // Fetch all blog posts
    const response = await fetch('http://localhost:3000/api/blogs');
    if (!response.ok) throw new Error('Failed to fetch blogs');
    
    const allPosts = await response.json();
    console.log(`📊 Total posts found: ${allPosts.length}\n`);
    
    // Display all posts with their tags
    allPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Tags: ${post.tags || 'No tags'}`);
      console.log(`   Status: ${post.status}`);
      console.log('');
    });
    
    // Test tag matching algorithm
    console.log('🔗 Testing Tag Matching Algorithm...\n');
    
    // Find the finance post
    const financePost = allPosts.find(post => post.slug === 'personal-finance-tips-building-wealth-2025');
    const businessPost = allPosts.find(post => post.slug === 'essential-steps-start-business-2025-guide');
    
    if (financePost && businessPost) {
      console.log('Finance Post Tags:', financePost.tags);
      console.log('Business Post Tags:', businessPost.tags);
      
      // Check for common tags
      const financeTags = financePost.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];
      const businessTags = businessPost.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];
      
      const commonTags = financeTags.filter(tag => businessTags.includes(tag));
      console.log('Common Tags:', commonTags);
      
      if (commonTags.length > 0) {
        console.log('✅ Posts should be related based on common tags!');
      } else {
        console.log('❌ No common tags found between finance and business posts');
      }
    }
    
    console.log('\n🎯 Related Posts Test Complete!');
    
  } catch (error) {
    console.error('❌ Error testing related posts:', error.message);
  }
}

// Run the test
if (typeof window === 'undefined') {
  testRelatedPosts();
}

module.exports = { testRelatedPosts };
