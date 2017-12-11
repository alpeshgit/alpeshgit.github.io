

function navPageSrch(){

	console.log("Search page");
	document.getElementById("accountPage").style.display = "none";
	document.getElementById("searchPage").style.display = "block";
}

function navPageAcc(){

	document.getElementById("searchPage").style.display = "none";
	document.getElementById("accountPage").style.display = "block";
}


navPageSrch();