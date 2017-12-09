
var pages = ["searchPage","accountPage","menuPage"];
var pageIndex = -1;
/*
var database = [
			{name:"Shree Sai", price: 12},
			{name:"Mint Leaf", price: 42},
			{name:"Green Board", price: 5},
			{name:"SpiceM", price: 24},
			{name:"McRonald", price: 18},
			{name:"Plum", price: 34},
			{name:"Tipsy", price: 85},
			{name:"Walnut", price: 25},
			{name:"Crook", price: 48}
];
*/

var database = [];


var data = [];

function bakeDataCell(acc){
	
	console.log("baking "+acc.Name);
	return {'name': acc.Name, 'price': (acc.StartPrice__c)?acc.StartPrice__c: '-'};
}

function fetchData(resJson){

	data = JSON.parse(resJson);
	console.log("Recv "+resJson.length);

	var val = document.getElementById("rName").value.toLowerCase();
	
	for(var i=0; i<database.length; i++)
		if(database[i].name.toLowerCase().indexOf(val)!=-1)
			data.push(bakeDataCell(database[i]));
		
	fillData();
	goNext();		
}

function fillData(){
	
	var table = document.getElementById("resultContainer");
	table.innerHTML = "";
	
	for(var i=0; i<data.length; i++){
		
		var node = document.createElement("DIV");
		node.className = "row";
		//node.style.animation = "shine 2s";
		node.onclick = goNext;
		
		var cell1 = document.createElement("DIV");
		cell1.className = "rLogo";
		var text1 = document.createTextNode(i);
		cell1.appendChild(text1);		
		node.appendChild(cell1);

		var cell2 = document.createElement("DIV");
		cell2.className = "rName";
		var text2 = document.createTextNode(data[i].name);
		cell2.appendChild(text2);		
		node.appendChild(cell2);

		var cell3 = document.createElement("DIV");
		cell3.className = "rPrice";
		var text3 = document.createTextNode("₹​ "+data[i].price);
		cell3.appendChild(text3);		
		node.appendChild(cell3);
		
		table.appendChild(node);
	}
}

function sortMonthAsc(a,b){
		return a.month.localeCompare(b.month);
}

function sortMonthDesc(b,a){
		return a.month.localeCompare(b.month);
}

function sortSaleAsc(a,b){
		return a.sales - b.sales;
}

function sortSaleDesc(b,a){
		return a.sales - b.sales;
}

function sort(col){
	
	if(col==1){
		if(sOrder){
			data.sort(sortMonthDesc);
			sOrder = 0;
		} else {
			data.sort(sortMonthAsc);
			sOrder = 1;
		}
	} else if(col==2){
		if(sOrder){
			data.sort(sortSaleDesc);
			sOrder = 0;
		} else {
			data.sort(sortSaleAsc);
			sOrder = 1;
		}
	} else {
		if(sOrder){
			data.sort(sortMonthDesc);
			sOrder = 0;
		} else {
			data.sort(sortMonthAsc);
			sOrder = 1;
		}
	}

	sCol = col;
	
	var table = document.getElementById("resultContainer");
	table.innerHTML = "";
	
	fillData();
}

function goNext(){
	
	if(pageIndex>-1){
		var currentPage = document.getElementById(pages[pageIndex]);
		currentPage.style.display = "none";
	}
	
	if(pageIndex<pages.length)
		pageIndex++;
	
	console.log("displaying .."+pageIndex);
	
	var newPage = document.getElementById(pages[pageIndex]);
	newPage.style.display = "block ";
}

function goBack(){
	
	var currentPage = document.getElementById(pages[pageIndex]);
	currentPage.style.display = "none";
	
	if(pageIndex>0)
		pageIndex--;
	
	var newPage = document.getElementById(pages[pageIndex]);
	newPage.style.display = "block ";
}
