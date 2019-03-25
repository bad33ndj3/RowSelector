# RowSelector
[![npm version](https://badge.fury.io/js/rowselector.svg)](https://badge.fury.io/js/rowselector)

this is a jQuery plugin for selecting rows in a form and adding the value to an hidden input.
### Requires
* jQuery 3.2.1 (tested)
* Bootstrap 3.3.7 (tested)
### Npm
```ssh
npm install rowselector
```
### Usage
get some data
```js
var cars = {
    0: {
        id: 1,
        name: 'BMW'
    },
    1: {
        id: 2,
        name: 'Audi'
    },
    2: {
        id: 3,
        name: 'Porsche'
    }
};
```
set up some basic html
```html
<div id="car"></div>
<input type="hidden" id="car_hidden">
```
make an instance
```js
 $('#car').rowSelector(cars, $('#car_hidden'));
```
and it works!

![screenshot](https://github.com/bad33ndj3/RowSelector/blob/master/preview.png?raw=true)

---

more to come...

***Not documented***
* Preselect an item
* Reload the list

***Future plans***
* ...
