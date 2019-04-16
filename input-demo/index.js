let isFocus = false;
let placeholderShow = false;
let emoticonsShow = false;
let lastEditRange;
const contentEle = document.querySelector('#content');
const inputBox = document.querySelector('.input-box');
const emoticonsBox = document.querySelector('.emoticons-box');
const emoticonsEle = document.querySelector('#emoticons');
const emoticonsStep = 8;
const charCounterMax = contentEle.getAttribute('data-maxlength');
document.querySelector('.input-counter span:last-child').innerText = charCounterMax;
const countEle = document.querySelector('.input-counter span:first-child')
let keyupData = '';
let inputType = 'insertText';

const emoticonsSet = [
    { code: '1f600', desc: 'Grinning face' },
    { code: '1f601', desc: 'Grinning face with smiling eyes' },
    { code: '1f602', desc: 'Face with tears of joy' },
    { code: '1f603', desc: 'Smiling face with open mouth' },
    { code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
    { code: '1f605', desc: 'Smiling face with open mouth and cold sweat' },
    { code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes' },
    { code: '1f607', desc: 'Smiling face with halo' },
  
    { code: '1f608', desc: 'Smiling face with horns' },
    { code: '1f609', desc: 'Winking face' },
    { code: '1f60a', desc: 'Smiling face with smiling eyes' },
    { code: '1f60b', desc: 'Face savoring delicious food' },
    { code: '1f60c', desc: 'Relieved face' },
    { code: '1f60d', desc: 'Smiling face with heart-shaped eyes' },
    { code: '1f60e', desc: 'Smiling face with sunglasses' },
    { code: '1f60f', desc: 'Smirking face' },
  
    { code: '1f610', desc: 'Neutral face' },
    { code: '1f611', desc: 'Expressionless face' },
    { code: '1f612', desc: 'Unamused face' },
    { code: '1f613', desc: 'Face with cold sweat' },
    { code: '1f614', desc: 'Pensive face' },
    { code: '1f615', desc: 'Confused face' },
    { code: '1f616', desc: 'Confounded face' },
    { code: '1f617', desc: 'Kissing face' },
  
    { code: '1f618', desc: 'Face throwing a kiss' },
    { code: '1f619', desc: 'Kissing face with smiling eyes' },
    { code: '1f61a', desc: 'Kissing face with closed eyes' },
    { code: '1f61b', desc: 'Face with stuck out tongue' },
    { code: '1f61c', desc: 'Face with stuck out tongue and winking eye' },
    { code: '1f61d', desc: 'Face with stuck out tongue and tightly-closed eyes' },
    { code: '1f61e', desc: 'Disappointed face' },
    { code: '1f61f', desc: 'Worried face' },
  
    { code: '1f620', desc: 'Angry face' },
    { code: '1f621', desc: 'Pouting face' },
    { code: '1f622', desc: 'Crying face' },
    { code: '1f623', desc: 'Persevering face' },
    { code: '1f624', desc: 'Face with look of triumph' },
    { code: '1f625', desc: 'Disappointed but relieved face' },
    { code: '1f626', desc: 'Frowning face with open mouth' },
    { code: '1f627', desc: 'Anguished face' },
  
    { code: '1f628', desc: 'Fearful face' },
    { code: '1f629', desc: 'Weary face' },
    { code: '1f62a', desc: 'Sleepy face' },
    { code: '1f62b', desc: 'Tired face' },
    { code: '1f62c', desc: 'Grimacing face' },
    { code: '1f62d', desc: 'Loudly crying face' },
    { code: '1f62e', desc: 'Face with open mouth' },
    { code: '1f62f', desc: 'Hushed face' },
  
    { code: '1f630', desc: 'Face with open mouth and cold sweat' },
    { code: '1f631', desc: 'Face screaming in fear' },
    { code: '1f632', desc: 'Astonished face' },
    { code: '1f633', desc: 'Flushed face' },
    { code: '1f634', desc: 'Sleeping face' },
    { code: '1f635', desc: 'Dizzy face' },
    { code: '1f636', desc: 'Face without mouth' },
    { code: '1f637', desc: 'Face with medical mask' },
];
const users = [
    { userid: '1', nickname: '布偶是小花', avatar: 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid  : '2',nickname: '我家有矿',avatar  : 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid: '3', nickname: '一路狂奔', avatar: 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid  : '4',nickname: '致青春岁月静好',avatar  : 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid: '5', nickname: '3867172829', avatar: 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid: '6', nickname: '小九粉丝壹号', avatar: 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid: '7', nickname: '多来A梦', avatar: 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid  : '8',nickname: '我勒个去',avatar  : 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
    { userid  : '10',nickname: 'whatapp',avatar  : 'https://dn-btckan.qbox.me/avatar-180423-4.png' },
  ];
const KEYCODE = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59, // Firefox (Gecko) fires this for semicolon instead of 186
    FF_EQUALS: 61, // Firefox (Gecko) fires this for equals instead of 187
    QUESTION_MARK: 63, // needs localization
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,

    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,

    FF_HYPHEN: 173, // Firefox (Gecko) fires this for hyphen instead of 189s
    SEMICOLON: 186, // needs localization
    DASH: 189, // needs localization
    EQUALS: 187, // needs localization
    COMMA: 188, // needs localization
    HYPHEN: 189, // needs localization
    PERIOD: 190, // needs localization
    SLASH: 191, // needs localization
    APOSTROPHE: 192, // needs localization
    TILDE: 192, // needs localization
    SINGLE_QUOTE: 222, // needs localization
    OPEN_SQUARE_BRACKET: 219, // needs localization
    BACKSLASH: 220, // needs localization
    CLOSE_SQUARE_BRACKET: 221, // needs localization
    IME: 229
}
init();

function init(){
    document.addEventListener('click', outClick.bind(this));
    atwho();
    contentEle.addEventListener('focus', focusHandler);
    contentEle.addEventListener('blur', focusHandler);
    contentEle.addEventListener('paste', handlePaste);
    contentEle.addEventListener('keydown', checkCharNumber);
    contentEle.addEventListener('keyup', updateCharNumber); 
    contentEle.addEventListener('input', updateCharNumber);
}

function atwho(){
    const atConfig = {
        at            : '@',
        data          : users,
        displayTpl    : '<li><span><img src="${avatar}" alt=""></span>${nickname}</li>',
        insertTpl     : '<bk-user id="${userid}">${atwho-at}${nickname}</bk-user>',
        limit         : 20,
        searchKey     : 'nickname',
        startWithSpace: false,
        callbacks     : {
          remoteFilter: function (query, render_view) {
            if (query.length === 0) {
              render_view('');
              return;
            }
            $.get('/proxy/search_user', { q: query, type: 'all' }, function (data) {
              names = JSON.parse(data).data.items;
              render_view(names);
            });
          },
        },
    };
    $('#content').atwho(atConfig);
}


function focusHandler(e){
    isFocus = e.type === 'focus';
    const content = contentEle.innerHTML.trim();
    placeholderShow = isFocus ? false : !(content.length > 0 && content != '<br>' && content != '<br/>');
    if (!isFocus) {
        inputBox.classList.remove('input-focus');
        const selection = getSelection();
        lastEditRange = selection.getRangeAt(0);
    } else {
        inputBox.classList.add('input-focus');
    }
    if(placeholderShow){
        inputBox.classList.add('placeholder-show');
    } else {
        inputBox.classList.remove('placeholder-show');
    }
}

function handlePaste(e){
    if (e && e.clipboardData && e.clipboardData.getData) {
      let div;
      const data = e.clipboardData;
      const types = Array.from(data.types);
      let clipboardHtml = "";
      if(types.includes("text/html")){
        clipboardHtml = data.getData("text/html");
      } else if(types.includes("text/plain")) {
          (div = document.createElement("div")).innerText = data.getData("text/plain");
          clipboardHtml = div.innerHTML;
      }
      if (e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
      }
      let str = clipboardHtml.replace(/<[^>]+>/g, '');
      str = checkCharNumberOnPaste(str);
      document.execCommand('insertHTML', false, str);
    }
}

function openEmoticons(){
    emoticonsShow = true;
    emoticonsBox.style.display = 'block';
    emoticonsEle.innerHTML = emoticonsHTML();
    bindClick();
}

function closeEmoticons(){
    emoticonsShow = false;
    emoticonsBox.style.display = 'none';
}

function  emoticonsHTML() {
    let emoticons_html = '<div style="text-align: left">';
    for (let i = 0; i < emoticonsSet.length; i++) {
      if (i !== 0 && i % emoticonsStep === 0) {
        emoticons_html += '<br>';
      }
      emoticons_html += `<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="${emoticonsSet[i].desc}" role="button" data-param1="${emoticonsSet[i].code}">&#x${emoticonsSet[i].code};</span>`;
    }
    return emoticons_html;
}

function bindClick() {
    const emoticons = document.querySelectorAll('.fr-command');
    for (let i = 0; i < emoticons.length; i++) {
      const code = emoticons[i].getAttribute('data-param1');
      emoticons[i].addEventListener('click', (e) => {
        e.stopPropagation();
        insertEmoji(code);
      });
    }
}

function insertEmoji(code) {
    const str = `&#x${code};`;
    contentEle.focus();
    const selection = window.getSelection ? window.getSelection() : document.selection;
    if (lastEditRange) {
      selection.removeAllRanges();
      selection.addRange(lastEditRange);
    }
    document.execCommand('insertHTML', false, str);
    emoticonsShow = false;
    emoticonsBox.style.display = 'none';
}

function outClick(e){
    if (isOutClick(e.target, 'add-emoticons')) {
        closeEmoticons();
    }
}

function isOutClick (element, className) {
    try {
      if (!element || !className) {
        throw new Error('element and className is reqiured!');
      }
      while(element && element.nodeType !== 9) {
        if (element.className.indexOf(className) < 0) {
          element = element.parentNode;
        } else {
          return false;
        }
      }
      return true;
    } catch(e) {}
}

function checkCharNumber(e){
  const count = contentEle.innerText.trim().length;
  if (charCounterMax < 0) return true;
  if (count < charCounterMax) return true;
  const keyCode = e.which;
  if ((!ctrlKey(e) && isCharacter(keyCode))) {
    e.preventDefault();
    e.stopPropagation();
    console.log('charCounter.exceeded')
    return false;
  }
  if(keyCode === KEYCODE.IME){
    e.preventDefault();
    e.stopPropagation();
    console.log('charCounter.exceeded')
    return true;
  }
  return true;
}

function checkCharNumberOnPaste(html){
  if (charCounterMax < 0) return html;
  const text = $('<div>').html(html).text();
  var len = text.length;
  const count = contentEle.innerText.trim().length;
  if(len + count <= charCounterMax){
    return html;
  } else if(count < charCounterMax){
    console.log('charCounter.exceeded')
    return text.slice(0, charCounterMax - count);
  }
  console.log('charCounter.exceeded');
  return '';
}

function updateCharNumber(e){
  if(e.type === 'input'){
    inputType = e.inputType;
  }
  if(e.type === 'keyup'){
    if(inputType === 'insertText'){
      countEle.innerText =  contentEle.innerText.trim().length;
    } else if(e.code === 'Space' || e.code === 'Enter'){
      countEle.innerText =  contentEle.innerText.trim().length;
    }
  }
}

function ctrlKey(e) {
  if (navigator.userAgent.indexOf('Mac OS X') != -1) {
    if (e.metaKey && !e.altKey) return true;
  }
  else {
    if (e.ctrlKey && !e.altKey) return true;
  }
  return false;
}

function isCharacter(key_code) {
  if (key_code >= KEYCODE.ZERO && key_code <= KEYCODE.NINE) {
    return true;
  }
  if (key_code >= KEYCODE.NUM_ZERO && key_code <= KEYCODE.NUM_MULTIPLY) {
    return true;
  }
  if (key_code >= KEYCODE.A && key_code <= KEYCODE.Z) {
    return true;
  }
  switch (key_code) {
    case KEYCODE.SPACE:
    case KEYCODE.QUESTION_MARK:
    case KEYCODE.NUM_PLUS:
    case KEYCODE.NUM_MINUS:
    case KEYCODE.NUM_PERIOD:
    case KEYCODE.NUM_DIVISION:
    case KEYCODE.SEMICOLON:
    case KEYCODE.FF_SEMICOLON:
    case KEYCODE.DASH:
    case KEYCODE.EQUALS:
    case KEYCODE.FF_EQUALS:
    case KEYCODE.COMMA:
    case KEYCODE.PERIOD:
    case KEYCODE.SLASH:
    case KEYCODE.APOSTROPHE:
    case KEYCODE.SINGLE_QUOTE:
    case KEYCODE.OPEN_SQUARE_BRACKET:
    case KEYCODE.BACKSLASH:
    case KEYCODE.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
  }
}

function publish(){
    const content = contentEle.innerHTML.trim();
    // post content
}
