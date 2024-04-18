document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');
  
    searchButton.addEventListener('click', searchWord);
    searchInput.addEventListener('keypress', handleKeyPress);
  
    function searchWord() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (searchTerm === '') {
        alert('Please enter a word.');
        return;
      }
  
      fetchDictionaryData(searchTerm);
    }
  
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        searchWord();
      }
    }
  
    function fetchDictionaryData(word) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Word not found');
          }
          return response.json();
        })
        .then(data => {
          displayResults(data);
        })
        .catch(error => {
          alert('Word not found. Please try again.');
          console.error('Error:', error);
        });
    }
  
    function displayResults(data) {
      resultsContainer.innerHTML = '';
  
      data.forEach(entry => {
        const meanings = entry.meanings;
        meanings.forEach(meaning => {
          const definitions = meaning.definitions;
          definitions.forEach(definition => {
            const definitionItem = document.createElement('div');
            definitionItem.classList.add('result-item');
            definitionItem.textContent = definition.definition;
            resultsContainer.appendChild(definitionItem);
          });
        });
      });
    }
  });
  