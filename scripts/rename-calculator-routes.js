#!/usr/bin/env node

/**
 * Rename all calculator route directories to include "-calculator" suffix
 * This script renames calculator folders to match the updated sitemap URLs
 * Run with: node scripts/rename-calculator-routes.js
 */

const fs = require('fs')
const path = require('path')

// Base path for calculators
const CALCULATORS_BASE = path.join(process.cwd(), 'app', '(pages)', 'calculators', '(calculators)')

// Calculator directories to rename
const calculatorRenames = [
  // Tax calculators
  {
    category: '(tax)',
    renames: [
      { from: 'gst', to: 'gst-calculator' },
      { from: 'income-tax', to: 'income-tax-calculator' },
      { from: 'tds', to: 'tds-calculator' },
      { from: 'hra', to: 'hra-calculator' },
      { from: 'gratuity', to: 'gratuity-calculator' },
      { from: 'salary', to: 'salary-calculator' },
      { from: 'gstr-3b-interest', to: 'gstr-3b-interest-calculator' },
      { from: 'hra-rent-receipt', to: 'hra-rent-receipt-calculator' }
    ]
  },
  // Financial calculators
  {
    category: '(financial)',
    renames: [
      { from: 'sip', to: 'sip-calculator' },
      { from: 'ppf', to: 'ppf-calculator' },
      { from: 'fixed-deposit', to: 'fixed-deposit-calculator' },
      { from: 'rd', to: 'rd-calculator' },
      { from: 'nps', to: 'nps-calculator' },
      { from: 'ssy', to: 'ssy-calculator' },
      { from: 'retirement-corpus', to: 'retirement-corpus-calculator' }
    ]
  },
  // Loan calculators
  {
    category: '(loan)',
    renames: [
      { from: 'home-loan', to: 'home-loan-calculator' },
      { from: 'car-loan', to: 'car-loan-calculator' },
      { from: 'business-loan', to: 'business-loan-calculator' }
    ]
  },
  // Root level calculators
  {
    category: '',
    renames: [
      { from: 'emi', to: 'emi-calculator' }
    ]
  }
]

// Function to check if directory exists
function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (error) {
    return false
  }
}

// Function to rename directory
function renameDirectory(oldPath, newPath) {
  try {
    if (!directoryExists(oldPath)) {
      console.log(`⚠️  Source directory does not exist: ${oldPath}`)
      return false
    }

    if (directoryExists(newPath)) {
      console.log(`⚠️  Target directory already exists: ${newPath}`)
      return false
    }

    fs.renameSync(oldPath, newPath)
    console.log(`✅ Renamed: ${path.basename(oldPath)} → ${path.basename(newPath)}`)
    return true
  } catch (error) {
    console.error(`❌ Error renaming ${oldPath} to ${newPath}:`, error.message)
    return false
  }
}

// Main function to rename all calculator directories
function renameCalculatorDirectories() {
  console.log('🚀 Starting calculator directory renames...\n')

  let totalRenamed = 0
  let totalSkipped = 0

  calculatorRenames.forEach(({ category, renames }) => {
    const categoryPath = category ? path.join(CALCULATORS_BASE, category) : CALCULATORS_BASE
    
    console.log(`📁 Processing category: ${category || 'root'}`)
    
    if (category && !directoryExists(categoryPath)) {
      console.log(`⚠️  Category directory does not exist: ${categoryPath}`)
      return
    }

    renames.forEach(({ from, to }) => {
      const oldPath = path.join(categoryPath, from)
      const newPath = path.join(categoryPath, to)
      
      if (renameDirectory(oldPath, newPath)) {
        totalRenamed++
      } else {
        totalSkipped++
      }
    })
    
    console.log() // Empty line for readability
  })

  console.log('📊 Summary:')
  console.log(`   ✅ Successfully renamed: ${totalRenamed} directories`)
  console.log(`   ⚠️  Skipped: ${totalSkipped} directories`)
  console.log(`   📁 Total processed: ${totalRenamed + totalSkipped} directories`)

  if (totalRenamed > 0) {
    console.log('\n🎉 Calculator directory renames completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Update any internal links or imports that reference these routes')
    console.log('   2. Test the application to ensure all calculator pages work correctly')
    console.log('   3. Update any navigation components that link to these calculators')
  }
}

// Function to list current calculator directories (for verification)
function listCurrentDirectories() {
  console.log('📋 Current calculator directories:\n')

  calculatorRenames.forEach(({ category, renames }) => {
    const categoryPath = category ? path.join(CALCULATORS_BASE, category) : CALCULATORS_BASE
    
    console.log(`📁 Category: ${category || 'root'}`)
    
    if (category && !directoryExists(categoryPath)) {
      console.log(`   ⚠️  Category directory does not exist`)
      return
    }

    renames.forEach(({ from, to }) => {
      const oldPath = path.join(categoryPath, from)
      const newPath = path.join(categoryPath, to)
      
      const oldExists = directoryExists(oldPath)
      const newExists = directoryExists(newPath)
      
      if (oldExists && !newExists) {
        console.log(`   📂 ${from} (ready to rename)`)
      } else if (!oldExists && newExists) {
        console.log(`   ✅ ${to} (already renamed)`)
      } else if (oldExists && newExists) {
        console.log(`   ⚠️  Both ${from} and ${to} exist`)
      } else {
        console.log(`   ❌ Neither ${from} nor ${to} exist`)
      }
    })
    
    console.log()
  })
}

// Command line interface
const command = process.argv[2]

switch (command) {
  case 'list':
    listCurrentDirectories()
    break
  case 'rename':
    renameCalculatorDirectories()
    break
  default:
    console.log('📖 Calculator Route Renamer')
    console.log('\nUsage:')
    console.log('  node scripts/rename-calculator-routes.js list   - List current directories')
    console.log('  node scripts/rename-calculator-routes.js rename - Rename all directories')
    console.log('\nThis script renames calculator directories to include "-calculator" suffix')
    console.log('to match the updated sitemap URLs.')
    break
}
