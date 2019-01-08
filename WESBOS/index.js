var searchProducts = (function() {
	var productList, filters, colors, prizes, brands, AllProducts, colorArray=[];

	var attachEvents = function() {
		document.getElementById('filter-brand').addEventListener('input', checkInputBrand);
		document.getElementsByClassName('filter-color')[0].addEventListener('click', checkForFilter);
		document.getElementById('level-select').addEventListener('change', setMinValue);
		document.getElementById('price-select').addEventListener('change', setMinValue);
	}

	var checkForFilter = function(event) {
		console.log(event.target);
		if(event.target.id && event.target.type==='checkbox') {
			if(event.target.checked) {
				colorArray.push(event.target.id)
			} else {
				colorArray.splice(colorArray.indexOf(event.target.id),1);
			}
			console.log(colorArray);
			productList = AllProducts.filter(function(product) {
				return (colorArray.indexOf(product.colour.title) >-1 || !colorArray.length);
			});
			populateItems();
			}
	}

	var setMinValue = function(event) {
		var minVal = document.getElementById('level-select').value == 'Min' ? 0 : document.getElementById('level-select').value,
			maxVal = document.getElementById('price-select').value;

			/*minVal = minVal.replace(/&#x20b9;/g, '');*/
			minVal = minVal.substr(1,minVal.length);
			maxVal = parseInt(maxVal.substr(1,maxVal.length-1));

			// if(parseInt(maxVal) === 'NaN') {
			// 	maxVal = maxVal.substr(1,maxVal.length-2);
			// }

			console.log(minVal,maxVal);

			productList = AllProducts.filter(function(product) {
				return (product.price.final_price >= minVal && product.price.final_price < maxVal);
			});
			console.log(productList);
			populateItems();
	}

	var checkInputBrand = function(event) {
		console.log(event.target.value);
		productList = AllProducts.filter(function(product) {
			return (product.brand.indexOf(event.target.value) >-1 || !event.target.value);
		});

		populateItems();
	}

	var populateItems = function() {
		var listWrapper = document.getElementsByClassName('items')[0],
			listStr='';

		for(var item of productList) {
			listStr+= "<li data-id='"+item.id+"'><img src='"+item.image+"' alt='"+item.brand+"'/><p class='item-title'>"+item.brand+"</p><p class='rating'><span>"+item.rating+"</span></p><span class='item-prize'>"+item.price.final_price+"</span><span class='item-discount'>"+item.discount+"%</span></li>"
		}

		listWrapper.innerHTML = listStr;
	}

	var populateFilters = function() {
		var prizeMinSelect = document.getElementById('level-select'),
			prizeValueSelect = document.getElementById('price-select'),
			colorsFilter = document.getElementsByClassName('filter-color')[0],
			colorStr='<p>Color</p>', prizeStrmin='', prizeStrMax='', totalMin = prizes[0].values.length, count=0;

		for(var color of colors[0].values) {
			colorStr+= "<div class='color-wrapper'><input type='checkBox' value='"+color.title+"' id='"+color.title+"' /><label for='"+color.title+"'><span class='"+color.color+"' style={color:'"+color.color+"'}></span><span class='color-title'>"+color.title+"<span></label></div>"
		}

		for(var prize of prizes[0].values) {
			count++;
			if(count <= totalMin/2) {
				prizeStrmin+= "<option value='"+prize.displayValue+"'>"+prize.displayValue+"</option>" 
			} else if(count > totalMin/2 && count < totalMin) {
				prizeStrMax+= "<option value='"+prize.displayValue+"'>"+prize.displayValue+"</option>"
			}else {
				prizeStrMax+= "<option selected value='"+prize.displayValue+"'>"+prize.displayValue+"</option>"
			}
			
		}

		prizeMinSelect.innerHTML = prizeStrmin;
		prizeValueSelect.innerHTML = prizeStrMax;


		colorsFilter.innerHTML = colorStr;
	}

	var getData = function(url) {
		return fetch(url)
			.then(function(resp) {
				return resp.json();
			})
	}

	var separatefilters = function() {
		console.log(filters);
		colors = filters.filter(function(obj) {
			return obj.type === 'COLOUR'
		});

		prizes = filters.filter(function(obj) {
			return obj.type === 'PRICE'
		});

		brands = filters.filter(function(obj) {
			return obj.type === 'BRAND'
		});

		populateFilters();
	}
	
	var init= function() {
		productList = getData('http://demo1853299.mockable.io/products').then(function(result) {
			productList = result.products;
			AllProducts = productList;
			populateItems();
		});
		filters = getData('http://demo1853299.mockable.io/filters').then(function(result) {
			filters = result.filters;
			separatefilters();
		});
		attachEvents();
		
	}
	return {
		init:init
	};
})();

searchProducts.init();