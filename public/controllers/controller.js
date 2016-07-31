var myApp = angular.module('myApp',[]);
myApp.controller('appCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello from controller");

	var refresh = function(){
		$http.get("/contactlist").then(function(response){
			console.log("I got the data");

			$scope.contactlist=response.data;

		});
		$scope.contact="";
	};

	refresh();
	$scope.da=true;
	$scope.nu=false;
	$scope.addC = function(){
		var a=$scope.contact;
		console.log(a);

		$http.post("/contactlist",a).then(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete("/contactlist/" + id ).then(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		$http.get("/contactlist/"+id).then(function(response){
			$scope.contact = response.data;
			console.log(response);
		});
		$scope.da=false;
		$scope.nu=true;
	}

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put("/contactlist/"+ $scope.contact._id, $scope.contact).then(function(response){
			refresh();
		});
		$scope.da=true;
		$scope.nu=false;
	}


}]);