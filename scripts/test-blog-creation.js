#!/usr/bin/env node

/**
 * Blog Creation Test Script
 * Tests the blog creation API endpoint
 */

const https = require('https');
const http = require('http');

async function testBlogCreation() {
  console.log('🧪 Testing Blog Creation API\n');
  console.log('=' .repeat(50));

  const testBlog = {
    title: "Test Blog Post - Enhanced Editor",
    author: "Test Author",
    content: "<h1>Test Content</h1><p>This is a test blog post created to verify the enhanced editor functionality.</p>",
    editorData: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Test Content",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "This is a test blog post created to verify the enhanced editor functionality."
          }
        }
      ],
      version: "2.28.2"
    }),
    excerpt: "This is a test blog post created to verify the enhanced editor functionality.",
    status: "draft",
    metaTitle: "Test Blog Post - Enhanced Editor",
    metaDescription: "Testing the enhanced blog editor functionality",
    tags: "test, enhanced-editor, blog"
  };

  try {
    console.log('📝 Creating test blog post...');
    console.log(`Title: ${testBlog.title}`);
    console.log(`Author: ${testBlog.author}`);
    console.log(`Status: ${testBlog.status}`);

    const response = await makeRequest('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testBlog)
    });

    if (response.statusCode === 201) {
      console.log('\n✅ Blog created successfully!');
      console.log('Response:', JSON.stringify(response.data, null, 2));
      
      // Test fetching the created blog
      console.log('\n🔍 Testing blog retrieval...');
      const slug = response.data.slug;
      const getResponse = await makeRequest(`http://localhost:3000/api/blogs/${slug}`);
      
      if (getResponse.statusCode === 200) {
        console.log('✅ Blog retrieved successfully!');
        console.log(`Retrieved blog: ${getResponse.data.title}`);
      } else {
        console.log('❌ Failed to retrieve blog');
        console.log('Status:', getResponse.statusCode);
      }
      
    } else {
      console.log('❌ Failed to create blog');
      console.log('Status:', response.statusCode);
      console.log('Response:', response.data);
    }

  } catch (error) {
    console.error('❌ Error testing blog creation:', error.message);
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = protocol.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testAPIHealth() {
  console.log('\n🏥 Testing API Health...');
  
  try {
    const response = await makeRequest('http://localhost:3000/api/blogs');
    
    if (response.statusCode === 200) {
      console.log('✅ API is healthy');
      console.log(`Found ${response.data.length} existing blogs`);
    } else {
      console.log('⚠️  API returned non-200 status:', response.statusCode);
    }
  } catch (error) {
    console.log('❌ API health check failed:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Enhanced Blog Editor - API Test Suite\n');
  
  await testAPIHealth();
  await testBlogCreation();
  
  console.log('\n' + '=' .repeat(50));
  console.log('🎯 Test Complete!');
  console.log('\nNext Steps:');
  console.log('1. Check the blog admin interface: http://localhost:3000/admin/blogs');
  console.log('2. Try creating a blog through the UI');
  console.log('3. Test the enhanced editor features');
  console.log('4. Import content using the import dialog');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testBlogCreation, testAPIHealth };
