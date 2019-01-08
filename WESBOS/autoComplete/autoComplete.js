var autoComplete = {
    init: function(val) {
        var res = document.querySelector('.atoComplete')
        res.addEventListener('keyup', function() {
            let wordsDom = (this.value) && this.value.length > 0 && autoComplete.addToDom(this.value);
            var r= document.querySelector('.result');
            console.log(wordsDom)
            r.innerHTML =wordsDom;
        })
    },
    search: function(arr,inp){
        return arr.filter((item => {return item.toLowerCase().includes(inp.toLowerCase())}))
    },
    addToDom: function(inp){
        let a=['adsf','hgsDJHG','DHJHSK','HDHHD','Ghgsjhgd','agfdfhjs','sdjhjkhf'],
        searchedWords = autoComplete.search(a, inp);
        var res = '<ul>'
        searchedWords.forEach((item) => {res+= `<li>${item}</li>`});
        return res+'</ul>';
    }

}
autoComplete.init();