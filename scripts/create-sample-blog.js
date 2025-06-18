// Simple script to create a sample blog post for testing
const sampleBlogData = {
  title: "Welcome to Our Enhanced Blog System",
  slug: "welcome-to-enhanced-blog-system",
  content: `
    <h2 class="text-3xl font-bold mb-4 mt-6">Welcome to Our Enhanced Blog System</h2>
    <p class="mb-4 leading-relaxed">We're excited to introduce our new blog system powered by EditorJS, providing a modern and intuitive writing experience.</p>
    
    <h3 class="text-2xl font-bold mb-4 mt-6">Key Features</h3>
    <ul class="list-disc list-inside mb-4 space-y-2">
      <li class="mb-2">Rich text editing with EditorJS</li>
      <li class="mb-2">Block-based content creation</li>
      <li class="mb-2">Responsive design for all devices</li>
      <li class="mb-2">SEO optimization built-in</li>
    </ul>
    
    <blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic bg-gray-50 rounded-r-lg">
      <p class="text-lg mb-2">This new system provides an exceptional writing experience for content creators while ensuring optimal performance for readers.</p>
    </blockquote>
    
    <p class="mb-4 leading-relaxed">Start creating amazing content today with our enhanced blog platform!</p>
  `,
  editorData: JSON.stringify({
    "time": Date.now(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "Welcome to Our Enhanced Blog System",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "We're excited to introduce our new blog system powered by EditorJS, providing a modern and intuitive writing experience."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Key Features",
          "level": 3
        }
      },
      {
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "Rich text editing with EditorJS",
            "Block-based content creation",
            "Responsive design for all devices",
            "SEO optimization built-in"
          ]
        }
      },
      {
        "type": "quote",
        "data": {
          "text": "This new system provides an exceptional writing experience for content creators while ensuring optimal performance for readers.",
          "caption": ""
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Start creating amazing content today with our enhanced blog platform!"
        }
      }
    ],
    "version": "2.28.2"
  }),
  excerpt: "Discover our new blog system powered by EditorJS, featuring rich text editing, block-based content creation, and responsive design for an exceptional writing experience.",
  author: "Blog Admin",
  status: "published",
  metaTitle: "Welcome to Our Enhanced Blog System - Modern Content Creation",
  metaDescription: "Explore our new EditorJS-powered blog system with rich text editing, responsive design, and SEO optimization for the best content creation experience.",
  tags: "blog, editorjs, content, writing, modern",
  featuredImage: "/placeholder.svg"
};

// Function to create the sample blog post
async function createSampleBlog() {
  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleBlogData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Sample blog post created successfully!');
    console.log('📝 Title:', result.title);
    console.log('🔗 Slug:', result.slug);
    console.log('📅 Published:', result.publishedAt);
    console.log('🌐 View at: http://localhost:3000/blog/' + result.slug);
    
  } catch (error) {
    console.error('❌ Failed to create sample blog post:', error.message);
  }
}

// Run the function if this script is executed directly
if (typeof window === 'undefined') {
  createSampleBlog();
}

module.exports = { createSampleBlog, sampleBlogData };
