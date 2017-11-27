"use strict"

String.prototype.pick = function(min, max) {
    var n, chars = '';

    if (typeof max === 'undefined') {
        n = min;
    } else {
        n = min + Math.floor(Math.random() * (max - min + 1));
    }

    for (var i = 0; i < n; i++) {
        chars += this.charAt(Math.floor(Math.random() * this.length));
    }

    return chars;
};

function copyToClipboard(text) {
    var field = document.createElement('input');
    document.body.appendChild(field);
    field.setAttribute('type', 'text');
    field.value = text;
    field.select()
    document.execCommand('Copy');
    field.remove();
}

// Credit to @Christoph: http://stackoverflow.com/a/962890/464744
String.prototype.shuffle = function() {
    var array = this.split('');
    var tmp, current, top = array.length;

    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

    return array.join('');
};

function h(nodeName, attributes, children) {
    var node = document.createElement(nodeName);

    for (var key in attributes) {
        node.setAttribute(key, attributes[key])
    }

    if (children) {
        node.append(children)
    }

    return node;
}

var specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
var lowercase = 'abcdefghijklmnopqrstuvwxyz';
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var numbers = '0123456789';

var passwords = document.querySelectorAll('input[type=password]');

for (var passInput of passwords) {
    if (!(passInput.offsetWidth <= 0 && el.offsetHeight <= 0)) { // If visible
        (function(input) {
            var wrapper = h('span', {
                'style': 'position: relative'
            });

            var actionIcon = h('a', {
                    'style': 'position: absolute; top: 0; right: 4px; z-index: 1000'
                },
                h('img', {
                    'src': browser.extension.getURL("make-password-16.png")
                })
            );

            input.parentNode.append(wrapper);
            wrapper.append(actionIcon);
            wrapper.append(input)

            actionIcon.onclick = function(event) {
                var all = specials + lowercase + uppercase + numbers;
                var password = '';
                password += lowercase.pick(6);
                password += uppercase.pick(6);
                password += numbers.pick(2);
                password += specials.pick(2);
                password += all.pick(2);
                password = password.shuffle();
                input.focus();
                input.setAttribute('value', password);
                input.setAttribute('type', 'text');
                setTimeout(function() {
                    input.setAttribute('type', 'password');
                }, 1000)
                copyToClipboard(password);
            };


        })(passInput);
    }
}