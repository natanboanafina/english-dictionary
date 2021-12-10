window.addEventListener('load',()=>{
  console.log("Olá, mundo!");
  fetchingApi();  
})

const inputSearch = document.querySelector('#searching');

inputSearch.addEventListener('input',(e)=>{
  return fetchingApi(e.target.value.trim().toLowerCase());
})
const result = document.querySelector('.results');

async function fetchingApi(word = "English"){
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await res.json();

  render(data);
}

function render(data){
  let output = '';
  data.filter(item => {
    console.log(item);
    output += `
      <ul>
      <li>Word: ${item.word}</li>
      <li>Phonetic Written: ${item.phonetic}</li>
      <li>Spelling: ${item.phonetics.map(item => `<span>${item.text}</span>
      <li>
      <audio controls>
      <source src="${item.audio}" type="audio/mp3">
      </audio>
      </li>
      `)}</li>
      <li>Origin: ${item.origin}</li>
      <li>Part of Speech: ${item.meanings.map(mean => mean.partOfSpeech)}</li>
      <li>Definition: ${item.meanings.map(mean => mean.definitions.map(def => def.definition))}</li>
      <li>Example: ${item.meanings.map(mean => mean.definitions.map(def => def.example))}</li>
      </ul>
    `
  }) 
// console.log(data); 
result.innerHTML = output;
}