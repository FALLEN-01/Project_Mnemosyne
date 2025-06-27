// Test script to quickly progress to Room4
// Run this in browser console: copy and paste the content below

// Set progress to reach Room4
const testProgress = {
  teamName: 'Test Team',
  roomsCompleted: [0, 1, 2, 3],
  currentRoom: 3,
  room1Code: 'completed',
  room2Phrase: 'completed', 
  room3Word: 'completed',
  startTime: new Date().toISOString()
};

localStorage.setItem('mnemosyne-progress', JSON.stringify(testProgress));
console.log('Progress set to Room4. Refresh the page and navigate to /room4');

// To reset progress:
// localStorage.removeItem('mnemosyne-progress');
