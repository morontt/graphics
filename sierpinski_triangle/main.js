document.addEventListener("DOMContentLoaded", draw);

function draw() {
    var canvas = document.getElementById('canvas');
    var w = parseInt(canvas.getAttribute('width'));
    if (canvas.getContext) {
        var k = 0.5;
        var f0 = 15.0 * Math.PI / 180.0;
        var x0, y0, x1, y1, x2, y2, x, y;

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';

        function plot(x, y) {
            ctx.fillRect(Math.round(w * (x + 0.55)), Math.round(w * (y + 0.45)), 4, 4);
        }

        x0 = k * Math.sin(f0);
        y0 = k * Math.cos(f0);
        x1 = k * Math.sin(f0 + 2.0 * Math.PI / 3.0);
        y1 = k * Math.cos(f0 + 2.0 * Math.PI / 3.0);
        x2 = k * Math.sin(f0 + 4.0 * Math.PI / 3.0);
        y2 = k * Math.cos(f0 + 4.0 * Math.PI / 3.0);

        plot(x0, y0);
        plot(x1, y1);
        plot(x2, y2);

        x = 0.0;
        y = 0.0;

        function plot500() {
            var i = 0;
            while (i < 500) {
                switch (Math.floor(3.0 * Math.random())) {
                    case 0:
                        x = 0.5 * (x + x0);
                        y = 0.5 * (y + y0);
                        break;
                    case 1:
                        x = 0.5 * (x + x1);
                        y = 0.5 * (y + y1);
                        break;
                    default:
                        x = 0.5 * (x + x2);
                        y = 0.5 * (y + y2);
                }

                console.log(x, y);
                plot(x, y);
                i++;
            }
        }

        var interval = setInterval(plot500, 500);
        setTimeout(
            function () {
                clearInterval(interval);
            },
            10000
        );
    }
}
