#!/usr/bin/env node

/**
 * Production Blog Checker Script
 * Checks if blog posts exist in production vs local
 */

const https = require('https');
const http = require('http');

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
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
            data: data,
            error: 'Invalid JSON response'
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkBlogEndpoints() {
  const localUrl = 'http://localhost:3000';
  const prodUrl = 'https://www.startbusiness.co.in';
  const blogSlug = 'essential-steps-start-business-2025-guide';
  
  console.log('🔍 Checking Blog Endpoints\n');
  console.log('=' .repeat(60));
  
  // Check local blog list
  console.log('\n📋 Checking Blog List Endpoints:');
  try {
    console.log('🏠 Local: /api/blogs');
    const localBlogs = await makeRequest(`${localUrl}/api/blogs`);
    console.log(`   Status: ${localBlogs.statusCode}`);
    if (localBlogs.data && Array.isArray(localBlogs.data)) {
      console.log(`   Count: ${localBlogs.data.length} blogs`);
      const targetBlog = localBlogs.data.find(blog => blog.slug === blogSlug);
      console.log(`   Target blog exists: ${targetBlog ? '✅ YES' : '❌ NO'}`);
      if (targetBlog) {
        console.log(`   Status: ${targetBlog.status}`);
        console.log(`   Title: ${targetBlog.title}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  
  try {
    console.log('\n🌐 Production: /api/blogs');
    const prodBlogs = await makeRequest(`${prodUrl}/api/blogs`);
    console.log(`   Status: ${prodBlogs.statusCode}`);
    if (prodBlogs.data && Array.isArray(prodBlogs.data)) {
      console.log(`   Count: ${prodBlogs.data.length} blogs`);
      const targetBlog = prodBlogs.data.find(blog => blog.slug === blogSlug);
      console.log(`   Target blog exists: ${targetBlog ? '✅ YES' : '❌ NO'}`);
      if (targetBlog) {
        console.log(`   Status: ${targetBlog.status}`);
        console.log(`   Title: ${targetBlog.title}`);
      }
    } else {
      console.log(`   ❌ Invalid response: ${prodBlogs.error || 'Unknown error'}`);
      console.log(`   Response: ${JSON.stringify(prodBlogs.data).substring(0, 200)}...`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // Check specific blog post
  console.log('\n📄 Checking Specific Blog Post:');
  try {
    console.log(`🏠 Local: /api/blogs/${blogSlug}`);
    const localBlog = await makeRequest(`${localUrl}/api/blogs/${blogSlug}`);
    console.log(`   Status: ${localBlog.statusCode}`);
    if (localBlog.statusCode === 200 && localBlog.data.title) {
      console.log(`   ✅ Found: ${localBlog.data.title}`);
      console.log(`   Status: ${localBlog.data.status}`);
      console.log(`   Author: ${localBlog.data.author}`);
    } else {
      console.log(`   ❌ Not found or error`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  try {
    console.log(`\n🌐 Production: /api/blogs/${blogSlug}`);
    const prodBlog = await makeRequest(`${prodUrl}/api/blogs/${blogSlug}`);
    console.log(`   Status: ${prodBlog.statusCode}`);
    if (prodBlog.statusCode === 200 && prodBlog.data.title) {
      console.log(`   ✅ Found: ${prodBlog.data.title}`);
      console.log(`   Status: ${prodBlog.data.status}`);
      console.log(`   Author: ${prodBlog.data.author}`);
    } else {
      console.log(`   ❌ Not found or error`);
      if (prodBlog.data) {
        console.log(`   Response: ${JSON.stringify(prodBlog.data).substring(0, 200)}...`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // Check page endpoints
  console.log('\n🌐 Checking Page Endpoints:');
  try {
    console.log(`🏠 Local: /blog/${blogSlug}`);
    const localPage = await makeRequest(`${localUrl}/blog/${blogSlug}`);
    console.log(`   Status: ${localPage.statusCode}`);
    console.log(`   Content-Type: ${localPage.headers['content-type']}`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  try {
    console.log(`\n🌐 Production: /blog/${blogSlug}`);
    const prodPage = await makeRequest(`${prodUrl}/blog/${blogSlug}`);
    console.log(`   Status: ${prodPage.statusCode}`);
    console.log(`   Content-Type: ${prodPage.headers['content-type']}`);
    if (prodPage.statusCode === 404) {
      console.log('   ❌ 404 Error - Blog post not found in production');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  console.log('\n📊 Diagnosis:');
  console.log('=' .repeat(60));
  console.log('If the blog exists locally but not in production:');
  console.log('1. ❌ Database sync issue - production DB missing data');
  console.log('2. ❌ Environment variable issue - wrong API URL');
  console.log('3. ❌ Deployment issue - code not properly deployed');
  console.log('4. ❌ Cache issue - CDN serving stale 404 responses');
  
  console.log('\n💡 Solutions:');
  console.log('1. Check production database for blog data');
  console.log('2. Verify NEXT_PUBLIC_BASE_URL environment variable');
  console.log('3. Re-deploy the application');
  console.log('4. Clear CDN/Vercel cache');
  console.log('5. Check database connection in production');
}

async function checkSpecificBlog(slug) {
  const prodUrl = 'https://www.startbusiness.co.in';
  
  console.log(`🔍 Checking specific blog: ${slug}\n`);
  
  try {
    const response = await makeRequest(`${prodUrl}/api/blogs/${slug}`);
    console.log(`Status: ${response.statusCode}`);
    console.log(`Headers:`, response.headers);
    
    if (response.statusCode === 200) {
      console.log('✅ Blog found!');
      console.log(`Title: ${response.data.title}`);
      console.log(`Status: ${response.data.status}`);
      console.log(`Author: ${response.data.author}`);
    } else {
      console.log('❌ Blog not found');
      console.log('Response:', response.data);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    checkBlogEndpoints();
  } else {
    const slug = args[0];
    checkSpecificBlog(slug);
  }
}

module.exports = { checkBlogEndpoints, checkSpecificBlog };
