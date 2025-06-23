const https = require('https');
const http = require('http');

function testBlogAPI() {
  console.log('🚀 Testing Gemini AI Blog Generation API...');

  const postData = JSON.stringify({
    prompt: 'How to start a private limited company in India',
    businessFocus: 'business registration'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/generate-blog-content',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log('📡 Response Status:', res.statusCode);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        if (res.statusCode !== 200) {
          console.error('❌ API Error:', data);
          return;
        }

        const responseData = JSON.parse(data);

        console.log('✅ API Response Success!');
        console.log('📊 Usage Stats:', responseData.usage);
        console.log('📝 Generated Content:');
        console.log('  Title:', responseData.content.title);
        console.log('  Slug:', responseData.content.slug);
        console.log('  Excerpt:', responseData.content.excerpt);
        console.log('  Meta Title:', responseData.content.metaTitle);
        console.log('  Meta Description:', responseData.content.metaDescription);
        console.log('  Tags:', responseData.content.tags);
        console.log('  Content Length:', responseData.content.content.length, 'characters');

        // Check for list items in content
        const hasLists = responseData.content.content.includes('<ul>') || responseData.content.content.includes('<ol>');
        const hasListItems = responseData.content.content.includes('<li>');

        console.log('📋 List Check:');
        console.log('  Has Lists:', hasLists);
        console.log('  Has List Items:', hasListItems);

        if (hasListItems) {
          const listItems = responseData.content.content.match(/<li[^>]*>(.*?)<\/li>/g);
          console.log('  List Items Found:', listItems ? listItems.length : 0);
          if (listItems && listItems.length > 0) {
            console.log('  First List Item:', listItems[0]);
          }
        }

        // Save content to file for inspection
        const fs = require('fs');
        fs.writeFileSync('generated-blog-content.html', responseData.content.content);
        console.log('💾 Content saved to generated-blog-content.html');

      } catch (error) {
        console.error('❌ Parse Error:', error.message);
        console.error('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request Error:', error.message);
  });

  req.write(postData);
  req.end();
}

testBlogAPI();
