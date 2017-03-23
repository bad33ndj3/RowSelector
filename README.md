# RowSelector
this is a jQuery plugin for selecting rows in a form and adding the value to an hidden input.

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