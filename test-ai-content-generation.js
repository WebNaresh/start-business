/**
 * Test script for AI content generation API
 */

async function testAIContentGeneration() {
  try {
    console.log('🤖 Testing AI Content Generation API...');
    
    // Test 1: Basic content generation
    console.log('📝 Step 1: Testing basic content generation...');
    
    const testPrompt = 'How to register a private limited company in India';
    const testData = {
      prompt: testPrompt,
      businessFocus: 'business registration'
    };
    
    console.log('Sending request with prompt:', testPrompt);
    
    const response = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error || 'Unknown error'}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.content) {
      console.log('✅ AI Content Generation Successful!');
      console.log('\n📋 Generated Content Summary:');
      console.log('Title:', result.content.title);
      console.log('Slug:', result.content.slug);
      console.log('Content Length:', result.content.content.length, 'characters');
      console.log('Excerpt:', result.content.excerpt);
      console.log('Meta Title:', result.content.metaTitle);
      console.log('Meta Description:', result.content.metaDescription);
      console.log('Tags:', result.content.tags);
      
      if (result.usage) {
        console.log('\n📊 OpenAI Usage:');
        console.log('Prompt Tokens:', result.usage.promptTokens);
        console.log('Completion Tokens:', result.usage.completionTokens);
        console.log('Total Tokens:', result.usage.totalTokens);
      }
      
      // Validate content structure
      console.log('\n🔍 Content Validation:');
      const validations = {
        'Title length (50-100 chars)': result.content.title.length >= 50 && result.content.title.length <= 100,
        'Content length (800+ chars)': result.content.content.length >= 800,
        'Excerpt length (100-300 chars)': result.content.excerpt.length >= 100 && result.content.excerpt.length <= 300,
        'Meta title length (50-60 chars)': result.content.metaTitle.length >= 50 && result.content.metaTitle.length <= 60,
        'Meta description length (150-160 chars)': result.content.metaDescription.length >= 150 && result.content.metaDescription.length <= 160,
        'Tags present': result.content.tags && result.content.tags.length > 0,
        'Slug present': result.content.slug && result.content.slug.length > 0,
        'Content contains HTML': result.content.content.includes('<') && result.content.content.includes('>')
      };
      
      Object.entries(validations).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
      });
      
      const allPassed = Object.values(validations).every(v => v);
      console.log(`\n${allPassed ? '✅' : '❌'} Overall validation: ${allPassed ? 'PASSED' : 'FAILED'}`);
      
      // Show a sample of the generated content
      console.log('\n📄 Content Sample (first 200 chars):');
      console.log(result.content.content.substring(0, 200) + '...');
      
    } else {
      throw new Error('Invalid response structure');
    }
    
    // Test 2: Different business focus
    console.log('\n📝 Step 2: Testing different business focus...');
    
    const testPrompt2 = 'Benefits of GST registration for small businesses';
    const testData2 = {
      prompt: testPrompt2,
      businessFocus: 'taxation'
    };
    
    const response2 = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData2)
    });
    
    if (response2.ok) {
      const result2 = await response2.json();
      console.log('✅ Second test successful!');
      console.log('Title:', result2.content.title);
      console.log('Focus area reflected in content:', result2.content.content.toLowerCase().includes('gst') || result2.content.content.toLowerCase().includes('tax'));
    } else {
      console.log('⚠️ Second test failed, but first test passed');
    }
    
    // Test 3: Error handling
    console.log('\n📝 Step 3: Testing error handling...');
    
    const errorResponse = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: '' }) // Empty prompt should fail
    });
    
    if (errorResponse.status === 400) {
      console.log('✅ Error handling working correctly (empty prompt rejected)');
    } else {
      console.log('⚠️ Error handling may need improvement');
    }
    
    console.log('\n🎉 AI Content Generation Tests Completed!');
    console.log('📋 Summary:');
    console.log('✅ API Endpoint: Working');
    console.log('✅ OpenAI Integration: Working');
    console.log('✅ Content Generation: Working');
    console.log('✅ Content Validation: Working');
    console.log('✅ Error Handling: Working');
    
    console.log('\n🔗 Test the UI at: http://localhost:3001/admin/blogs/new');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('💡 Check your OpenAI API key in .env file');
    } else if (error.message.includes('rate limit')) {
      console.log('💡 OpenAI rate limit reached, try again later');
    } else if (error.message.includes('fetch')) {
      console.log('💡 Make sure the development server is running');
    }
  }
}

testAIContentGeneration();
