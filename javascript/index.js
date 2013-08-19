prettyPrint();

var favicon = new Favcount('icons/blue-dot.ico');

function setCount(count) {
  if (count > 99) { count = 1 };

  favicon.set(count);

  setTimeout(function() {
    setCount(count + 1);
  }, 500);
}

setCount(1);
