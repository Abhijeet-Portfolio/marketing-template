/* Author: 

*/

// hamburger

document.querySelector('nav li:last-child').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('nav ul').classList.toggle('active');
});

// slider

var imageSlider = document.querySelector('.slider-image ul');
var images = document.querySelectorAll('.slider-image ul li');
var controlBtns = document.querySelectorAll('.slider-control > a');
var dots = document.querySelectorAll('.slider-control li a');

function slider(imageSlider, images, controlBtns, dots) {
    var index = 1;
    var dotIndex = 0;
    var size = images[index].clientWidth;

    function slide() {
        imageSlider.style.transition = "transform 0.5s ease-in-out";
        change();
    }

    function change() {
        imageSlider.style.transform = "translateX(" + (-size * index) + "px)";
        dots.forEach(function (dot) {
            dot.classList.remove('active');
        });
        dots[dotIndex].classList.add('active');
    }
    change();

    function dotOnBtn() {
        if (this.id == 'prev') {
            if (index <= 0) return;
            index--;
            (dotIndex == 0) ? (dotIndex = 2) : dotIndex--;
        }
        else {
            if (index == images.length - 1) return;
            index++;
            (dotIndex == 2) ? (dotIndex = 0) : dotIndex++;
        }
        slide();
    }

    controlBtns.forEach(function (btn) {
        btn.addEventListener('click', dotOnBtn);
    });
    setInterval(dotOnBtn, 4000);

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var i = +this.getAttribute('data-index');
            dotIndex = i;
            index = i + 1;
            slide();
        });
    });

    imageSlider.addEventListener('transitionend', function () {
        if (images[index].id == 'first') {
            imageSlider.style.transition = "none";
            index = images.length - 2;
            imageSlider.style.transform = "translateX(" + (-size * index) + "px)";
        }
        if (images[index].id == 'last') {
            imageSlider.style.transition = "none";
            index = 1;
            imageSlider.style.transform = "translateX(" + (-size * index) + "px)";
        }
    });
}

slider(imageSlider, images, controlBtns, dots);


//form validation

var nameInput = document.querySelector('#name');
nameInput.addEventListener('input', function() {validateName(nameInput)});

function validateName(input) {
    var textRegax = /([a-zA-Z\' ']){1,30}$/;
    var noNumberRegax = /[^a-z\' ']/gi;

    if (input.value == null || input.value == '') {
        if ( input.previousElementSibling.classList.contains('display')) {
            input.previousElementSibling.classList.replace('display','hide');
        }
    }
    else if(!textRegax.test(input.value)) {
        input.previousElementSibling.classList.replace('hide','display');
        input.previousElementSibling.textContent = "Please enter only alphabets";
        input.value = input.value.replace(noNumberRegax,'');
    }
    else {
        if ( input.previousElementSibling.classList.contains('display')) {
            input.previousElementSibling.classList.replace('display','hide');
        }
    }
}

//for email validate

var email = document.querySelector('#email');
email.addEventListener('input', function() {validateEmail(email);});

function validateEmail(email) {
    emailRegex = /^([0-9a-zA-Z\_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
    if (email.value == null || email.value == '') {
        if ( email.previousElementSibling.classList.contains('display')) {
            email.previousElementSibling.classList.replace('display','hide');
        }
    }
    else if (!emailRegex.test(email.value)) {
        email.previousElementSibling.classList.replace('hide','display');
        email.previousElementSibling.textContent = "Email ID must contain @ and .";
    }
    else {
        if ( email.previousElementSibling.classList.contains('display')) {
            email.previousElementSibling.classList.replace('display','hide');
        }
    }
}

// submit the form

var subject = document.querySelector('#subject');
var message = document.querySelector('#message');

var submit = document.querySelector('form button');
submit.addEventListener('click', function(e) {
    e.preventDefault();
    var flag = 0;

    function error(input) {
        if (input.value === '' || input.value === null) {
            input.previousElementSibling.classList.replace('hide','display');
            input.previousElementSibling.textContent = "This field is required";
            flag = 0;
        }
        else {
            if ( input.previousElementSibling.classList.contains('display')) {
                input.previousElementSibling.classList.replace('display','hide');
            }
            flag++;
        }
    }

    error(nameInput);
    error(email);
    error(subject);
    error(message);
    
    if (flag === 4) {
        document.querySelector('form').reset();
        document.querySelector('.modal').classList.add('modalShow');
    }
});

document.querySelector('.successful a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.remove('modalShow');
});






