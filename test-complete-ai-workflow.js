/**
 * Complete AI Content Generation Workflow Test
 * Tests the entire process from AI generation to structured EditorJS blocks
 */

// Import the conversion function (simulated for Node.js)
function htmlToEditorJSServer(html) {
  const blocks = [];
  let blockId = 1;

  // Handle both multi-line and inline HTML by first normalizing the content
  const normalizedHtml = html
    .replace(/></g, '>\n<') // Add line breaks between tags
    .replace(/(<\/[^>]+>)([^<])/g, '$1\n$2') // Add line breaks after closing tags
    .replace(/([^>])(<[^\/])/g, '$1\n$2') // Add line breaks before opening tags
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n');

  // Split HTML into blocks based on common patterns, but keep blockquotes intact
  let htmlBlocks = [];
  let currentBlock = '';
  let inBlockquote = false;

  const lines = normalizedHtml.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.includes('<blockquote')) {
      if (currentBlock.trim()) {
        htmlBlocks.push(currentBlock.trim());
        currentBlock = '';
      }
      inBlockquote = true;
      currentBlock += line + '\n';
    } else if (trimmedLine.includes('</blockquote>')) {
      currentBlock += line + '\n';
      htmlBlocks.push(currentBlock.trim());
      currentBlock = '';
      inBlockquote = false;
    } else if (inBlockquote) {
      currentBlock += line + '\n';
    } else if (trimmedLine.match(/^<(h[1-6]|p|ul|ol|div)/)) {
      if (currentBlock.trim()) {
        htmlBlocks.push(currentBlock.trim());
      }
      currentBlock = line + '\n';
    } else {
      currentBlock += line + '\n';
    }
  }
  
  if (currentBlock.trim()) {
    htmlBlocks.push(currentBlock.trim());
  }
  
  htmlBlocks = htmlBlocks.filter(block => block.trim());

  htmlBlocks.forEach((htmlBlock, index) => {
    const trimmed = htmlBlock.trim();
    if (!trimmed) return;

    // Debug logging for lists
    if (trimmed.includes('<ol') || trimmed.includes('<ul')) {
      console.log(`\nDEBUG List Block ${index}:`, trimmed.substring(0, 200) + '...');
    }

    // Extract heading levels
    const headingMatch = trimmed.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/i);
    if (headingMatch) {
      const level = parseInt(headingMatch[1]);
      const text = headingMatch[2].replace(/<[^>]*>/g, '').trim();
      blocks.push({
        id: `heading-${blockId++}`,
        type: 'header',
        data: { text, level }
      });
      return;
    }

    // Extract unordered lists
    const ulMatch = trimmed.match(/<ul[^>]*>(.*?)<\/ul>/is);
    if (ulMatch) {
      const items = ulMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li =>
        li.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]*>/g, '').trim()
      ).filter(item => item.length > 0) || [];

      if (items.length > 0) {
        blocks.push({
          id: `list-${blockId++}`,
          type: 'list',
          data: { style: 'unordered', items }
        });
      }
      return;
    }

    // Extract ordered lists
    const olMatch = trimmed.match(/<ol[^>]*>(.*?)<\/ol>/is);
    if (olMatch) {
      const items = olMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li =>
        li.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]*>/g, '').trim()
      ).filter(item => item.length > 0) || [];

      if (items.length > 0) {
        blocks.push({
          id: `list-${blockId++}`,
          type: 'list',
          data: { style: 'ordered', items }
        });
      }
      return;
    }

    // Extract blockquotes
    const quoteMatch = trimmed.match(/<blockquote[^>]*>(.*?)<\/blockquote>/is);
    if (quoteMatch) {
      // Handle nested <p> tags within blockquote
      let text = quoteMatch[1];
      if (text.includes('<p>')) {
        text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1').trim();
      }
      text = text.replace(/<[^>]*>/g, '').trim();
      
      if (text) {
        blocks.push({
          id: `quote-${blockId++}`,
          type: 'quote',
          data: { text, caption: '', alignment: 'left' }
        });
      }
      return;
    }

    // Extract paragraphs
    const pMatch = trimmed.match(/<p[^>]*>(.*?)<\/p>/is);
    if (pMatch) {
      const text = pMatch[1].trim();
      if (text) {
        blocks.push({
          id: `paragraph-${blockId++}`,
          type: 'paragraph',
          data: { text }
        });
      }
      return;
    }

    // Handle any remaining content as paragraph
    const cleanText = trimmed.replace(/<[^>]*>/g, '').trim();
    if (cleanText) {
      blocks.push({
        id: `paragraph-${blockId++}`,
        type: 'paragraph',
        data: { text: cleanText }
      });
    }
  });

  return {
    time: Date.now(),
    blocks: blocks,
    version: '2.28.2'
  };
}

async function testCompleteAIWorkflow() {
  try {
    console.log('🤖 Testing Complete AI Content Generation Workflow...');
    
    // Step 1: Generate AI content with structured HTML
    console.log('\n📝 Step 1: Generating AI content with structured HTML...');
    
    const aiPrompt = 'Complete guide to digital marketing for small businesses in India';
    const aiData = {
      prompt: aiPrompt,
      businessFocus: 'digital business'
    };
    
    console.log('Prompt:', aiPrompt);
    console.log('Generating content...');
    
    const aiResponse = await fetch('http://localhost:3001/api/generate-blog-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiData)
    });
    
    if (!aiResponse.ok) {
      const error = await aiResponse.json();
      throw new Error(`AI Generation failed: ${error.error}`);
    }
    
    const aiResult = await aiResponse.json();
    const generatedContent = aiResult.content;
    
    console.log('✅ AI Content Generated Successfully!');
    console.log('Title:', generatedContent.title);
    console.log('Content Length:', generatedContent.content.length);
    console.log('Tags:', generatedContent.tags);
    
    // Step 2: Analyze HTML structure
    console.log('\n🔍 Step 2: Analyzing generated HTML structure...');

    const htmlContent = generatedContent.content;

    // Debug: Show actual HTML content
    console.log('\n📄 Sample HTML Content (first 500 chars):');
    console.log(htmlContent.substring(0, 500) + '...');
    console.log('\n📄 HTML Structure Preview:');
    const lines = htmlContent.split('\n').slice(0, 10);
    lines.forEach((line, i) => {
      if (line.trim()) console.log(`${i + 1}: ${line.trim()}`);
    });
    const htmlAnalysis = {
      'H2 Headings': (htmlContent.match(/<h2[^>]*>/gi) || []).length,
      'H3 Headings': (htmlContent.match(/<h3[^>]*>/gi) || []).length,
      'Paragraphs': (htmlContent.match(/<p[^>]*>/gi) || []).length,
      'Unordered Lists': (htmlContent.match(/<ul[^>]*>/gi) || []).length,
      'Ordered Lists': (htmlContent.match(/<ol[^>]*>/gi) || []).length,
      'List Items': (htmlContent.match(/<li[^>]*>/gi) || []).length,
      'Blockquotes': (htmlContent.match(/<blockquote[^>]*>/gi) || []).length,
      'Strong Tags': (htmlContent.match(/<strong[^>]*>/gi) || []).length
    };
    
    console.log('📋 HTML Structure Analysis:');
    Object.entries(htmlAnalysis).forEach(([element, count]) => {
      const status = count > 0 ? '✅' : '❌';
      console.log(`${status} ${element}: ${count}`);
    });
    
    const hasGoodStructure = htmlAnalysis['H2 Headings'] > 0 && 
                            htmlAnalysis['Paragraphs'] > 0 && 
                            (htmlAnalysis['Unordered Lists'] > 0 || htmlAnalysis['Ordered Lists'] > 0);
    
    console.log(`\n${hasGoodStructure ? '✅' : '❌'} Overall HTML Structure: ${hasGoodStructure ? 'GOOD' : 'NEEDS IMPROVEMENT'}`);
    
    // Step 3: Convert to EditorJS blocks
    console.log('\n🔄 Step 3: Converting HTML to EditorJS blocks...');
    
    const editorJSData = htmlToEditorJSServer(htmlContent);
    
    console.log('✅ Conversion completed!');
    console.log('Total blocks created:', editorJSData.blocks.length);
    
    // Analyze block types
    const blockTypes = {};
    editorJSData.blocks.forEach(block => {
      blockTypes[block.type] = (blockTypes[block.type] || 0) + 1;
    });
    
    console.log('📊 Block Type Distribution:');
    Object.entries(blockTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} blocks`);
    });
    
    // Step 4: Validate conversion quality
    console.log('\n✅ Step 4: Validating conversion quality...');
    
    const validations = {
      'Multiple blocks created': editorJSData.blocks.length > 3,
      'Has header blocks': editorJSData.blocks.some(b => b.type === 'header'),
      'Has paragraph blocks': editorJSData.blocks.some(b => b.type === 'paragraph'),
      'Has list blocks': editorJSData.blocks.some(b => b.type === 'list'),
      'All blocks have data': editorJSData.blocks.every(b => b.data && Object.keys(b.data).length > 0),
      'No empty blocks': editorJSData.blocks.every(b => {
        if (b.type === 'paragraph' || b.type === 'header') {
          return b.data.text && b.data.text.trim() && b.data.text.trim().length > 0;
        }
        if (b.type === 'list') {
          return b.data.items && b.data.items.length > 0 && b.data.items.every(item => item.trim().length > 0);
        }
        if (b.type === 'quote') {
          return b.data.text && b.data.text.trim() && b.data.text.trim().length > 0;
        }
        return true;
      }),
      'Proper heading hierarchy': editorJSData.blocks.filter(b => b.type === 'header').every(b => b.data.level >= 2 && b.data.level <= 4)
    };
    
    console.log('📋 Validation Results:');
    Object.entries(validations).forEach(([check, passed]) => {
      console.log(`${passed ? '✅' : '❌'} ${check}`);
    });

    // Debug empty blocks
    if (!validations['No empty blocks']) {
      console.log('\n🔍 Empty blocks detected:');
      editorJSData.blocks.forEach((block, index) => {
        let isEmpty = false;
        if (block.type === 'paragraph' || block.type === 'header') {
          isEmpty = !block.data.text || !block.data.text.trim() || block.data.text.trim().length === 0;
        } else if (block.type === 'list') {
          isEmpty = !block.data.items || block.data.items.length === 0 || !block.data.items.every(item => item.trim().length > 0);
        } else if (block.type === 'quote') {
          isEmpty = !block.data.text || !block.data.text.trim() || block.data.text.trim().length === 0;
        }

        if (isEmpty) {
          console.log(`Block ${index + 1} (${block.type}): EMPTY - ${JSON.stringify(block.data)}`);
        }
      });
    }
    
    const allValidationsPassed = Object.values(validations).every(v => v);
    
    // Step 5: Show sample blocks
    console.log('\n📄 Step 5: Sample EditorJS blocks...');
    
    editorJSData.blocks.slice(0, 6).forEach((block, index) => {
      let preview = '';
      if (block.type === 'header') {
        preview = `H${block.data.level}: ${block.data.text.substring(0, 50)}...`;
      } else if (block.type === 'paragraph') {
        preview = `Text: ${block.data.text.substring(0, 60)}...`;
      } else if (block.type === 'list') {
        preview = `${block.data.style} list: ${block.data.items.length} items`;
      } else if (block.type === 'quote') {
        preview = `Quote: ${block.data.text.substring(0, 50)}...`;
      } else {
        preview = JSON.stringify(block.data).substring(0, 50) + '...';
      }
      
      console.log(`${index + 1}. ${block.type.toUpperCase()}: ${preview}`);
    });
    
    if (editorJSData.blocks.length > 6) {
      console.log(`... and ${editorJSData.blocks.length - 6} more blocks`);
    }
    
    // Step 6: Final assessment
    console.log('\n🎯 Step 6: Final Assessment...');
    
    if (allValidationsPassed && hasGoodStructure) {
      console.log('🎉 COMPLETE SUCCESS: AI Content Generation with Structured HTML is working perfectly!');
      console.log('✅ AI generates well-structured HTML content');
      console.log('✅ HTML converts to proper EditorJS blocks');
      console.log('✅ Multiple content types supported (headers, paragraphs, lists, quotes)');
      console.log('✅ Content structure and hierarchy preserved');
      console.log('✅ Ready for production use');
    } else {
      console.log('⚠️ Partial success - some improvements needed');
      if (!hasGoodStructure) console.log('- AI HTML structure needs improvement');
      if (!allValidationsPassed) console.log('- EditorJS conversion needs refinement');
    }
    
    console.log('\n📊 Summary Statistics:');
    console.log(`📝 Generated Content: ${generatedContent.content.length} characters`);
    console.log(`🔧 HTML Elements: ${Object.values(htmlAnalysis).reduce((a, b) => a + b, 0)} total`);
    console.log(`📦 EditorJS Blocks: ${editorJSData.blocks.length} blocks`);
    console.log(`🎯 Block Types: ${Object.keys(blockTypes).length} different types`);
    
    if (aiResult.usage) {
      console.log(`💰 OpenAI Usage: ${aiResult.usage.totalTokens} tokens (~$${(aiResult.usage.totalTokens * 0.00003).toFixed(4)})`);
    }
    
    console.log('\n🔗 Test URLs:');
    console.log('📝 Create New Blog: http://localhost:3001/admin/blogs/new');
    console.log('📋 Blog Listing: http://localhost:3001/blog');
    console.log('⚙️ Admin Dashboard: http://localhost:3001/admin/blogs');
    
    return {
      success: allValidationsPassed && hasGoodStructure,
      generatedContent,
      editorJSData,
      htmlAnalysis,
      blockTypes
    };
    
  } catch (error) {
    console.error('❌ Complete workflow test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the complete test
testCompleteAIWorkflow().then(result => {
  if (result.success) {
    console.log('\n🎉 WORKFLOW TEST: PASSED');
  } else {
    console.log('\n❌ WORKFLOW TEST: FAILED');
  }
});
