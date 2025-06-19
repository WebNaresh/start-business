#!/usr/bin/env node

/**
 * Blog 404 Fix Script
 * Diagnoses and fixes common blog 404 issues
 */

const fs = require('fs');
const path = require('path');

function checkEnvironmentVariables() {
  console.log('🔍 Checking Environment Variables\n');
  
  const envFile = path.join(process.cwd(), '.env');
  const envLocalFile = path.join(process.cwd(), '.env.local');
  
  console.log('📁 Environment Files:');
  console.log(`   .env exists: ${fs.existsSync(envFile) ? '✅' : '❌'}`);
  console.log(`   .env.local exists: ${fs.existsSync(envLocalFile) ? '✅' : '❌'}`);
  
  // Check for NEXT_PUBLIC_BASE_URL
  const nextPublicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log('\n🌐 Base URL Configuration:');
  console.log(`   NEXT_PUBLIC_BASE_URL: ${nextPublicBaseUrl || '❌ NOT SET'}`);
  
  if (!nextPublicBaseUrl) {
    console.log('\n⚠️  NEXT_PUBLIC_BASE_URL is not set!');
    console.log('💡 Solutions:');
    console.log('   1. Add to .env.local: NEXT_PUBLIC_BASE_URL=https://www.startbusiness.co.in');
    console.log('   2. Add to Vercel environment variables');
    console.log('   3. Ensure it\'s available at build time');
  } else {
    console.log(`   ✅ Base URL is set to: ${nextPublicBaseUrl}`);
  }
  
  // Check database URL
  const databaseUrl = process.env.DATABASE_URL;
  console.log('\n🗄️  Database Configuration:');
  console.log(`   DATABASE_URL: ${databaseUrl ? '✅ SET' : '❌ NOT SET'}`);
  
  if (!databaseUrl) {
    console.log('   ⚠️  DATABASE_URL is not set!');
  }
}

function generateEnvTemplate() {
  console.log('\n📝 Environment Variable Template:');
  console.log('=' .repeat(50));
  console.log('# Add these to your .env.local file:');
  console.log('');
  console.log('# Production URL');
  console.log('NEXT_PUBLIC_BASE_URL=https://www.startbusiness.co.in');
  console.log('');
  console.log('# Database');
  console.log('DATABASE_URL="your-database-url-here"');
  console.log('');
  console.log('# Other required variables');
  console.log('OPENAI_API_KEY="your-openai-key"');
  console.log('SMTP_HOST="your-smtp-host"');
  console.log('SMTP_PORT="587"');
  console.log('SMTP_USER="your-smtp-user"');
  console.log('SMTP_PASSWORD="your-smtp-password"');
}

function checkBuildConfiguration() {
  console.log('\n🔧 Build Configuration Check:');
  
  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  console.log(`   next.config.mjs exists: ${fs.existsSync(nextConfigPath) ? '✅' : '❌'}`);
  console.log(`   package.json exists: ${fs.existsSync(packageJsonPath) ? '✅' : '❌'}`);
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log(`   Build script: ${packageJson.scripts?.build || '❌ NOT FOUND'}`);
    console.log(`   Start script: ${packageJson.scripts?.start || '❌ NOT FOUND'}`);
  }
}

function provideSolutions() {
  console.log('\n🚀 Step-by-Step Solutions:');
  console.log('=' .repeat(50));
  
  console.log('\n1. 🌐 Fix Environment Variables:');
  console.log('   • Create .env.local file with NEXT_PUBLIC_BASE_URL');
  console.log('   • Set in Vercel dashboard: Settings > Environment Variables');
  console.log('   • Redeploy after adding environment variables');
  
  console.log('\n2. 🗄️  Check Database Connection:');
  console.log('   • Verify DATABASE_URL is correct');
  console.log('   • Test database connection: npm run db:push');
  console.log('   • Check if blog data exists in production DB');
  
  console.log('\n3. 🔄 Clear Caches:');
  console.log('   • Clear Vercel cache: Deployments > ... > Redeploy');
  console.log('   • Clear browser cache');
  console.log('   • Clear CDN cache if using external CDN');
  
  console.log('\n4. 🚀 Redeploy Application:');
  console.log('   • Push latest code to main branch');
  console.log('   • Trigger new deployment');
  console.log('   • Check deployment logs for errors');
  
  console.log('\n5. 🔍 Debug Steps:');
  console.log('   • Check API endpoint: https://www.startbusiness.co.in/api/blogs/your-slug');
  console.log('   • Check page endpoint: https://www.startbusiness.co.in/blog/your-slug');
  console.log('   • Review Vercel function logs');
  console.log('   • Test locally: npm run build && npm run start');
}

function createFixCommands() {
  console.log('\n⚡ Quick Fix Commands:');
  console.log('=' .repeat(50));
  
  console.log('\n# 1. Check current status');
  console.log('npm run blog:check');
  
  console.log('\n# 2. Test specific blog');
  console.log('npm run blog:check-slug essential-steps-start-business-2025-guide');
  
  console.log('\n# 3. Rebuild and test locally');
  console.log('npm run build && npm run start');
  
  console.log('\n# 4. Check database');
  console.log('npm run db:push');
  console.log('npx prisma studio');
  
  console.log('\n# 5. Performance test');
  console.log('npm run perf:test');
}

// Main execution
console.log('🔧 Blog 404 Diagnostic & Fix Tool\n');
console.log('=' .repeat(60));

checkEnvironmentVariables();
checkBuildConfiguration();
generateEnvTemplate();
provideSolutions();
createFixCommands();

console.log('\n✅ Diagnostic Complete!');
console.log('\n📞 If issues persist:');
console.log('   1. Check Vercel deployment logs');
console.log('   2. Verify database contains blog data');
console.log('   3. Test API endpoints directly');
console.log('   4. Contact support with diagnostic output');
