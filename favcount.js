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

  Favcount.prototype.set = function(count) {
    var self = this,
        img  = document.createElement('img');

    if (self.canvas.getContext) {
      img.onload = function() {
        drawCanvas(self.canvas, img, normalize(count));
      };

      img.src = this.icon;
    }
  }

  function normalize(count) {
    count = Math.round(count);

    if (isNaN(count) || count < 1) {
      return '';
    } else if (count < 10) {
      return ' ' + count;
    } else if (count > 99) {
      return '99';
    } else {
      return count;
    }
  }

  function drawCanvas(canvas, img, count) {
    var head = document.getElementsByTagName('head')[0],
        favicon = document.createElement('link'),
        multiplier, fontSize, context, xOffset, yOffset;

    favicon.rel = 'shortcut icon';

    multiplier = (img.width / 16);
    fontSize   = multiplier * 11;
    xOffset    = multiplier;
    yOffset    = multiplier * 11;

    canvas.height = canvas.width = img.width;

    context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    context.font = 'bold ' + fontSize + 'px "helvetica", sans-serif';

    context.fillStyle = '#FFF';
    context.fillText(count, xOffset, yOffset);
    context.fillText(count, xOffset + 2, yOffset);
    context.fillText(count, xOffset, yOffset + 2);
    context.fillText(count, xOffset + 2, yOffset + 2);

    context.fillStyle = '#000';
    context.fillText(count, xOffset + 1, yOffset + 1);

    favicon.href = canvas.toDataURL('image/png');

    head.removeChild(document.querySelector('link[rel$=icon]'));
    head.appendChild(favicon);
  }

  this.Favcount = Favcount;
}).call(this);

(function(){
  Favcount.VERSION = '1.0.0';
}).call(this);
