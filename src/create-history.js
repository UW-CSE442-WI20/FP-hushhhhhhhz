
  
// You can separate your code out into modules to
// keep code clean.

class CreateHistory {
  constructor() {

  }

  start() {
    console.log('[CreateHistory]', 'Hello World 5.');
	document.getElementById('vis').innerHTML = "";		
  }
}

module.exports = CreateHistory;

