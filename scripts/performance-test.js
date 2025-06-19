#!/usr/bin/env node

/**
 * Performance Testing Script
 * Tests server response times and identifies bottlenecks
 */

const https = require('https');
const http = require('http');

async function testResponseTime(url, iterations = 5) {
  console.log(`🔍 Testing response time for: ${url}`);
  console.log(`📊 Running ${iterations} iterations...\n`);

  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    
    try {
      await makeRequest(url);
      const responseTime = Date.now() - start;
      times.push(responseTime);
      
      const status = responseTime <= 800 ? '✅' : '⚠️';
      console.log(`${status} Iteration ${i + 1}: ${responseTime}ms`);
    } catch (error) {
      console.log(`❌ Iteration ${i + 1}: Error - ${error.message}`);
    }
  }
  
  if (times.length > 0) {
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    console.log('\n📈 Results:');
    console.log(`   Average: ${avg.toFixed(2)}ms`);
    console.log(`   Minimum: ${min}ms`);
    console.log(`   Maximum: ${max}ms`);
    console.log(`   Target:  ≤800ms`);
    
    if (avg <= 800) {
      console.log('🎉 PASSED: Average response time is within target!');
    } else {
      console.log('⚠️  NEEDS IMPROVEMENT: Average response time exceeds 800ms');
      console.log('\n💡 Optimization suggestions:');
      console.log('   - Enable database connection pooling');
      console.log('   - Add response caching');
      console.log('   - Optimize database queries');
      console.log('   - Use CDN for static assets');
    }
  }
  
  return times;
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
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

async function testMultipleEndpoints() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const endpoints = [
    `${baseUrl}/`,
    `${baseUrl}/api/blogs`,
    `${baseUrl}/about`,
    `${baseUrl}/services`,
    `${baseUrl}/contact`
  ];
  
  console.log('🚀 Performance Testing Suite\n');
  console.log('=' .repeat(50));
  
  for (const endpoint of endpoints) {
    await testResponseTime(endpoint, 3);
    console.log('\n' + '-'.repeat(50) + '\n');
  }
  
  console.log('✅ Performance testing complete!');
  console.log('\n📋 Optimization Checklist:');
  console.log('   □ Database indexes created');
  console.log('   □ Response caching enabled');
  console.log('   □ Connection pooling configured');
  console.log('   □ Static asset optimization');
  console.log('   □ CDN configuration');
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    testMultipleEndpoints();
  } else {
    const url = args[0];
    const iterations = parseInt(args[1]) || 5;
    testResponseTime(url, iterations);
  }
}

module.exports = { testResponseTime, testMultipleEndpoints };
