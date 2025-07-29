// Test script για Synthesis Challenge System
// Τρέξτε αυτό στο browser console για debugging

console.log('=== SYNTHESIS CHALLENGE SYSTEM TEST ===');

// 1. Check if scripts are loaded
console.log('1. Scripts loaded:');
console.log('- SynthesisChallenge:', typeof window.SynthesisChallenge);
console.log('- AIQTracker:', typeof window.AIQTracker);
console.log('- aiqTracker instance:', typeof window.aiqTracker);
console.log('- synthesisChallenge instance:', typeof window.synthesisChallenge);

// 2. Check DOM elements
console.log('\n2. DOM Elements:');
console.log('- Checkboxes found:', document.querySelectorAll('.reading-checkbox').length);
console.log('- Challenge container:', document.getElementById('synthesis-challenge-container') ? 'Found' : 'Not found');
console.log('- Provisional points section:', document.getElementById('provisional-points-section') ? 'Found' : 'Not found');

// 3. Check AI-Q progress
if (window.aiqTracker) {
    const progress = window.aiqTracker.getProgress();
    console.log('\n3. AI-Q Progress:');
    console.log('- Current IQ:', progress.iq);
    console.log('- Provisional Points:', progress.provisionalPoints || 0);
    console.log('- Total Points:', progress.totalPoints);
    console.log('- Unlocked Levels:', progress.unlockedLevels);
}

// 4. Test provisional points functionality
console.log('\n4. Testing provisional points...');
if (window.aiqTracker) {
    window.aiqTracker.addProvisionalPoints(5, 'test');
    console.log('- Added 5 provisional points');
    const newProgress = window.aiqTracker.getProgress();
    console.log('- New provisional total:', newProgress.provisionalPoints);
}

console.log('\n=== TEST COMPLETE ===');
console.log('Now manually test:');
console.log('1. Click checkboxes to see if they change appearance');
console.log('2. Check if provisional points appear in dashboard after 30% progress');
console.log('3. Check if challenge container appears after 30% reading');
console.log('4. Submit a challenge and verify points become permanent');
