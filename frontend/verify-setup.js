#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run with: node verify-setup.js
 */

const http = require('http');

console.log('🔍 Verifying Frontend Setup...\n');

// Check 1: Backend connectivity
console.log('1️⃣  Checking backend connectivity...');

const checkBackend = new Promise((resolve) => {
  const req = http.get('http://localhost:8000/docs', (res) => {
    if (res.statusCode === 200) {
      console.log('   ✅ Backend is running on http://localhost:8000');
      resolve(true);
    } else {
      console.log(`   ⚠️  Backend responded with status ${res.statusCode}`);
      resolve(false);
    }
  });

  req.on('error', (error) => {
    console.log('   ❌ Backend is NOT running on http://localhost:8000');
    console.log('   💡 Start the backend with: python main.py');
    resolve(false);
  });

  req.setTimeout(3000, () => {
    req.destroy();
    console.log('   ❌ Backend connection timeout');
    resolve(false);
  });
});

// Check 2: Node modules
console.log('\n2️⃣  Checking node_modules...');
const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ node_modules directory exists');
  
  // Check key dependencies
  const deps = ['react', 'react-router-dom', 'axios', 'tailwindcss'];
  let allDepsInstalled = true;
  
  deps.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
      console.log(`   ✅ ${dep} is installed`);
    } else {
      console.log(`   ❌ ${dep} is NOT installed`);
      allDepsInstalled = false;
    }
  });
  
  if (!allDepsInstalled) {
    console.log('   💡 Run: npm install');
  }
} else {
  console.log('   ❌ node_modules directory not found');
  console.log('   💡 Run: npm install');
}

// Check 3: Environment file
console.log('\n3️⃣  Checking environment configuration...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  if (envContent.includes('VITE_API_URL')) {
    console.log('   ✅ VITE_API_URL is configured');
  } else {
    console.log('   ⚠️  VITE_API_URL not found in .env');
  }
} else {
  console.log('   ⚠️  .env file not found (optional)');
  console.log('   💡 Copy .env.example to .env if you need custom API URL');
}

// Check 4: Required files
console.log('\n4️⃣  Checking required files...');
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'tailwind.config.js',
  'index.html',
  'src/App.jsx',
  'src/main.jsx',
  'src/services/api.js',
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} is missing`);
  }
});

// Summary
checkBackend.then((backendRunning) => {
  console.log('\n' + '='.repeat(50));
  console.log('📋 Summary\n');
  
  if (backendRunning) {
    console.log('✅ Backend is ready');
  } else {
    console.log('❌ Backend needs to be started');
    console.log('   Run: python main.py (from project root)');
  }
  
  console.log('\n🚀 To start the frontend:');
  console.log('   npm run dev');
  console.log('\n📖 For troubleshooting, see: TROUBLESHOOTING.md');
  console.log('='.repeat(50) + '\n');
});
