/*
 * favcount.js v1.0.0
 * http://blahblah.com
 * Updates the favicon with a number
 *
 * Copyright 2013, Chris Hunt
 * Released under the MIT license.
 */

(function(){
  function Favcount(icon) {
    this.icon = icon;
    this.canvas = document.createElement('canvas');
  }

  Favcount.VERSION = '1.0.0';

  Favcount.prototype.set = function(count) {
    var favcount = this,
        img = document.createElement('img'),
        link = document.createElement('link'),
        multiplier, fontSize, context, xOffset, yOffset;

    if (favcount.canvas.getContext) {
           if (count < 1)  { count = '' }
      else if (count < 10) { count = ' ' + count }
      else if (count > 99) { count = '99' }

      img.onload = function() {
        favcount.canvas.height = favcount.canvas.width = this.width;
        multiplier = (this.width / 16);

        fontSize = multiplier * 11;
        xOffset  = multiplier;
        yOffset  = multiplier * 11;

        context = favcount.canvas.getContext('2d');
        context.drawImage(this, 0, 0);
        context.font = 'bold ' + fontSize + 'px "helvetica", sans-serif';

        context.fillStyle = '#FFF';
        context.fillText(count, xOffset, yOffset);
        context.fillText(count, xOffset + 2, yOffset);
        context.fillText(count, xOffset, yOffset + 2);
        context.fillText(count, xOffset + 2, yOffset + 2);

        context.fillStyle = '#000';
        context.fillText(count, xOffset + 1, yOffset + 1);

        document.getElementsByTagName('head')[0].removeChild(
          document.querySelector('link[rel$=icon]')
        );

        link.rel = 'shortcut icon';
        link.href = favcount.canvas.toDataURL('image/png');
        document.getElementsByTagName('head')[0].appendChild(link);
      };

      img.src = this.icon;
    }
  }

  this.Favcount = Favcount;
}).call(this);
