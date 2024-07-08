// Função para gerar um número aleatório de Moçambique
function generateNumber() {
  const prefixes = ["87", "86", "85", "84", "83", "82"];
  const numbers = [];

  for (let i = 0; i < 150; i++) {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // Gera um número aleatório de 7 dígitos
    numbers.push(`+258${randomPrefix}${randomNumber}`);
  }

  return numbers;
}

// Função para copiar a lista de números para a área de transferência
function copyListToClipboard(numbers) {
  const textarea = document.createElement('textarea');
  textarea.value = numbers.join('\n');
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Lista copiada para a área de transferência!');
}

// Função para baixar os números como arquivo TXT
function downloadTxtFile(numbers) {
  const textContent = numbers.join(', ');

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'numbers.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Função para baixar os números como arquivo CSV
function downloadCsvFile(numbers) {
  let csvContent = 'Número\n';
  numbers.forEach(number => {
    csvContent += `${number}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'numbers.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Event listener para o botão de gerar números
const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', () => {
  const generatedNumbers = generateNumber();
  const numberList = document.getElementById('numberList');
  numberList.innerHTML = ''; // Limpa a lista atual

  generatedNumbers.forEach(number => {
    const newItem = document.createElement('div');
    newItem.textContent = number;
    numberList.appendChild(newItem);
  });
});

// Event listener para o botão de copiar lista
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', () => {
  const numbers = Array.from(document.querySelectorAll('#numberList div')).map(item => item.textContent);
  copyListToClipboard(numbers);
});

// Event listener para o botão de baixar TXT
const downloadTxtButton = document.getElementById('downloadTxtButton');
downloadTxtButton.addEventListener('click', () => {
  const numbers = Array.from(document.querySelectorAll('#numberList div')).map(item => item.textContent);
  downloadTxtFile(numbers);
});

// Event listener para o botão de baixar CSV
const downloadCsvButton = document.getElementById('downloadCsvButton');
downloadCsvButton.addEventListener('click', () => {
  const numbers = Array.from(document.querySelectorAll('#numberList div')).map(item => item.textContent);
  downloadCsvFile(numbers);
});