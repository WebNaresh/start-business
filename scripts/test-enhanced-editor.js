#!/usr/bin/env node

/**
 * Enhanced Blog Editor Test Script
 * Tests core functionality of the enhanced editor components
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Enhanced Blog Editor - Component Test\n');
console.log('=' .repeat(50));

// Test 1: Check if all required files exist
console.log('\n📁 File Existence Test:');

const requiredFiles = [
  'components/ui/enhanced-editor.tsx',
  'components/ui/enhanced-editor-toolbar.tsx', 
  'components/blog/content-import-dialog.tsx',
  'lib/smart-content-parser.ts',
  'components/blog/blog-form.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  const exists = fs.existsSync(filePath);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Test 2: Check file sizes (ensure they're not empty)
console.log('\n📊 File Size Test:');

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const status = stats.size > 1000 ? '✅' : '⚠️';
    console.log(`   ${status} ${file}: ${sizeKB} KB`);
  }
});

// Test 3: Check for required imports and exports
console.log('\n🔍 Code Structure Test:');

const codeTests = [
  {
    file: 'components/ui/enhanced-editor.tsx',
    checks: [
      'export interface EditorRef',
      'parseHTMLToBlocks',
      'handlePaste',
      'forwardRef<EditorRef'
    ]
  },
  {
    file: 'components/ui/enhanced-editor-toolbar.tsx', 
    checks: [
      'EnhancedEditorToolbarProps',
      'handleSmartPaste',
      'handleFormatCleanup',
      'renderToolButton'
    ]
  },
  {
    file: 'components/blog/content-import-dialog.tsx',
    checks: [
      'ContentImportDialogProps',
      'parseSmartContent',
      'detectContentSource',
      'handleImport'
    ]
  },
  {
    file: 'lib/smart-content-parser.ts',
    checks: [
      'export function parseSmartContent',
      'export function detectContentSource',
      'parseAIContent',
      'convertInlineFormatting'
    ]
  }
];

codeTests.forEach(test => {
  const filePath = path.join(process.cwd(), test.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n   📄 ${test.file}:`);
    
    test.checks.forEach(check => {
      const found = content.includes(check);
      console.log(`      ${found ? '✅' : '❌'} ${check}`);
    });
  }
});

// Test 4: Check for potential issues
console.log('\n⚠️  Potential Issues Check:');

const issueChecks = [
  {
    file: 'components/ui/enhanced-editor.tsx',
    issues: [
      { pattern: /console\.log/g, name: 'Debug console.log statements' },
      { pattern: /TODO|FIXME/g, name: 'TODO/FIXME comments' },
      { pattern: /any\[\]/g, name: 'Untyped arrays' }
    ]
  },
  {
    file: 'components/blog/blog-form.tsx',
    issues: [
      { pattern: /import.*enhanced-editor/g, name: 'Enhanced editor import', invert: true }
    ]
  }
];

issueChecks.forEach(test => {
  const filePath = path.join(process.cwd(), test.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n   📄 ${test.file}:`);
    
    test.issues.forEach(issue => {
      const matches = content.match(issue.pattern);
      const found = matches && matches.length > 0;
      const status = issue.invert ? (found ? '✅' : '❌') : (found ? '⚠️' : '✅');
      const count = found ? ` (${matches.length})` : '';
      console.log(`      ${status} ${issue.name}${count}`);
    });
  }
});

// Test 5: Dependencies check
console.log('\n📦 Dependencies Test:');

const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = [
    '@editorjs/editorjs',
    '@editorjs/header',
    '@editorjs/list',
    '@editorjs/paragraph',
    'lucide-react',
    'sonner'
  ];
  
  requiredDeps.forEach(dep => {
    const exists = dependencies[dep];
    console.log(`   ${exists ? '✅' : '❌'} ${dep}${exists ? ` (${exists})` : ''}`);
  });
}

// Test 6: Build compatibility
console.log('\n🏗️  Build Compatibility:');

const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
if (fs.existsSync(nextConfigPath)) {
  console.log('   ✅ Next.js config exists');
  
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  const hasSSRConfig = configContent.includes('ssr: false');
  console.log(`   ${hasSSRConfig ? '✅' : '⚠️'} SSR disabled for editor components`);
}

const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('   ✅ TypeScript config exists');
}

// Test Summary
console.log('\n📋 Test Summary:');
console.log('=' .repeat(50));

if (allFilesExist) {
  console.log('✅ All required files exist');
} else {
  console.log('❌ Some required files are missing');
}

console.log('\n🎯 Manual Testing Required:');
console.log('1. Open http://localhost:3000/admin/blogs/new');
console.log('2. Test enhanced editor functionality');
console.log('3. Try content import dialog');
console.log('4. Test smart paste features');
console.log('5. Verify formatting preservation');

console.log('\n📚 Test Resources:');
console.log('- Test Plan: tests/enhanced-blog-editor-test-plan.md');
console.log('- Test Content: tests/test-content-samples.md');
console.log('- Documentation: docs/ENHANCED_BLOG_EDITOR.md');

console.log('\n🚀 Ready for Testing!');
console.log('\nNext Steps:');
console.log('1. Start development server: npm run dev');
console.log('2. Open blog editor in browser');
console.log('3. Follow test plan for comprehensive testing');
console.log('4. Report any issues found');

console.log('\n' + '=' .repeat(50));
console.log('Enhanced Blog Editor Test Complete! 🎉');
