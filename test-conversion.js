// Simple Node.js script to test content conversion
const fs = require('fs');
const path = require('path');

// Mock the required functions
function htmlToEditorJSServer(html) {
  const cleanHtml = html
    .replace(/\[object Object\]/g, '')
    .replace(/\[object [^\]]+\]/g, '')
    .trim();

  const blocks = [];
  let blockId = 1;

  // Normalize HTML
  const normalizedHtml = cleanHtml
    .replace(/></g, '>\n<')
    .replace(/(<\/[^>]+>)([^<])/g, '$1\n$2')
    .replace(/([^>])(<[^\/])/g, '$1\n$2')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n');

  // Split into blocks
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

  // Process each block
  htmlBlocks.forEach(block => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // Extract unordered lists
    const ulMatch = trimmed.match(/<ul[^>]*>(.*?)<\/ul>/is);
    if (ulMatch) {
      const items = ulMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li =>
        li.replace(/<\/?li[^>]*>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\[object Object\]/g, '')
          .replace(/\[object [^\]]+\]/g, '')
          .trim()
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
        li.replace(/<\/?li[^>]*>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\[object Object\]/g, '')
          .replace(/\[object [^\]]+\]/g, '')
          .trim()
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

    // Handle other elements (simplified)
    if (trimmed.match(/^<h[1-6]/)) {
      const level = parseInt(trimmed.match(/^<h([1-6])/)[1]);
      const text = trimmed.replace(/<[^>]*>/g, '').trim();
      if (text) {
        blocks.push({
          id: `heading-${blockId++}`,
          type: 'header',
          data: { text, level }
        });
      }
    } else if (trimmed.match(/^<p/)) {
      const text = trimmed.replace(/<[^>]*>/g, '').trim();
      if (text) {
        blocks.push({
          id: `paragraph-${blockId++}`,
          type: 'paragraph',
          data: { text }
        });
      }
    }
  });

  return {
    time: Date.now(),
    blocks: blocks,
    version: '2.28.2'
  };
}

function editorDataToHtml(data) {
  if (!data || !data.blocks) return '';

  return data.blocks.map(block => {
    switch (block.type) {
      case 'header':
        const level = block.data.level || 2;
        return `<h${level}>${block.data.text || ''}</h${level}>`;
      
      case 'paragraph':
        return `<p>${block.data.text || ''}</p>`;
      
      case 'list':
        const style = block.data.style || 'unordered';
        const tag = style === 'ordered' ? 'ol' : 'ul';
        const items = (block.data.items || []).map(item => `<li>${item}</li>`).join('');
        return `<${tag}>${items}</${tag}>`;
      
      case 'quote':
        return `<blockquote>${block.data.text || ''}</blockquote>`;
      
      default:
        return '';
    }
  }).filter(html => html).join('\n');
}

// Test HTML
const testHtml = `
<h2>Test Blog Content with Lists</h2>
<p>This is a test to debug the content conversion process.</p>

<h3>Requirements for Company Registration</h3>
<ul>
  <li>Digital Signature Certificate (DSC) for all directors</li>
  <li>Director Identification Number (DIN) for all directors</li>
  <li>Company name reservation through RUN service</li>
  <li>Memorandum of Association (MOA) and Articles of Association (AOA)</li>
  <li>Registered office address proof</li>
</ul>

<h3>Step-by-Step Registration Process</h3>
<ol>
  <li>Obtain Digital Signature Certificate for all proposed directors</li>
  <li>Apply for Director Identification Number (DIN) for each director</li>
  <li>Reserve the company name through the RUN (Reserve Unique Name) service</li>
  <li>Prepare and file incorporation documents with the Registrar of Companies</li>
  <li>Pay the required government fees and stamp duty</li>
  <li>Receive Certificate of Incorporation from ROC</li>
</ol>

<p>This content should maintain all lists after conversion.</p>
`;

console.log('=== CONTENT CONVERSION TEST ===\n');

console.log('1. Original HTML:');
console.log(testHtml);

console.log('\n2. Converting HTML to EditorJS...');
const editorData = htmlToEditorJSServer(testHtml);
console.log('EditorJS blocks:', editorData.blocks.length);
console.log('Block types:', editorData.blocks.map(b => b.type).join(', '));

const listBlocks = editorData.blocks.filter(b => b.type === 'list');
console.log('List blocks found:', listBlocks.length);
listBlocks.forEach((block, index) => {
  console.log(`List ${index + 1} (${block.data.style}):`, block.data.items);
});

console.log('\n3. Converting EditorJS back to HTML...');
const finalHtml = editorDataToHtml(editorData);
console.log('Final HTML:');
console.log(finalHtml);

console.log('\n4. Analysis:');
const originalLists = (testHtml.match(/<ul|<ol/g) || []).length;
const finalLists = (finalHtml.match(/<ul|<ol/g) || []).length;
const originalItems = (testHtml.match(/<li>/g) || []).length;
const finalItems = (finalHtml.match(/<li>/g) || []).length;

console.log(`Original lists: ${originalLists}, Final lists: ${finalLists}`);
console.log(`Original list items: ${originalItems}, Final list items: ${finalItems}`);
console.log(`Lists preserved: ${originalLists === finalLists}`);
console.log(`List items preserved: ${originalItems === finalItems}`);
console.log(`Overall success: ${originalLists === finalLists && originalItems === finalItems}`);

if (originalLists !== finalLists || originalItems !== finalItems) {
  console.log('\n❌ ISSUE DETECTED: Lists are being lost during conversion!');
  if (listBlocks.length > 0 && finalLists === 0) {
    console.log('Problem is in editorDataToHtml function');
  } else if (listBlocks.length === 0) {
    console.log('Problem is in htmlToEditorJSServer function');
  }
} else {
  console.log('\n✅ SUCCESS: All lists preserved!');
}
