#!/usr/bin/env node

/**
 * Configuration Verification Script
 * Run this before deploying to check if everything is configured correctly
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking WhatsApp Bot Configuration...\n');

let issues = [];
let warnings = [];
let passed = 0;

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion >= 18) {
    console.log('✅ Node.js version:', nodeVersion, '(OK)');
    passed++;
} else {
    console.log('❌ Node.js version:', nodeVersion, '(Requires >= 18.x)');
    issues.push('Upgrade Node.js to version 18 or higher');
}

// Check required files
const requiredFiles = [
    'index.js',
    'pair.js',
    'main.html',
    'package.json',
    'Procfile',
    '.gitignore'
];

console.log('\n📁 Checking Required Files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
        console.log(`✅ ${file}`);
        passed++;
    } else {
        console.log(`❌ ${file} - MISSING`);
        issues.push(`Missing file: ${file}`);
    }
});

// Check environment variables
console.log('\n🔐 Checking Environment Variables:');

const requiredEnvVars = [
    'GITHUB_TOKEN',
    'GITHUB_OWNER',
    'GITHUB_REPO'
];

const optionalEnvVars = [
    'PORT',
    'NODE_ENV',
    'OWNER_NUMBER',
    'BOT_PREFIX'
];

requiredEnvVars.forEach(varName => {
    if (process.env[varName]) {
        // Mask sensitive data
        const value = varName.includes('TOKEN') 
            ? process.env[varName].substring(0, 10) + '...'
            : process.env[varName];
        console.log(`✅ ${varName} = ${value}`);
        passed++;
    } else {
        console.log(`❌ ${varName} - NOT SET`);
        issues.push(`Environment variable ${varName} is required`);
    }
});

console.log('\n🔧 Optional Environment Variables:');
optionalEnvVars.forEach(varName => {
    if (process.env[varName]) {
        console.log(`✅ ${varName} = ${process.env[varName]}`);
    } else {
        console.log(`⚠️  ${varName} - Using default`);
        warnings.push(`${varName} not set, using default value`);
    }
});

// Check package.json
console.log('\n📦 Checking package.json:');
try {
    const pkg = require('./package.json');
    
    if (pkg.scripts && pkg.scripts.start) {
        console.log('✅ Start script configured:', pkg.scripts.start);
        passed++;
    } else {
        console.log('❌ Start script missing in package.json');
        issues.push('Add "start" script to package.json');
    }
    
    if (pkg.engines && pkg.engines.node) {
        console.log('✅ Node engine specified:', pkg.engines.node);
        passed++;
    } else {
        console.log('⚠️  Node engine not specified');
        warnings.push('Consider adding "engines" field to package.json');
    }
    
    // Check for dotenv
    if (pkg.dependencies && pkg.dependencies.dotenv) {
        console.log('✅ dotenv dependency found');
        passed++;
    } else {
        console.log('❌ dotenv dependency missing');
        issues.push('Add dotenv to package.json dependencies');
    }
} catch (error) {
    console.log('❌ Could not read package.json:', error.message);
    issues.push('Invalid or missing package.json');
}

// Check Procfile
console.log('\n🚀 Checking Procfile:');
try {
    const procfile = fs.readFileSync('Procfile', 'utf8');
    if (procfile.includes('node index.js')) {
        console.log('✅ Procfile configured correctly');
        passed++;
    } else {
        console.log('⚠️  Procfile exists but may need review');
        warnings.push('Verify Procfile content');
    }
} catch (error) {
    console.log('❌ Could not read Procfile');
    issues.push('Procfile is missing or unreadable');
}

// Check .gitignore
console.log('\n🔒 Checking .gitignore:');
try {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const criticalIgnores = ['.env', 'node_modules', 'session'];
    let allIgnored = true;
    
    criticalIgnores.forEach(item => {
        if (gitignore.includes(item)) {
            console.log(`✅ ${item} is ignored`);
        } else {
            console.log(`❌ ${item} is NOT ignored`);
            allIgnored = false;
            issues.push(`Add ${item} to .gitignore`);
        }
    });
    
    if (allIgnored) passed++;
} catch (error) {
    console.log('⚠️  Could not read .gitignore');
    warnings.push('.gitignore may be missing');
}

// Check for .env file
console.log('\n📝 Checking Configuration Files:');
if (fs.existsSync('.env')) {
    console.log('✅ .env file found (good for local development)');
    console.log('⚠️  Remember: .env should NOT be committed to Git');
    console.log('⚠️  For Clever Cloud: Set variables in the dashboard');
    passed++;
} else {
    console.log('⚠️  .env file not found');
    console.log('   For local testing: Copy .env.example to .env');
    console.log('   For deployment: Set variables in Clever Cloud dashboard');
    warnings.push('Create .env file for local development');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 CONFIGURATION SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Passed checks: ${passed}`);
console.log(`❌ Issues found: ${issues.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);

if (issues.length > 0) {
    console.log('\n❌ ISSUES TO FIX:');
    issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue}`);
    });
}

if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (Optional):');
    warnings.forEach((warning, i) => {
        console.log(`   ${i + 1}. ${warning}`);
    });
}

console.log('\n' + '='.repeat(60));

if (issues.length === 0) {
    console.log('🎉 Configuration looks good!');
    console.log('✅ Ready for deployment to Clever Cloud');
    console.log('\nNext steps:');
    console.log('1. Push code to GitHub');
    console.log('2. Create Clever Cloud application');
    console.log('3. Set environment variables in Clever Cloud dashboard');
    console.log('4. Deploy!');
    console.log('\nSee DEPLOY_GUIDE.md for detailed instructions.');
    process.exit(0);
} else {
    console.log('⚠️  Please fix the issues above before deploying');
    console.log('   Check README.md for configuration help');
    process.exit(1);
}
