var icon = new Favcount('icons/blue-dot.ico');

function setCount(count) {
  if (count > 99) { count = 1 };

  icon.set(count);

  setTimeout(function() {
    setCount(count + 1);
  }, 500);
}

setCount(1);
