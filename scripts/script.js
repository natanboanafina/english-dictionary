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
  try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const data = await res.json();
      render(data);
  }
  catch(e){
      console.log(e);
  }

}

function render(data){
  let output = '';
  data.filter(item => {
    console.log(item);
    output += `
      <ul class="container-sm font-monospace lh-lg">
      <li><strong>Word</strong>: ${item.word}</li>
      <li><strong>Phonetic Written</strong>: ${item.phonetic}</li>
      <li><strong>Spelling</strong>: ${item.phonetics.map(item => `<span>${item.text}</span>
      <li>
      <audio controls>
      <source src="${item.audio}" type="audio/mp3">
      </audio>
      </li>
      `)}</li>
      <li><strong>Origin</strong>: ${item.origin}</li>
      <li><strong>Part of Speech</strong>: ${item.meanings.map(mean => mean.partOfSpeech)}</li>
      <li><strong>Definition</strong>: ${item.meanings.map(mean => mean.definitions.map(def => def.definition))}</li>
      <li><strong>Example</strong>: ${item.meanings.map(mean => mean.definitions.map(def => def.example))}</li>
      </ul>
    `
  }) 
// console.log(data); 
result.innerHTML = output;
}