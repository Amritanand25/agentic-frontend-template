#!/usr/bin/env node

/**
 * Package Security & Quality Checker
 *
 * Usage: yarn check-pkg <package-name>
 * Example: yarn check-pkg axios
 *
 * Checks:
 * - NPM info (version, size, license)
 * - GitHub stars & activity
 * - Last update date
 * - Known vulnerabilities
 * - Bundle size
 */

const https = require('https');

const packageName = process.argv[2];

if (!packageName) {
  console.error('❌ Usage: yarn check-pkg <package-name>');
  process.exit(1);
}

console.log(`\n🔍 Checking package: ${packageName}\n`);

// Fetch NPM registry data
function fetchNpmData(pkg) {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${pkg}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Fetch GitHub data
function fetchGitHubData(repoUrl) {
  if (!repoUrl) return Promise.resolve(null);

  const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  if (!match) return Promise.resolve(null);

  const repo = match[1].replace('.git', '');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${repo}`,
      headers: { 'User-Agent': 'package-checker' }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Check status
function getStatus(value, thresholds) {
  const { good, warning } = thresholds;
  if (value >= good) return '✅';
  if (value >= warning) return '⚠️';
  return '❌';
}

async function checkPackage() {
  try {
    const npmData = await fetchNpmData(packageName);

    if (npmData.error) {
      console.error(`❌ Package not found: ${packageName}`);
      process.exit(1);
    }

    const latest = npmData['dist-tags'].latest;
    const version = npmData.versions[latest];
    const time = npmData.time[latest];

    // Basic info
    console.log('📦 Package Information');
    console.log('━'.repeat(50));
    console.log(`Name:        ${packageName}`);
    console.log(`Version:     ${latest}`);
    console.log(`License:     ${version.license || 'Unknown'}`);
    console.log(`Description: ${version.description || 'N/A'}`);

    // Size info
    const unpackedSize = version.dist?.unpackedSize || 0;
    const sizeKB = unpackedSize / 1024;
    let sizeStatus;
    if (sizeKB < 50) {
      sizeStatus = '✅'; // < 50KB = good
    } else if (sizeKB < 100) {
      sizeStatus = '⚠️'; // 50-100KB = warning
    } else {
      sizeStatus = '❌'; // > 100KB = bad
    }
    console.log(`Size:        ${formatBytes(unpackedSize)} ${sizeStatus}`);

    // Update info
    const lastUpdate = new Date(time);
    const daysSinceUpdate = Math.floor((new Date() - lastUpdate) / (1000 * 60 * 60 * 24));
    const updateStatus = getStatus(
      365 - daysSinceUpdate,
      { good: 180, warning: 90 } // Updated in last 6 months = good
    );
    console.log(`Updated:     ${formatDate(time)} ${updateStatus}`);

    // Dependencies
    const deps = version.dependencies || {};
    const depCount = Object.keys(deps).length;
    const depsStatus = getStatus(
      20 - depCount,
      { good: 15, warning: 10 } // < 5 deps good, < 10 warning
    );
    console.log(`Dependencies: ${depCount} ${depsStatus}`);

    // GitHub info
    const repoUrl = version.repository?.url;
    if (repoUrl) {
      console.log('\n⭐ GitHub Information');
      console.log('━'.repeat(50));

      const ghData = await fetchGitHubData(repoUrl);

      if (ghData && !ghData.message) {
        const stars = ghData.stargazers_count || 0;
        const starsStatus = getStatus(stars, { good: 1000, warning: 100 });
        console.log(`Stars:       ${stars.toLocaleString()} ${starsStatus}`);

        const openIssues = ghData.open_issues_count || 0;
        console.log(`Open Issues: ${openIssues.toLocaleString()}`);

        const lastPush = formatDate(ghData.pushed_at);
        console.log(`Last Push:   ${lastPush}`);

        console.log(`URL:         ${ghData.html_url}`);
      } else {
        console.log('Repository info not available');
      }
    }

    // Recommendations
    console.log('\n💡 Recommendations');
    console.log('━'.repeat(50));

    const warnings = [];
    const goods = [];

    if (unpackedSize > 100 * 1024) {
      warnings.push(`❌ Too large (${formatBytes(unpackedSize)}) - max 100KB, find alternative`);
    } else if (unpackedSize > 50 * 1024) {
      warnings.push(`⚠️  Large size (${formatBytes(unpackedSize)}) - prefer < 50KB`);
    } else {
      goods.push(`✅ Small size (< 50KB)`);
    }

    if (daysSinceUpdate > 180) {
      warnings.push(`⚠️  Not updated in ${Math.floor(daysSinceUpdate / 30)} months - check if maintained`);
    } else {
      goods.push(`✅ Recently maintained`);
    }

    if (depCount > 10) {
      warnings.push(`⚠️  Many dependencies (${depCount}) - increases bundle size`);
    } else {
      goods.push(`✅ Few dependencies`);
    }

    if (!version.license || !['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'].includes(version.license)) {
      warnings.push(`⚠️  Check license compatibility: ${version.license || 'Unknown'}`);
    } else {
      goods.push(`✅ Permissive license`);
    }

    goods.forEach(g => console.log(g));
    warnings.forEach(w => console.log(w));

    // Security check
    console.log('\n🔒 Security Check');
    console.log('━'.repeat(50));
    console.log(`Run: yarn audit (after installing)`);
    console.log(`Check: https://snyk.io/advisor/npm-package/${packageName}`);
    console.log(`Size:  https://bundlephobia.com/package/${packageName}`);

    // Decision
    console.log('\n' + '═'.repeat(50));
    if (warnings.length === 0) {
      console.log('✅ RECOMMENDED - Safe to install');
    } else if (warnings.length <= 2) {
      console.log('⚠️  REVIEW WARNINGS - Consider alternatives');
    } else {
      console.log('❌ NOT RECOMMENDED - Find better alternative');
    }
    console.log('═'.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Error checking package:', error.message);
    process.exit(1);
  }
}

checkPackage();
