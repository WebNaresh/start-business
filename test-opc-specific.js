/**
 * Test specifically for OPC content generation to check for [object Object] issues
 */

async function testOPCGeneration() {
  try {
    console.log('🧪 Testing OPC Content Generation for [object Object] Issues...');
    
    // Test the exact prompt that might be causing issues
    const testPrompt = 'Steps to register a One Person Company (OPC) in India with benefits and requirements';
    
    console.log('📝 Generating content for:', testPrompt);
    
    const aiData = {
      prompt: testPrompt,
      businessFocus: 'business registration'
    };
    
    const response = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error}`);
    }
    
    const result = await response.json();
    const generatedContent = result.content;
    
    console.log('✅ Content Generated Successfully!');
    console.log('Title:', generatedContent.title);
    console.log('Content Length:', generatedContent.content.length);
    
    // Check for [object Object] issues
    const hasObjectIssues = generatedContent.content.includes('[object Object]') ||
                           generatedContent.content.includes('[object ') ||
                           generatedContent.content.includes('undefined');
    
    console.log('\n🔍 Object Issue Check:');
    console.log('Has [object Object]:', generatedContent.content.includes('[object Object]'));
    console.log('Has [object patterns:', generatedContent.content.includes('[object '));
    console.log('Has undefined:', generatedContent.content.includes('undefined'));
    console.log('Overall result:', hasObjectIssues ? '❌ ISSUES FOUND' : '✅ NO ISSUES');
    
    if (hasObjectIssues) {
      console.log('\n❌ PROBLEMATIC CONTENT DETECTED:');
      const lines = generatedContent.content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('[object') || line.includes('undefined')) {
          console.log(`Line ${index + 1}: ${line}`);
        }
      });
    }
    
    // Show the full content for inspection
    console.log('\n📄 FULL GENERATED CONTENT:');
    console.log('='.repeat(80));
    console.log(generatedContent.content);
    console.log('='.repeat(80));
    
    // Test HTML structure
    const htmlAnalysis = {
      'H2 Headings': (generatedContent.content.match(/<h2[^>]*>/gi) || []).length,
      'H3 Headings': (generatedContent.content.match(/<h3[^>]*>/gi) || []).length,
      'Paragraphs': (generatedContent.content.match(/<p[^>]*>/gi) || []).length,
      'Unordered Lists': (generatedContent.content.match(/<ul[^>]*>/gi) || []).length,
      'Ordered Lists': (generatedContent.content.match(/<ol[^>]*>/gi) || []).length,
      'List Items': (generatedContent.content.match(/<li[^>]*>/gi) || []).length
    };
    
    console.log('\n📊 HTML Structure Analysis:');
    Object.entries(htmlAnalysis).forEach(([element, count]) => {
      console.log(`${element}: ${count}`);
    });
    
    // Test the cleaning function manually
    console.log('\n🧹 Testing Content Cleaning:');
    const originalLength = generatedContent.content.length;
    const cleanedContent = generatedContent.content
      .replace(/\[object Object\]/g, '')
      .replace(/\[object [^\]]+\]/g, '')
      .replace(/undefined/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    const cleanedLength = cleanedContent.length;
    const wasChanged = originalLength !== cleanedLength;
    
    console.log('Original length:', originalLength);
    console.log('Cleaned length:', cleanedLength);
    console.log('Content was changed:', wasChanged ? '✅ YES (had issues)' : '❌ NO (was clean)');
    
    if (wasChanged) {
      console.log('\n📄 CLEANED CONTENT:');
      console.log('='.repeat(80));
      console.log(cleanedContent);
      console.log('='.repeat(80));
    }
    
    // Final assessment
    console.log('\n🎯 Final Assessment:');
    if (!hasObjectIssues) {
      console.log('✅ SUCCESS: No [object Object] issues found in generated content');
      console.log('✅ The fix is working correctly');
    } else {
      console.log('❌ FAILURE: [object Object] issues still present');
      console.log('❌ The fix needs additional work');
    }
    
    return {
      success: !hasObjectIssues,
      content: generatedContent.content,
      hasIssues: hasObjectIssues
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
testOPCGeneration().then(result => {
  console.log('\n📋 Test Summary:');
  if (result.success) {
    console.log('🎉 OPC Content Generation: WORKING CORRECTLY');
    console.log('✅ No [object Object] issues detected');
  } else {
    console.log('⚠️ OPC Content Generation: NEEDS ATTENTION');
    console.log('❌ Issues detected or test failed');
  }
});
