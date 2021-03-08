'use strict';

let mainData = [
  {
    name: '',
    login: '',
    password: '',
    datum: ''
  }
];

let mainDataList = document.querySelector('.users-list'),
    userName = document.querySelector('.user-name'),
    userLogin = document.querySelector('.user-login'),
    userPass = document.querySelector('.user-password'),
    loginBtn = document.querySelector('.log-button'),
    registerBtn = document.querySelector('.reg-button');


// функция записи данных в localStorage
const saveDataToLS = function() {
  const setJson = JSON.stringify(mainData);
  localStorage.setItem('mainData', setJson);
};

// функция чтения данных из localStorage
const getDataFromLS = function() {
  const getJson = localStorage.getItem('mainData');
    mainData = JSON.parse(getJson);
    if (mainData === null) {
      mainData = [];
    }
};

// функция отображения списка пользователей
const render = function() {
    mainDataList.textContent = '';

    if (mainData) {
      mainData.forEach(function(item) {
        const li = document.createElement('li');
        const text = '> ' + item.name + '; ' + item.login + '; ' + item.password + '; ' + item.datum;
        li.classList.add('user');
        li.innerHTML = '<div class="user"><span class="user-text">' + text + '</span>' + 
          '<button class="remove-user"></button></div>';
 /*       li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
          '<div class="todo-buttons">' +
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' +
          '</div>';*/
        mainDataList.append(li);

  // обработчик событий для кнопки удаления пользователя      
        const BtnUserRemove = li.querySelector('.remove-user');
        BtnUserRemove.addEventListener('click', function(){
        const text = li.querySelector('.user-text').innerText;
//        console.log(text);
        let num = 0;
        mainData.forEach(function(item){
        const userData = '> ' + item.name + '; ' + item.login + '; ' + item.password + '; ' + item.datum;  
        if (userData === text){
          mainData.splice(num, 1);
        }
        num = num + 1;
        });
        saveDataToLS();
        render();
      });


      }
      );
  }
};

// функция преобразования даты к нужному формату, возвращает дату текстом в нужном формате
const returnDateFormat = function (date) {
  let dateText = '';
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

  const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

  dateText = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' г., ' +
  hours + ':' + minutes +  ':' + seconds;
  return dateText;
};


// функция добавления нового пользователя
const addNewUser = function() {
//  event.preventDefault();
  if (userName.value.trim() !== ''){
    
  const date = returnDateFormat(new Date());
  const newUser = {
      name: userName.value,
      login: userLogin.value,
      password: userPass.value,
      datum: date
    };
  mainData.push(newUser);
  userName.value = '';
  userLogin.value = '';
  userPass.value = '';
  saveDataToLS();
  render();
  }
};

// функция авторизации
const login = function () {
  let userNotFound = true;
  let num = 0;
  mainData.forEach(function(item){
    if (item.login === userLogin.value && item.password === userPass.value){
      userNotFound = false;
      alert('Добро пожаловать, ' + item.name);
    }
    num = num + 1;
  });
  if (userNotFound) {alert('Пользователь не найден!');}
  userName.value = '';
  userLogin.value = '';
  userPass.value = '';
};


//saveDataToLS();
getDataFromLS();
render();
registerBtn.addEventListener('click', addNewUser);
loginBtn.addEventListener('click', login);

