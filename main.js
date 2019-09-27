let blocks = [];

function init() {
  let str = '17 z q u x\n' + 
    '14 t w y n\n' + 
    '4 i q a 4\n' + 
    '9 a b c d\n' + 
    '1 d h n butterfly\n' + 
    '11 h e l r\n' + 
    '8 r h o v\n' + 
    '2 e i p holly\n' + 
    '3 p m g flag\n' + 
    '12 w s n d\n' + 
    '7 e t j clover\n' + 
    '10 g c y mapleleaf\n' + 
    '15 t o v u\n' + 
    '5 l o r heart\n' + 
    '18 b f j k\n' + 
    '16 i f k m\n' + 
    '6 s a l w\n' + 
    '13 a o s c';

  str.split('\n').forEach(s => {
    let tokens = s.split(' ');
    let block = { number:+tokens[0], letters:new Set(tokens.slice(1, 5)), hasSymbol:tokens[4].length > 1,
                symbol:tokens[4]};
    blocks.push(block);
  });
  blocks.sort((a,b) => {
    if (a.hasSymbol != b.symbol) {
      if (a.hasSymbol) return 1;
      return -1;
    }
    return a.number - b.number;
  });
}

function assign(text, j, picked, assigned) {
  if (j < 0) return true;
  let c = text[j];
  if (c == ' ') {
    if (assign(text, j-1, picked, assigned)) {
      assigned.push(' ');
      return true;
    }
    return false;
  }

  for (let i = 0; i < blocks.length; ++i) {
    let b = blocks[i];
    if (!picked[i] && b.letters.has(c)) {
      picked[i] = true;
      if (assign(text, j-1, picked, assigned)) {
        assigned.push(b.number);
        assigned.push('-');
        return true;
      } else {
        picked[i] = false;
      }
    }
  }
  return false;
}

function changed() {
  let picked = new Array(blocks.length).fill(false);
  let assigned = [];
  let text = document.getElementById('input').value.trim().toLowerCase();
  let success = assign(text, text.length-1, picked, assigned);
  if (success) {
    let ret = '';
    assigned.forEach(a => ret += a);
    document.getElementById('result').innerHTML = ret.replace(/- /g, ' ').slice(0,-1);
  } else {
    document.getElementById('result').innerHTML = 'not possible';
  }

  let symbols = '';
  blocks.forEach((b,i) => {
    if (!picked[i] && b.hasSymbol) {
      symbols += `${b.symbol} (${b.number}) `;
    }
  });
                 
  document.getElementById('pictures').innerHTML = symbols.length > 0 ? symbols : 'none';
}
