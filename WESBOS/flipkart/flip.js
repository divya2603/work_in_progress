var flip = (function(){
    var compareSummary,featuresList;
    var attachEvents = function(){
        window.addEventListener('click', compareAnother);
        window.addEventListener('change', dropDownSel)
        
    }
    var setData = function(compareSummary,featuresList){
        compareSummary = compareSummary;
        featuresList = featuresList;
        console.log(compareSummary)
    }
    var getData = function(url) {
		return fetch(url)
			.then(function(resp) {
				return resp.json();
			})
    }
    var dropDownSel =function(e) {
        var text ='',x,y,pog2;
        if(e.target.id === 'drop'){
            x=e.target.selectedIndex;
            y=e.target.options[x].text;
            text = y;
        }
        var com = compareSummary.titles;
        for(var i in com){
            if(com[i].title === y){
                pog2=i
            }
        }
        console.log(text);

        populateItems(compareSummary,featuresList, pog2);
    }
    var compareAnother = function(e){
        if(!e.target.classList.contains('remove')) return;
        var inp= `<select id="drop">`,i=0;
        var com = compareSummary.titles;
        var title = Object.values(com);

        title.forEach(item => {
            inp+=`<option value="${i}">${item.title}</option>`;
            i++;
        })
        document.querySelector('.add').classList.remove('hidden');
        document.querySelector('.add').innerHTML+=(inp+`</select>`);
        
    }

    var mapProperty =function(val, product, list, pog2){
        for(var i=0;i<val.length;i++){
            list+=`<div class="title">${val[i].featureName}</div>`;
            list+=`
                <div class="feature-val">${val[i].values && val[i].values[product]}</div>
                <div class="feature-val">${val[i].values && val[i].values[pog2]}</div>
                `
        }
        document.querySelector('.features').innerHTML=list
    }
    var createFeatures =function(item,product, pog2){
        var list='';
        for(var i=0;i<item.length;i++){
            list+=`<div class="title">${item[i].title}</div>`;
            mapProperty(item[0].features, product, list, pog2);
        }
        
        
    }
    var populateItems = function(compareSummary,featuresList,pog2){ 
        console.log(compareSummary);
        console.log(featuresList);
        var res='',arr=[],domNode='',keys='',pog1='';
        for(var i=0;i<2;i++){
           // for(var prop in compareSummary){
                keys = Object.keys(compareSummary.images);
                pog1=keys[0];
                pog2=pog2 || keys[1];
                if(pog2){
                    keys[1]=pog2
                }
                console.log(keys)
                console.log('arr',arr);
                res+= `<div class="first-item item">
                    <div class="image-container">
                        <div class="image">
                            <img src="${compareSummary.images[keys[i]]}" alt="" srcset="">
                            <span class="remove">X</span>
                            <p class="title">${compareSummary.titles[keys[i]].title}</p>
                            <p class="price">
                                <span class="sel-price">${compareSummary.productPricingSummary[keys[i]].finalPrice}</span>
                                <span class="actual-price">${compareSummary.productPricingSummary[keys[i]].price}</span>
                                <span class="dis">${compareSummary.productPricingSummary[keys[i]].totalDiscount}%</span>
                            </p>
                        </div>
                    </div>
                </div>`
        }
        document.querySelector('.compare').innerHTML=res;

        featuresList.map((item,index) => {
            domNode+= `
                 <div class="title">${item.title}</div>
             `;
             //createFeatures(item, pog1);
         });
         createFeatures(featuresList, pog1, pog2);
         document.querySelector('.features-container .title-name').innerHTML=domNode;
         
    }
    var init = function(){
        getData('https://flipkart-mock-product.now.sh').then(function(result) {
			compareSummary = result.products.compareSummary;
            featuresList = result.products.featuresList;
            setData(compareSummary,featuresList);
			populateItems(compareSummary,featuresList);
        });
        window.onload = function() {
            attachEvents();
        }
    }
    return {
        init:init
    }
})();
flip.init();