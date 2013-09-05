/*
 * favcount.js v1.3.0
 * http://chrishunt.co/favcount
 * Dynamically updates the favicon with a number.
 *
 * Copyright 2013, Chris Hunt
 * Released under the MIT license
 */


'use strict';
(function () {
    function Favcount(icon) {
        this.icon = icon;
        this.opacity = 0.4;
        this.canvas = document.createElement('canvas');
    }

    Favcount.prototype.set = function(count) {
        var self = this,
        head = document.getElementsByTagName('head')[0],
        favicon = document.createElement('link');

        self.render(count, function(dataUrl){
            favicon.rel = 'icon';
            favicon.href = dataUrl;
            var node = document.querySelector('link[rel=icon]');
            if (node) {
                head.removeChild();
            }
            head.appendChild(favicon);
        });

    };

    Favcount.prototype.render = function(count, callback) {
        var self = this,
        img  = document.createElement('img');

        if (self.canvas.getContext) {
            img.onload = function() {
                if (typeof callback === 'function') {
                    callback(drawCanvas(self.canvas, self.opacity, img, normalize(count)));
                }
            };

            img.src = this.icon;
        }
    };

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

    function drawCanvas(canvas, opacity, img, count) {
        var multiplier, fontSize, context, xOffset, yOffset, border, shadow;

        // Scale canvas elements based on favicon size
        multiplier = img.width / 16;
        fontSize   = multiplier * 11;
        xOffset    = multiplier;
        yOffset    = multiplier * 11;
        border     = multiplier;
        shadow     = multiplier * 2;

        canvas.height = canvas.width = img.width;
        context = canvas.getContext('2d');
        context.font = 'bold ' + fontSize + 'px "helvetica", sans-serif';

        // Draw faded favicon background
        if (count) { context.globalAlpha = opacity; }
        context.drawImage(img, 0, 0);
        context.globalAlpha = 1.0;

        // Draw white drop shadow
        context.shadowColor = '#FFF';
        context.shadowBlur = shadow;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        // Draw white border
        context.fillStyle = '#FFF';
        context.fillText(count, xOffset, yOffset);
        context.fillText(count, xOffset + border, yOffset);
        context.fillText(count, xOffset, yOffset + border);
        context.fillText(count, xOffset + border, yOffset + border);

        // Draw black count
        context.fillStyle = '#000';
        context.fillText(count,
          xOffset + (border / 2.0),
          yOffset + (border / 2.0)
        );

        return canvas.toDataURL('image/png');
    }

    this.Favcount = Favcount;
}).call(this);

(function(){
    Favcount.VERSION = '1.3.0';
}).call(this);
