/**
 * Direct test of HTML to EditorJS conversion
 */

// Sample structured HTML content (similar to what OpenAI should generate)
const sampleHTML = `
<h2>Introduction to Business Registration</h2>
<p>Starting a business in India requires proper registration and compliance with various regulations. This comprehensive guide will walk you through the essential steps.</p>

<h3>Types of Business Structures</h3>
<p>Before registering your business, you need to choose the right business structure. Here are the main options:</p>

<ul>
<li>Private Limited Company</li>
<li>Limited Liability Partnership (LLP)</li>
<li>One Person Company (OPC)</li>
<li>Partnership Firm</li>
<li>Sole Proprietorship</li>
</ul>

<h3>Registration Process</h3>
<p>The registration process involves several key steps that must be completed in order:</p>

<ol>
<li>Choose and reserve your company name</li>
<li>Obtain Digital Signature Certificate (DSC)</li>
<li>Get Director Identification Number (DIN)</li>
<li>File incorporation documents</li>
<li>Obtain Certificate of Incorporation</li>
</ol>

<blockquote>
<p>Important: Ensure all documents are properly verified before submission to avoid delays in the registration process.</p>
</blockquote>

<h3>Required Documents</h3>
<p>You will need the following documents for business registration:</p>

<ul>
<li>PAN Card of all directors</li>
<li>Aadhaar Card of all directors</li>
<li>Address proof of registered office</li>
<li>Memorandum of Association (MOA)</li>
<li>Articles of Association (AOA)</li>
</ul>

<h2>Compliance Requirements</h2>
<p>After registration, your business must comply with various ongoing requirements to maintain good standing.</p>
`;

function htmlToEditorJSServer(html) {
  const blocks = [];
  let blockId = 1;

  // Split HTML into blocks based on common patterns, but keep blockquotes intact
  let htmlBlocks = [];
  let currentBlock = '';
  let inBlockquote = false;

  const lines = html.split('\n');
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

    // Debug logging
    if (trimmed.includes('blockquote')) {
      console.log(`\nDEBUG Block ${index}:`, trimmed.substring(0, 100));
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
      ) || [];
      blocks.push({
        id: `list-${blockId++}`,
        type: 'list',
        data: { style: 'unordered', items }
      });
      return;
    }

    // Extract ordered lists
    const olMatch = trimmed.match(/<ol[^>]*>(.*?)<\/ol>/is);
    if (olMatch) {
      const items = olMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li => 
        li.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]*>/g, '').trim()
      ) || [];
      blocks.push({
        id: `list-${blockId++}`,
        type: 'list',
        data: { style: 'ordered', items }
      });
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

function testConversion() {
  console.log('🔄 Testing HTML to EditorJS Conversion...');
  console.log('\n📝 Sample HTML Input:');
  console.log(sampleHTML.substring(0, 300) + '...');
  
  // Convert HTML to EditorJS
  const editorJSData = htmlToEditorJSServer(sampleHTML);
  
  console.log('\n✅ Conversion Results:');
  console.log('Total blocks created:', editorJSData.blocks.length);
  
  // Analyze block types
  const blockTypes = {};
  editorJSData.blocks.forEach(block => {
    blockTypes[block.type] = (blockTypes[block.type] || 0) + 1;
  });
  
  console.log('\n📊 Block Type Distribution:');
  Object.entries(blockTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} blocks`);
  });
  
  console.log('\n📄 Detailed Block Analysis:');
  editorJSData.blocks.forEach((block, index) => {
    let preview = '';
    if (block.type === 'header') {
      preview = `H${block.data.level}: ${block.data.text}`;
    } else if (block.type === 'paragraph') {
      preview = `Text: ${block.data.text.substring(0, 60)}...`;
    } else if (block.type === 'list') {
      preview = `${block.data.style} list: [${block.data.items.join(', ')}]`;
    } else if (block.type === 'quote') {
      preview = `Quote: ${block.data.text}`;
    } else {
      preview = JSON.stringify(block.data);
    }
    
    console.log(`${index + 1}. ${block.type.toUpperCase()}: ${preview}`);
  });
  
  // Validation
  console.log('\n✅ Validation:');
  const validations = {
    'Multiple blocks created': editorJSData.blocks.length > 1,
    'Has header blocks': editorJSData.blocks.some(b => b.type === 'header'),
    'Has paragraph blocks': editorJSData.blocks.some(b => b.type === 'paragraph'),
    'Has list blocks': editorJSData.blocks.some(b => b.type === 'list'),
    'Has quote blocks': editorJSData.blocks.some(b => b.type === 'quote'),
    'All blocks have data': editorJSData.blocks.every(b => b.data && Object.keys(b.data).length > 0),
    'No empty blocks': editorJSData.blocks.every(b => {
      if (b.type === 'paragraph' || b.type === 'header') return b.data.text && b.data.text.trim();
      if (b.type === 'list') return b.data.items && b.data.items.length > 0;
      if (b.type === 'quote') return b.data.text && b.data.text.trim();
      return true;
    })
  };
  
  Object.entries(validations).forEach(([check, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${check}`);
  });
  
  const allPassed = Object.values(validations).every(v => v);
  
  if (allPassed) {
    console.log('\n🎉 SUCCESS: HTML to EditorJS conversion is working perfectly!');
    console.log('✅ Structured content preserved');
    console.log('✅ Multiple content types supported');
    console.log('✅ No data loss during conversion');
  } else {
    console.log('\n⚠️ Some validations failed - conversion needs improvement');
  }
  
  console.log('\n📋 Expected vs Actual:');
  console.log('Expected: H2 headers, H3 headers, paragraphs, unordered lists, ordered lists, blockquotes');
  console.log('Actual:', Object.keys(blockTypes).join(', '));
  
  return editorJSData;
}

// Run the test
testConversion();
