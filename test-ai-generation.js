const http = require('http');

async function testAIGeneration() {
  console.log('🚀 Testing AI Blog Generation with Content Length Selection...');
  
  const testCases = [
    {
      name: 'Short Content',
      data: {
        prompt: 'How to register a trademark in India',
        businessFocus: 'business registration',
        contentLength: 'short',
        targetCharacters: 1000
      }
    },
    {
      name: 'Medium Content',
      data: {
        prompt: 'Complete guide to GST registration process',
        businessFocus: 'compliance',
        contentLength: 'medium',
        targetCharacters: 2000
      }
    },
    {
      name: 'Custom Length',
      data: {
        prompt: 'Starting a private limited company in India',
        businessFocus: 'business registration',
        contentLength: 'custom',
        targetCharacters: 3500
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n📝 Testing: ${testCase.name}`);
    console.log(`Target: ${testCase.data.targetCharacters} characters`);
    
    const postData = JSON.stringify(testCase.data);

    const options = {
      hostname: 'localhost',
      port: 3002,
      path: '/api/generate-blog-content',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    try {
      const result = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                return;
              }
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
      });

      if (result.success && result.content) {
        const actualLength = result.content.content.length;
        const targetLength = testCase.data.targetCharacters;
        const difference = Math.abs(actualLength - targetLength);
        const accuracy = ((targetLength - difference) / targetLength * 100).toFixed(1);
        
        console.log(`✅ Success!`);
        console.log(`   Title: ${result.content.title}`);
        console.log(`   Actual Length: ${actualLength.toLocaleString()} characters`);
        console.log(`   Target Length: ${targetLength.toLocaleString()} characters`);
        console.log(`   Difference: ±${difference} characters`);
        console.log(`   Accuracy: ${accuracy}%`);
        console.log(`   Tags: ${result.content.tags}`);
        
        if (result.usage) {
          console.log(`   Tokens Used: ${result.usage.totalTokens}`);
        }
        
        // Check for list items
        const hasLists = result.content.content.includes('<ul>') || result.content.content.includes('<ol>');
        const hasListItems = result.content.content.includes('<li>');
        console.log(`   Has Lists: ${hasLists ? '✓' : '✗'}`);
        console.log(`   Has List Items: ${hasListItems ? '✓' : '✗'}`);
        
      } else {
        console.log(`❌ Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎉 AI Generation Testing Complete!');
}

testAIGeneration().catch(console.error);
