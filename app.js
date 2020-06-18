var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// FRONTEND

//const base_url = "http://localhost:3000";
fetch("http://localhost:3000/api/v1/messages", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log("something went wrong!")
});

// PRIMUS LIVE
/*primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});*/
/*
primus.on('data', (json) => {
    if (json.action === "addTodo") {
        appendTodo(json.data);
    }
});*/


/* redirect if not logged in */
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

/* add a message on enter */
let input = document.querySelector(".message__input");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        // on enter
        let text = input.value;
        fetch(base_url + '/api/v1/messages', {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "text": text
            })
        })
            .then(result => {
                return result.json();
            }).then(json => {
                console.log(json)
                console.log(text)
                let message = `<div class="messages__item">
                    <div class="messages__item__avatar">
                        <img src="images/avatar.png" alt="">
                    </div>
                    <div class="messages__item__username">${json.data.user.username}</div>
                    <div class="messages__item__text">${json.data.message.text}</div>
                </div>`;
                document.querySelector(".messages__new ").insertAdjacentHTML('afterend', message);

                /*input.value = "";
                input.focus();

                primus.write({
                    "action": "addMessage",
                    "data": json
                });*/

                //appendTodo(json);

            }).catch(err => {
                console.log(err)
            })
    }

    e.preventDefault();
});


// simple logout functionality
document.querySelector(".app__button__options--logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    e.preventDefault();
});
