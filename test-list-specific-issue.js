/**
 * Targeted test to investigate [object Object] issue specifically in HTML lists
 */

async function testListSpecificIssue() {
  try {
    console.log('🔍 INVESTIGATING: [object Object] Issue in HTML Lists');
    console.log('='.repeat(70));
    
    // Test prompts specifically designed to generate lists
    const listGeneratingPrompts = [
      {
        name: 'Advantages/Disadvantages',
        prompt: 'Advantages and disadvantages of LLP vs Private Limited Company',
        expectedLists: 'Both UL and OL lists'
      },
      {
        name: 'Step-by-Step Process',
        prompt: 'Step-by-step process to register a company in India',
        expectedLists: 'Ordered list (OL)'
      },
      {
        name: 'Benefits List',
        prompt: 'Top 5 benefits of GST registration for small businesses',
        expectedLists: 'Unordered list (UL)'
      },
      {
        name: 'Requirements Checklist',
        prompt: 'Documents required for business registration in India',
        expectedLists: 'Unordered list (UL)'
      },
      {
        name: 'Comparison Points',
        prompt: 'Key differences between sole proprietorship and private limited company',
        expectedLists: 'Multiple lists'
      }
    ];
    
    const results = [];
    
    for (let i = 0; i < listGeneratingPrompts.length; i++) {
      const testCase = listGeneratingPrompts[i];
      console.log(`\n🧪 Test ${i + 1}: ${testCase.name}`);
      console.log(`Prompt: "${testCase.prompt}"`);
      console.log(`Expected: ${testCase.expectedLists}`);
      
      try {
        const response = await fetch('http://localhost:3001/api/generate-blog-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: testCase.prompt,
            businessFocus: 'business registration'
          })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(`API Error: ${error.error}`);
        }
        
        const result = await response.json();
        const content = result.content.content;
        
        // Analyze list structure
        const listAnalysis = {
          hasUL: content.includes('<ul>'),
          hasOL: content.includes('<ol>'),
          ulCount: (content.match(/<ul[^>]*>/gi) || []).length,
          olCount: (content.match(/<ol[^>]*>/gi) || []).length,
          liCount: (content.match(/<li[^>]*>/gi) || []).length,
          hasObjectInLists: false,
          objectLocations: []
        };
        
        // Check for [object Object] specifically in list contexts
        const listRegex = /<(ul|ol)[^>]*>(.*?)<\/(ul|ol)>/gis;
        let listMatch;
        let listIndex = 0;
        
        while ((listMatch = listRegex.exec(content)) !== null) {
          listIndex++;
          const listContent = listMatch[2];
          const listType = listMatch[1].toUpperCase();
          
          console.log(`\n📋 ${listType} List ${listIndex}:`);
          console.log(`Content: ${listContent.substring(0, 200)}${listContent.length > 200 ? '...' : ''}`);
          
          // Check for object issues in this specific list
          if (listContent.includes('[object Object]') || listContent.includes('[object ')) {
            listAnalysis.hasObjectInLists = true;
            listAnalysis.objectLocations.push(`${listType} List ${listIndex}`);
            console.log(`❌ FOUND [object Object] in ${listType} List ${listIndex}`);
            
            // Extract individual list items to see which ones have issues
            const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
            let liMatch;
            let liIndex = 0;
            
            while ((liMatch = liRegex.exec(listContent)) !== null) {
              liIndex++;
              const liContent = liMatch[1];
              if (liContent.includes('[object') || liContent.includes('undefined')) {
                console.log(`  ❌ List Item ${liIndex}: "${liContent}"`);
              } else {
                console.log(`  ✅ List Item ${liIndex}: "${liContent.substring(0, 50)}${liContent.length > 50 ? '...' : ''}"`);
              }
            }
          } else {
            console.log(`✅ No object issues in ${listType} List ${listIndex}`);
            
            // Show clean list items
            const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
            let liMatch;
            let liIndex = 0;
            
            while ((liMatch = liRegex.exec(listContent)) !== null) {
              liIndex++;
              const liContent = liMatch[1];
              console.log(`  ✅ List Item ${liIndex}: "${liContent.substring(0, 60)}${liContent.length > 60 ? '...' : ''}"`);
            }
          }
        }
        
        // Overall content check
        const hasObjectAnywhere = content.includes('[object Object]') || content.includes('[object ');
        
        const testResult = {
          name: testCase.name,
          passed: !hasObjectAnywhere,
          listAnalysis,
          hasObjectAnywhere,
          hasObjectInLists: listAnalysis.hasObjectInLists,
          contentLength: content.length
        };
        
        results.push(testResult);
        
        console.log(`\n📊 List Analysis Summary:`);
        console.log(`  UL Lists: ${listAnalysis.ulCount}`);
        console.log(`  OL Lists: ${listAnalysis.olCount}`);
        console.log(`  Total LI Items: ${listAnalysis.liCount}`);
        console.log(`  Object Issues in Lists: ${listAnalysis.hasObjectInLists ? '❌ YES' : '✅ NO'}`);
        console.log(`  Object Issues Anywhere: ${hasObjectAnywhere ? '❌ YES' : '✅ NO'}`);
        
        if (listAnalysis.objectLocations.length > 0) {
          console.log(`  Problem Locations: ${listAnalysis.objectLocations.join(', ')}`);
        }
        
      } catch (error) {
        console.log(`❌ ERROR: ${error.message}`);
        results.push({
          name: testCase.name,
          passed: false,
          error: error.message
        });
      }
      
      console.log('\n' + '-'.repeat(50));
    }
    
    // Analysis Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 LIST-SPECIFIC ISSUE ANALYSIS');
    console.log('='.repeat(70));
    
    const testsWithLists = results.filter(r => r.listAnalysis && (r.listAnalysis.ulCount > 0 || r.listAnalysis.olCount > 0));
    const testsWithObjectsInLists = results.filter(r => r.hasObjectInLists);
    const testsWithObjectsAnywhere = results.filter(r => r.hasObjectAnywhere);
    
    console.log(`\n📈 Statistics:`);
    console.log(`Total tests: ${results.length}`);
    console.log(`Tests with lists: ${testsWithLists.length}`);
    console.log(`Tests with objects in lists: ${testsWithObjectsInLists.length}`);
    console.log(`Tests with objects anywhere: ${testsWithObjectsAnywhere.length}`);
    
    // Hypothesis verification
    console.log(`\n🔬 Hypothesis Verification:`);
    if (testsWithObjectsAnywhere.length === 0) {
      console.log(`✅ NO [object Object] issues found in any content`);
      console.log(`✅ The fix appears to be working correctly`);
    } else if (testsWithObjectsInLists.length === testsWithObjectsAnywhere.length) {
      console.log(`🎯 HYPOTHESIS CONFIRMED: [object Object] issues are LIST-SPECIFIC`);
      console.log(`❌ All object issues occur only in list elements`);
    } else if (testsWithObjectsInLists.length > 0) {
      console.log(`⚠️ PARTIAL CONFIRMATION: Some object issues are in lists`);
      console.log(`❌ ${testsWithObjectsInLists.length} tests have list issues`);
      console.log(`❌ ${testsWithObjectsAnywhere.length - testsWithObjectsInLists.length} tests have non-list issues`);
    } else {
      console.log(`❌ HYPOTHESIS NOT CONFIRMED: Object issues are not list-specific`);
    }
    
    // Detailed breakdown
    console.log(`\n📋 Detailed Results:`);
    results.forEach((result, index) => {
      if (result.listAnalysis) {
        const status = result.passed ? '✅' : '❌';
        console.log(`${index + 1}. ${status} ${result.name}`);
        console.log(`   Lists: UL=${result.listAnalysis.ulCount}, OL=${result.listAnalysis.olCount}, LI=${result.listAnalysis.liCount}`);
        console.log(`   Issues: ${result.hasObjectInLists ? 'In Lists' : 'None'} ${result.hasObjectAnywhere && !result.hasObjectInLists ? '(Non-list issues)' : ''}`);
      }
    });
    
    // Recommendations
    console.log(`\n💡 Recommendations:`);
    if (testsWithObjectsInLists.length > 0) {
      console.log(`🔧 Focus debugging on:`);
      console.log(`   1. OpenAI list generation prompts`);
      console.log(`   2. HTML list parsing in htmlToEditorJSServer()`);
      console.log(`   3. List item extraction regex patterns`);
      console.log(`   4. EditorJS list block creation`);
    } else {
      console.log(`✅ List processing appears to be working correctly`);
      console.log(`✅ No specific list-focused debugging needed`);
    }
    
    return {
      success: testsWithObjectsAnywhere.length === 0,
      listSpecific: testsWithObjectsInLists.length === testsWithObjectsAnywhere.length,
      results
    };
    
  } catch (error) {
    console.error('❌ Investigation failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the investigation
testListSpecificIssue().then(result => {
  console.log('\n' + '='.repeat(70));
  if (result.success) {
    console.log('🎉 INVESTIGATION COMPLETE: No [object Object] issues found');
    console.log('✅ List processing is working correctly');
  } else if (result.listSpecific) {
    console.log('🎯 INVESTIGATION COMPLETE: Issues are LIST-SPECIFIC');
    console.log('🔧 Focus debugging efforts on list processing');
  } else {
    console.log('⚠️ INVESTIGATION COMPLETE: Issues found but not list-specific');
    console.log('🔧 Broader debugging approach needed');
  }
  console.log('='.repeat(70));
});
