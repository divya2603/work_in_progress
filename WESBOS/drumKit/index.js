var module = {
    init : function(){
        module.executeIt();
        window.addEventListener('keydown',function(e) {
            let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
            if(!key) return;
            // alert(key.innerText);
            key.classList.add('play');
        });
    },
    removeSelector : function(e) {
        //console.log(e)
        if(e.propertyName.transform) return;
        this.classList.remove('play');
    },
    executeIt : function() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(item => {
            item.addEventListener('transitionend', module.removeSelector)
        })
    }

}
module.init();