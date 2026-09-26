#!/usr/bin/env node

/**
 * Jatin Singh Portfolio — Production Build & Deployment Validator
 * Performs genuine structural, configuration, asset, and syntax integrity validation
 * across all project and deployment files without unnecessary framework overhead.
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT_DIR = process.cwd();
let passedChecks = 0;
let failedChecks = 0;

function logPass(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
  passedChecks++;
}

function logFail(msg, detail = '') {
  console.error(`  \x1b[31m✖\x1b[0m ${msg}${detail ? ` (${detail})` : ''}`);
  failedChecks++;
}

function validateFileExists(relativePath, description) {
  const fullPath = resolve(ROOT_DIR, relativePath);
  if (!existsSync(fullPath)) {
    logFail(`${description} missing: ${relativePath}`);
    return false;
  }
  const stat = statSync(fullPath);
  if (stat.size === 0) {
    logFail(`${description} is empty: ${relativePath}`);
    return false;
  }
  logPass(`${description} verified: ${relativePath} (${stat.size} bytes)`);
  return true;
}

function validateJson(relativePath, requiredKeys = [], validatorFn = null) {
  const fullPath = resolve(ROOT_DIR, relativePath);
  if (!existsSync(fullPath)) {
    logFail(`JSON file missing: ${relativePath}`);
    return null;
  }
  try {
    const raw = readFileSync(fullPath, 'utf8');
    const parsed = JSON.parse(raw);
    for (const key of requiredKeys) {
      if (parsed[key] === undefined) {
        logFail(`JSON key '${key}' missing in ${relativePath}`);
        return null;
      }
    }
    if (validatorFn && !validatorFn(parsed)) {
      return null;
    }
    logPass(`Valid JSON configuration: ${relativePath}`);
    return parsed;
  } catch (err) {
    logFail(`Invalid JSON in ${relativePath}`, err.message);
    return null;
  }
}

console.log('\n\x1b[1m\x1b[36m▶ Running Production Validation & Integrity Suite\x1b[0m\n');

// 1. Configuration Validation
console.log('\x1b[1m[1/5] Validating Project & Deployment Configurations\x1b[0m');
validateJson('package.json', ['name', 'scripts', 'main'], (pkg) => {
  const reqScripts = ['dev', 'start', 'lint', 'build'];
  for (const s of reqScripts) {
    if (!pkg.scripts[s]) {
      logFail(`package.json missing script '${s}'`);
      return false;
    }
  }
  logPass('package.json scripts verified [dev, start, lint, build]');
  return true;
});

validateJson('metadata.json', ['name', 'description']);

validateJson('vercel.json', ['version', 'builds', 'routes', 'headers'], (v) => {
  const headersObj = v.headers?.find(h => h.source === '/(.*)');
  if (!headersObj || !Array.isArray(headersObj.headers)) {
    logFail('vercel.json missing global headers configuration');
    return false;
  }
  const headerKeys = headersObj.headers.map(h => h.key.toLowerCase());
  const requiredHeaders = [
    'strict-transport-security',
    'x-content-type-options',
    'referrer-policy',
    'permissions-policy',
    'content-security-policy'
  ];
  for (const reqH of requiredHeaders) {
    if (!headerKeys.includes(reqH)) {
      logFail(`vercel.json missing required security header '${reqH}'`);
      return false;
    }
  }
  logPass('vercel.json edge deployment and security headers verified');
  return true;
});

// 2. Core HTML Documents
console.log('\n\x1b[1m[2/5] Validating HTML Entry Points & DOM Anchors\x1b[0m');
if (validateFileExists('index.html', 'Main HTML entry')) {
  const indexContent = readFileSync(resolve(ROOT_DIR, 'index.html'), 'utf8');
  
  const requiredAnchors = [
    'id="cyber-3d-canvas"',
    'id="security-lab-container"',
    'id="arch-nodes-container"',
    'id="skills-container"',
    'id="command-palette"',
    'id="terminal-modal"',
    'id="case-study-modal"',
    'id="contact-form"'
  ];

  for (const anchor of requiredAnchors) {
    if (indexContent.includes(anchor)) {
      logPass(`DOM anchor verified: ${anchor}`);
    } else {
      logFail(`Required DOM anchor missing in index.html: ${anchor}`);
    }
  }

  // Verify scripts referenced in index.html exist
  const scriptRegex = /src=["']([^"']+\.js)["']/g;
  let match;
  while ((match = scriptRegex.exec(indexContent)) !== null) {
    const srcPath = match[1];
    if (!srcPath.startsWith('http')) {
      validateFileExists(srcPath, 'Referenced script');
    }
  }
}

if (validateFileExists('resume.html', 'Resume page')) {
  const resumeContent = readFileSync(resolve(ROOT_DIR, 'resume.html'), 'utf8');
  if (resumeContent.includes('id="btn-print"')) {
    logPass('Resume print trigger anchor verified (#btn-print)');
  } else {
    logFail('Missing #btn-print trigger in resume.html');
  }
  validateFileExists('assets/js/resume.js', 'Resume print script');
}

// 3. Stylesheets, Visual Assets & SEO Artifacts
console.log('\n\x1b[1m[3/6] Validating Stylesheets, Visual Assets & SEO Artifacts\x1b[0m');
validateFileExists('assets/css/main.css', 'Master stylesheet');
validateFileExists('assets/js/vendor/three.module.js', 'Three.js vendored module');

// SEO assets
validateFileExists('robots.txt', 'Search engine robots policy');
validateFileExists('sitemap.xml', 'Search engine sitemap');
validateFileExists('site.webmanifest', 'Web application manifest');
validateFileExists('assets/icons/favicon.svg', 'SVG favicon');
validateFileExists('assets/icons/apple-touch-icon.png', 'Apple touch icon');

validateJson('site.webmanifest', ['name', 'short_name', 'start_url', 'icons']);

// Verify robots.txt and sitemap.xml content
if (existsSync(resolve(ROOT_DIR, 'robots.txt'))) {
  const robots = readFileSync(resolve(ROOT_DIR, 'robots.txt'), 'utf8');
  if (robots.includes('Allow: /') && robots.includes('sitemap.xml')) {
    logPass('robots.txt correctly allows indexing and points to sitemap');
  } else {
    logFail('robots.txt missing Allow: / or sitemap.xml reference');
  }
}

if (existsSync(resolve(ROOT_DIR, 'sitemap.xml'))) {
  const sitemap = readFileSync(resolve(ROOT_DIR, 'sitemap.xml'), 'utf8');
  if (sitemap.includes('https://jatinsingh-portfolio.vercel.app/')) {
    logPass('sitemap.xml references correct production domain (vercel.app)');
  } else {
    logFail('sitemap.xml missing production domain reference');
  }
}

if (existsSync(resolve(ROOT_DIR, 'index.html'))) {
  const indexContent = readFileSync(resolve(ROOT_DIR, 'index.html'), 'utf8');
  if (indexContent.includes('jatinsingh82.github.io')) {
    logFail('index.html still contains legacy github.io domain');
  } else {
    logPass('index.html legacy domain cleanup verified');
  }
  if (indexContent.includes('rel="canonical" href="https://jatinsingh-portfolio.vercel.app/"')) {
    logPass('index.html canonical URL verified');
  } else {
    logFail('index.html missing correct canonical tag');
  }
}

if (existsSync(resolve(ROOT_DIR, 'index.html'))) {
  const indexContent = readFileSync(resolve(ROOT_DIR, 'index.html'), 'utf8');
  const imgRegex = /src=["'](src\/assets\/images\/[^"']+)["']/g;
  let imgMatch;
  const verifiedImages = new Set();
  while ((imgMatch = imgRegex.exec(indexContent)) !== null) {
    const imgPath = imgMatch[1];
    if (!verifiedImages.has(imgPath)) {
      verifiedImages.add(imgPath);
      validateFileExists(imgPath, 'Referenced image asset');
    }
  }
}

// 4. Server & Route Syntax Verification
console.log('\n\x1b[1m[4/5] Validating Server & Script Syntax Integrity\x1b[0m');
const jsFiles = [
  'server.js',
  'assets/js/cinematic-config.js',
  'assets/js/cinematic-engine.js',
  'assets/js/data.js',
  'assets/js/main.js',
  'assets/js/interactive-3d-background.js',
  'assets/js/resume.js'
];

for (const file of jsFiles) {
  const fullPath = resolve(ROOT_DIR, file);
  const result = spawnSync(process.execPath, ['--check', fullPath], { encoding: 'utf8' });
  if (result.status === 0) {
    logPass(`Syntax check passed: ${file}`);
  } else {
    logFail(`Syntax check failed in ${file}`, result.stderr.trim());
  }
}

// 5. Summary & Exit Status
console.log('\n\x1b[1m[5/5] Validation Summary\x1b[0m');
console.log(`  Passed Checks: \x1b[32m${passedChecks}\x1b[0m`);
if (failedChecks > 0) {
  console.error(`  Failed Checks: \x1b[31m${failedChecks}\x1b[0m`);
  console.error('\n\x1b[31m✖ Validation failed. Correct the errors above before deployment.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\n\x1b[32m✔ All build and deployment validation checks passed successfully.\x1b[0m\n');
  process.exit(0);
}
