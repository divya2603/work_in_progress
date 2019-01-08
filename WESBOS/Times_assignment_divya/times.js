var times = (function(){
    var searchRes ,pageSummary, order=-1;
    var getData = function(url) {
		return fetch(url)
			.then(function(resp) {
				return resp.json();
			})
    }
    var setData = function(res){
        searchRes = res.searchresult;
        pageSummary = res.pagesummary;
    }
    var populatePage = function(res) {
        var resp='';
        res.forEach(product => {
            var changeClass = product.percentChange > 0 ? 'pos' : 'neg';
            var changeSign = product.percentChange > 0 ? '+' : '-';
            var arrow = product.percentChange > 0 ? '<i class="fa fa-arrow-up" aria-hidden="true"></i>' : '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            resp+= `<div class="container">
            <p class="product-name">${product.companyShortName}</p>
            <div class="price-section">
                <p class="price stack">price</p>
                <p class="change stack">change ${arrow}</p>
                <p class="position stack">position on 52week</p>
            </div>
            
                <p class="a-price stack">${product.current}</p>
                <p class="a-change stack">
                    <span class="rel-change">
                        ${product.absolutechange}
                    </span>
                    <span class="percent-change ${changeClass}">
                        (${changeSign}${product.percentChange}%)
                    </span>
                </p>
                <p class="a-position stack">
                <input name="spacing" class="slider" type="range" data-sizing="px" min="${product.low}" max="${product.high}" value="${product.current}"/>
                </p>
            
        </div>`
        });
        return resp;
        //document.querySelector('.wrapper').innerHTML+=res;
    }
    var filterData = function(e) {
        var filterData = this.children[0].value;
        console.log(searchRes)
        var op = searchRes.filter(function (a) {
            return parseInt(a.current) > parseInt(filterData);
          });
          if(op.length >1) {
            var filteredUI = populatePage(op);
            document.querySelector('.wrapper').innerHTML=filteredUI;
          }
    }
    var showOverlay = function() {
        document.querySelector('.overlay-container input').value = "";
        document.querySelector('.overlay-container').classList.remove('hidden');
        document.querySelector('.overlay-container').classList.remove('flex');
    }
    var hideOverlay = function() {
        document.querySelector('.overlay-container').classList.add('hidden');
        document.querySelector('.overlay-container').classList.remove('flex');
    } 
    var searchedData = function() {
        var inp = this.value,op=[];
        console.log(inp);
            op = searchRes.filter(item => {
                return item.companyShortName.toLowerCase().includes(inp.toLowerCase())
            });
        var searchedUi = populatePage(op);
        document.querySelector('.wrapper').innerHTML=searchedUi;    
    }
    var sortData = function(){
        order=order*-1;
        var op = searchRes.sort(function (a, b) {
            return order * (a.value - b.value);
          });
          var sortUi = populatePage(op);
         document.querySelector('.wrapper').innerHTML=sortUi;
    }
    var init = function(){
        getData('http://json.bselivefeeds.indiatimes.com/ET_Community/Gain?pagesize=100').then(res => {
            setData(res);
            var ui = populatePage(res.searchresult);
            document.querySelector('.wrapper').innerHTML+=ui;
        })
        attachEvents();
    }
    var attachEvents = function() {
        document.querySelector('.search').addEventListener('keyup',searchedData);
        document.querySelector('.sort').addEventListener('click',sortData);
        document.querySelector('.filter').addEventListener('click', showOverlay)
        document.querySelector('.text').addEventListener('click', filterData)
        document.querySelector('.remove-icon').addEventListener('click', hideOverlay)
    }
    return {
		init:init
	};
})();
times.init();