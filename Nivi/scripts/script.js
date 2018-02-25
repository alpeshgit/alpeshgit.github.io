
        function changeHue(rgb, degree) {
            var hsl = rgbToHSL(rgb);
            hsl.h += degree;
            if (hsl.h > 360) {
                hsl.h -= 360;
            }
            else if (hsl.h < 0) {
                hsl.h += 360;
            }
            return hslToRGB(hsl);
        }

        // expects a string and returns an object
        function rgbToHSL(rgb) {
            // strip the leading # if it's there
            rgb = rgb.replace(/^\s*#|\s*$/g, '');

            // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
            if(rgb.length == 3){
                rgb = rgb.replace(/(.)/g, '$1$1');
            }

            var r = parseInt(rgb.substr(0, 2), 16) / 255,
                g = parseInt(rgb.substr(2, 2), 16) / 255,
                b = parseInt(rgb.substr(4, 2), 16) / 255,
                cMax = Math.max(r, g, b),
                cMin = Math.min(r, g, b),
                delta = cMax - cMin,
                l = (cMax + cMin) / 2,
                h = 0,
                s = 0;

            if (delta == 0) {
                h = 0;
            }
            else if (cMax == r) {
                h = 60 * (((g - b) / delta) % 6);
            }
            else if (cMax == g) {
                h = 60 * (((b - r) / delta) + 2);
            }
            else {
                h = 60 * (((r - g) / delta) + 4);
            }

            if (delta == 0) {
                s = 0;
            }
            else {
                s = (delta/(1-Math.abs(2*l - 1)))
            }

            return {
                h: h,
                s: s,
                l: l
            }
        }

        // expects an object and returns a string
        function hslToRGB(hsl) {
            var h = hsl.h,
                s = hsl.s,
                l = hsl.l,
                c = (1 - Math.abs(2*l - 1)) * s,
                x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
                m = l - c/ 2,
                r, g, b;

            if (h < 60) {
                r = c;
                g = x;
                b = 0;
            }
            else if (h < 120) {
                r = x;
                g = c;
                b = 0;
            }
            else if (h < 180) {
                r = 0;
                g = c;
                b = x;
            }
            else if (h < 240) {
                r = 0;
                g = x;
                b = c;
            }
            else if (h < 300) {
                r = x;
                g = 0;
                b = c;
            }
            else {
                r = c;
                g = 0;
                b = x;
            }

            r = normalize_rgb_value(r, m);
            g = normalize_rgb_value(g, m);
            b = normalize_rgb_value(b, m);

            return rgbToHex(r,g,b);
        }

        function normalize_rgb_value(color, m) {
            color = Math.floor((color + m) * 255);
            if (color < 0) {
                color = 0;
            }
            return color;
        }

        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        function anime() {
            var stripe = document.getElementById("searchBar");
            var color = "#800000";

            var p = setInterval(function(){
            	color = changeHue(color, 2)
            	stripe.style.borderBottomColor = color;
            	//console.log("HEX "+color);
            },1000/60);

            setTimeout(function(){
            	clearInterval(p);
            },5000);
        }

        function recreateTime(timeString){

            var time = new Date("1980-01-01T00:00:00.000Z");
            timeString = timeString.split(":");
            time.setHours(parseInt(timeString[0]));
            time.setMinutes(parseInt(timeString[1]));

            console.log("recreated "+time+" from "+timeString);
                
            return time;
        }

        function getTimeHMText(time){

            var timeH = time.getUTCHours();
            var timeM = time.getUTCMinutes();
            var mid = "AM";

            if(timeH>=12){
                timeH = timeH%12;
                mid = "PM";
            }

            if(timeH==0){
                timeH = 12;
            }

            if(timeH<10)
                timeH = "0"+timeH;
            if(timeM<10)
                timeM = "0"+timeM;

            return timeH+":"+timeM+" "+mid;
        }

        function getTimeText(t1, t2){

            return getTimeHMText(t1)+" to "+getTimeHMText(t2);
        }

        window.onhashchange = function() {       
            var scope = angular.element(document.querySelector("body[ng-controller='appController'")).scope();

            if (location.hash.length > 0) {        
                var hash = location.hash.replace('#/','');

                if(hash.includes("search"))
                    scope.navigatePage(1);
                else if(hash.includes("view")) {
                    var url = hash.split("/");
                    scope.navigatePage(2,url[1]);
                } else
                    scope.navigatePage(3);

            } else {

            }
           /* do work*/
           scope.$apply();
        }

        var myApp = angular.module("jurenuApp",[]);

        myApp.controller("appController",function($scope, $http){

        	$scope.fetchRestaurants = function(){

                $http.get("https://jurenu-developer-edition.ap5.force.com/sana/services/apexrest/eateries")
                .then(function(response) {

                    var resp = response.data;

                    if(resp.result==200){

                        var restaurants = resp.searchResult;

                            // parse times
                        for(var i=0; i<restaurants.length; i++){
                            restaurants[i].T1 = recreateTime(restaurants[i].T1);
                            restaurants[i].T2 = recreateTime(restaurants[i].T2);
                            restaurants[i].T3 = recreateTime(restaurants[i].T3);
                            restaurants[i].T4 = recreateTime(restaurants[i].T4);
                        }

                        $scope.restaurants = restaurants;
                        document.getElementById("loadPage").style.display = "none";
                        console.log("init");
                    }
                });
        	}

        	$scope.navigatePage = function(pageNum,payLoad){
        		$scope.page = pageNum;
        		console.log("page is "+pageNum);

        		if(pageNum==1){

        			$scope.fetchRestaurants();
                    location.hash = "/search";
        		} else if(pageNum==2){

                    if(payLoad>=$scope.restaurants.length)
                        return;

        			var restaurant = $scope.restaurants[payLoad];

                    // calculate current Status
                    var now = new Date();
                    //console.log(now.toJSON());
                    now.setMinutes(now.getMinutes()+330);
                    now.setDate(1);
                    now.setMonth(0);
                    now.setFullYear(1980);
                    //console.log("Now "+now.toJSON());
                    //var now = new Date("1980-01-01T22:45:00.000Z");
                    var OPENS_TIME = 60;
                    var CLOSES_TIME = 30;
                    var session = 0;

                    if(now<restaurant.T1){
                        if(Math.round((restaurant.T1-now)/ 60000)<OPENS_TIME){

                            restaurant.Status = "opens";
                            restaurant.StatusLine = "Opens soon!";
                        } else {
                            restaurant.Status = "closed";
                            restaurant.StatusLine = "Closed";
                        }
                        session = 1;
                    } else if(now<restaurant.T2){
                        if(Math.round((restaurant.T2-now)/ 60000)<CLOSES_TIME){
                            restaurant.Status = "closes";
                            restaurant.StatusLine = "Closes soon!";
                        } else {
                            restaurant.Status = "open";
                            restaurant.StatusLine = "Now open!";
                        }
                        session = 1;
                    } else if(now<restaurant.T3){
                        if(Math.round((restaurant.T3-now)/ 60000)<OPENS_TIME){

                            restaurant.Status = "opens";
                            restaurant.StatusLine = "Opens soon!";
                        } else {
                            restaurant.Status = "closed";
                            restaurant.StatusLine = "Closed";
                        }
                        session = 2;
                    } else if(now<restaurant.T4){
                        if(Math.round((restaurant.T4-now)/ 60000)<CLOSES_TIME){

                            restaurant.Status = "closes";
                            restaurant.StatusLine = "Closes soon!";
                        } else {
                            restaurant.Status = "open";
                            restaurant.StatusLine = "Now open!";
                        }
                        session = 2;
                    } else {

                        restaurant.Status = "closed";
                        restaurant.StatusLine = "Closed";
                        session = 2;
                    }

                    if(session == 1)
                        restaurant.Time = getTimeText(restaurant.T1,restaurant.T2);
                    else
                        restaurant.Time = getTimeText(restaurant.T3,restaurant.T4);

                   // set distance Text
                    restaurant.Distance = Math.floor(restaurant.Distance);            
                    restaurant.Distance = (restaurant.Distance>1000)?restaurant.Distance/1000+"<br />KM":restaurant.Distance+"<br />Metres";
                                
                    $scope.restaurant = restaurant;
                    location.hash = "/view/"+payLoad;
        		} else {

                    location.hash = "/go";
        		}

        	};

        	$scope.navigatePage(1);

        });
