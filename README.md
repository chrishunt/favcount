# [favcount.js](http://chrishunt.co/favcount)

Enhance your useless favicon with **FavCount&trade;** technology.

[chrishunt.co/favcount](http://chrishunt.co/favcount)

## Usage

Load up `favcount.js` in your HTML.

```html
<body>
  ...
  <!-- bottom of body -->
  <script src='favcount.js' type='text/javascript'></script>
</body>
```

Create and use a `Favcount` in your JavaScript.

```javascript
var favicon = new Favcount('path/to/favicon.ico');

favicon.set(10);
```

If you get tired of numbers or want to make that favicon really pop, change it
out to something else.

```javascript
favicon.icon = 'path/to/different/icon.ico';

favicon.set();
```

## Example

Have a look at the favicon for the home page. Notice how amazing it is? Here's
the code.

```javascript
var favicon = new Favcount('icons/blue-dot.ico');

function setCount(count) {
  if (count > 99) { count = 1 };

  favicon.set(count);

  setTimeout(function() {
    setCount(count + 1);
  }, 500);
}

setCount(1);
```

## License

[MIT License](https://github.com/chrishunt/favcount/blob/master/LICENSE)
