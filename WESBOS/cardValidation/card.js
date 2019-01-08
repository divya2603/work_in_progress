var card = (function() {
    var cardInfo='';
    var cardPattern='';
    var aCardInfo='';
    var getCardInfo = function(url) {
        return fetch(url)
			.then(function(resp) {
				return resp.json();
			})
    }
    
    var enableFields =function(cardPattern) {
        var inp = parseInt(document.querySelector('#card-no').value);
        //cardPattern && document.querySelector('#card-no').setAttribute('maxlength',cardInfo[cardPattern].cardNumberLength)
        if(cardPattern && (''+inp).length>0 && (''+inp).length == cardInfo[cardPattern].cardNumberLength) {
            document.querySelectorAll('.date').forEach(item => {
                item.removeAttribute('disabled')
            })
            document.querySelector('#cvv').removeAttribute('disabled');
            document.querySelector('#cvv').setAttribute('maxlength', cardInfo[cardPattern].cvvLength);
        }
    }

    var validateCVV = function(e){
        e.preventDefault();
        document.querySelector('.err').innerHTML = '';
        var cvv = document.querySelector('#cvv').value;
        var card=document.querySelector('.card-name').innerHTML;
        if(card && cardInfo[card].cvv == 'required') {
           if(cvv.length != cardInfo[card].cvvLength){
                document.querySelector('.err').innerHTML = ("<p>cvv is required</p>")
           }
        }
        storeInfo();
        clearFields();

    }
    var clearFields = function(){

    }
    var storeInfo = function() {
        var ls='';
        var info={}; var cardP=false;
        info.displayText = document.querySelector('.card-name').innerHTML;
        info.num=document.querySelector('#card-no').value;
        ls = localStorage.getItem('info');
        if(!ls) {
            ls=[];
            ls.push(info);
        }else {
            ls = JSON.parse(ls);
            var cardP =ls.filter(item => item.num === info.num)
            if(cardP == 0){
                ls.push(info);
            }
        }
       
        localStorage.setItem('info', JSON.stringify(ls));
        
    }
    var validateCardNo = function() {
        var inp = parseInt(this.value);
        // {
        //     "VISA": {
        //       "cardPattern": "/^4/",
        //       "cardNumberLength": 16,
        //       "cvv": "required",
        //       "cvvLength": 3,
        //       "displayText": "Visa"
        //     },
        //     "MASTERCARD": {
        //       "cardPattern": "/^5[1-5]/",
        //       "cardNumberLength": 16,
        //       "cvv": "required",
        //       "cvvLength": 3,
        //       "displayText": "Master"
        //     },
        //     "MAESTRO": {
        //       "cardPattern": "/^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/",
        //       "cardNumberLength": 19,
        //       "cvv": "optional",
        //       "cvvLength": 4,
        //       "displayText": "Maestro"
        //     }
        //   }
        
        cardPattern = testReg(inp);
        document.querySelector('.card-name').innerHTML=cardPattern ? cardPattern : '';
        enableFields(cardPattern) ;
    }
    var testReg = function( inp ) {
        var cp = [/^4/, /^5[1-5]/, /^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/],cT;
         cp.forEach(function(x, index) {
            if(x.test(inp)){
                if(index === 0) {
                    cT= "VISA"
                }
                if(index === 1) {
                    cT =" MASTERCARD"
                }
                if(index === 2){
                    cT = "MAESTRO"
                }
            }
        });
        return cT;
    }

    var attachEvents = function(){
        document.querySelector('#card-no').addEventListener('keyup',validateCardNo);
        document.querySelector('.submit-btn').addEventListener('click',validateCVV);
    }

    var setCardInfo =function(setCardInfo,aCardInfo) {
        cardInfo =cardInfo
        aCardInfo=aCardInfo;
    }
    var populateData = function() {
        var ls=JSON.parse(localStorage.getItem('info'));var res='';
        ls.forEach((item, index) => {
           res+= `<p class="saved-info">
            <span class="s-card-name"> Debit card</span>
            <span class="edit">edit</span>
            <span class="del">DELETE</span>
        </p>
        <p>
            <span class="s-card">${item.displayText}</span>
            <span class="s-card-num">${item.num}</span>
        </p>`
        })
        document.querySelector('#saved-cards').innerHTML=res;
    }
    var validation = function() {
        populateData();
        cardInfo = getCardInfo('https://api.myjson.com/bins/fvzpp').then(res => {
            cardInfo = res;
            
            var aCardInfo=[];
            for(var prop in cardInfo) {
                aCardInfo.push(cardInfo[prop]);
            }
            setCardInfo(cardInfo, aCardInfo);
        });
        attachEvents();
    }
    return {
        validation:validation
    }
})();
card.validation();