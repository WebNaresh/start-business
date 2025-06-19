#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes JavaScript bundle sizes and identifies optimization opportunities
 */

const fs = require('fs');
const path = require('path');

function analyzeBundle() {
  console.log('🔍 Analyzing JavaScript Bundle Sizes...\n');

  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Please run "npm run build" first.');
    return;
  }

  // Analyze static chunks
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    analyzeStaticFiles(staticDir);
  }

  // Check for unminified files
  checkForUnminifiedFiles(buildDir);
  
  console.log('\n📊 Bundle Analysis Complete!');
  console.log('\n💡 Optimization Tips:');
  console.log('1. Use dynamic imports for large components');
  console.log('2. Enable tree shaking by avoiding default exports');
  console.log('3. Use Next.js built-in optimizations');
  console.log('4. Consider code splitting for large pages');
}

function analyzeStaticFiles(staticDir) {
  console.log('📦 Static JavaScript Files:');
  
  const jsFiles = [];
  
  function findJSFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findJSFiles(filePath);
      } else if (file.endsWith('.js')) {
        const size = stat.size;
        const sizeKB = (size / 1024).toFixed(2);
        const relativePath = path.relative(process.cwd(), filePath);
        
        jsFiles.push({
          path: relativePath,
          size: size,
          sizeKB: sizeKB,
          isMinified: isMinified(filePath)
        });
      }
    });
  }
  
  findJSFiles(staticDir);
  
  // Sort by size (largest first)
  jsFiles.sort((a, b) => b.size - a.size);
  
  jsFiles.forEach(file => {
    const status = file.isMinified ? '✅ Minified' : '⚠️  Not Minified';
    console.log(`  ${file.path} - ${file.sizeKB} KB - ${status}`);
  });
  
  const totalSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSizeKB = (totalSize / 1024).toFixed(2);
  console.log(`\n📊 Total JavaScript Size: ${totalSizeKB} KB`);
  
  // Check for large files
  const largeFiles = jsFiles.filter(file => file.size > 100 * 1024); // > 100KB
  if (largeFiles.length > 0) {
    console.log('\n⚠️  Large JavaScript Files (>100KB):');
    largeFiles.forEach(file => {
      console.log(`  ${file.path} - ${file.sizeKB} KB`);
    });
  }
}

function isMinified(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Check if file appears minified
    // Minified files typically have very long lines and no unnecessary whitespace
    const avgLineLength = content.length / lines.length;
    const hasLongLines = lines.some(line => line.length > 500);
    const hasMinimalWhitespace = content.replace(/\s/g, '').length / content.length > 0.8;
    
    return avgLineLength > 200 || (hasLongLines && hasMinimalWhitespace);
  } catch (error) {
    return false;
  }
}

function checkForUnminifiedFiles(buildDir) {
  console.log('\n🔍 Checking for Unminified Files...');
  
  const unminifiedFiles = [];
  
  function checkDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkDirectory(filePath);
      } else if (file.endsWith('.js') && !file.includes('.min.')) {
        if (!isMinified(filePath)) {
          const relativePath = path.relative(process.cwd(), filePath);
          unminifiedFiles.push(relativePath);
        }
      }
    });
  }
  
  checkDirectory(buildDir);
  
  if (unminifiedFiles.length === 0) {
    console.log('✅ All JavaScript files appear to be minified');
  } else {
    console.log('⚠️  Potentially unminified files found:');
    unminifiedFiles.forEach(file => {
      console.log(`  ${file}`);
    });
  }
}

// Run analysis if script is executed directly
if (require.main === module) {
  analyzeBundle();
}

module.exports = { analyzeBundle };
