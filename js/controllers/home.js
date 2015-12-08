"use strict";

app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.submissions = [];
	
	$scope.init = function(){
		var res = $http.get("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/submissions",{ headers: {'Authorization': 'Basic dGF1cG8tY291bmNpbEB0ZGMuY28ubno6dGF1cG9jb3VuY2ls' } });
		res.success(function(data, status, headers, config) {
			for (var i = 0; i < data.length; i++) {
				var sub = $http.get("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/submissions/"+ data[i]._id,{ headers: {'Authorization': 'Basic dGF1cG8tY291bmNpbEB0ZGMuY28ubno6dGF1cG9jb3VuY2ls' } });
				sub.success(function(data, status, headers, config) {
					if(data.status === 'submitted')
						$scope.submissions.push(data);
				});
			};
			console.log($scope.submissions);	
		});
		res.error(function(data, status, headers, config) {
			// Handle error 
		});	
	};

	$scope.details = function(id){
		sessionStorage.setItem('idConsentSelected', JSON.stringify(id));
	};
	
}]);