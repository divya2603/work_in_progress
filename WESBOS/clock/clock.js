var clock = {
    init : function() {
       setInterval(clock.setTime,50);
    },
    setTime : function() {
        var now = new Date(),
        sec = now.getSeconds(),
        secDeg = ((sec/60)*360)+90,
        min = now.getMinutes(),
        minDeg = ((min/60)*360)+90,
        hrs = now.getHours(),
        hrDeg = ((hrs/12)*360)+90;
        console.log(sec);
        document.querySelector('.second').style.transform = `rotate(${secDeg}deg)`;
        document.querySelector('.minute').style.transform = `rotate(${minDeg}deg)`;
        document.querySelector('.hour').style.transform = `rotate(${hrDeg}deg)`;
    },
}
clock.init();