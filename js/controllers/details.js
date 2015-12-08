"use strict";

app.controller('Submission', ['$scope','$location', '$http', function ($scope, $location, $http) {
	
	var idsubmissions = JSON.parse(sessionStorage.getItem('idConsentSelected'));
	$scope.submissions = {};
	$scope.deniedDescription = "";

	$scope.init = function(){
		var res = $http.get("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/submissions/" + idsubmissions,{ headers: {'Authorization': 'Basic dGF1cG8tY291bmNpbEB0ZGMuY28ubno6dGF1cG9jb3VuY2ls' } });
		res.success(function(data, status, headers, config) {
			$scope.submissions = data;
			console.log($scope.submissions);
		});
		res.error(function(data, status, headers, config) {
			// Handle error 
		});	
	};

	$scope.accepted = function(){
		$.ajax({
  type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'IpwEOcmFtFg4Wx9qYcwvEQ',
    'message': {
      'from_email': 'mohamed@vizbot.co.nz',
      'to': [
          {
            'email': 'buildingconsents@taupo.govt.nz',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': 'Vetting Process',
      'html':'<h3>Dear building consents team</h3><br/>We would like to inform you that: <br/>' + $scope.submissions.title + '<br/>'+ $scope.submissions.address + '<br/>'+'has been vetted by someone in your team via VetBot.<br/>'+'The agent has been notified.<br/>'+'<h3>Next steps: </h3>'+'Please check in your internal system to process this application as per usual.'+'<br/>'+'<br/>'+'Cheers,<br/>'+'Vizbot'
    }
  }
 }).done(function(response) {
   $('#acceptedBox').modal('hide');
   var res = $http.post("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/submissions/" + idsubmissions + "/accepted", "" ,{ headers: {'Authorization': 'Basic dGF1cG8tY291bmNpbEB0ZGMuY28ubno6dGF1cG9jb3VuY2ls' } });
		res.success(function(data, status, headers, config) {
			console.log("Vetting done");
		});
		res.error(function(data, status, headers, config) {
			// Handle error 
		});	
   console.log(response); // if you're into that sorta thing
 });
	};

	$scope.deny = function(){
		var res = $http.post("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/submissions/" + idsubmissions + "/denied",$scope.deniedDescription, { headers: {'Authorization': 'Basic dGF1cG8tY291bmNpbEB0ZGMuY28ubno6dGF1cG9jb3VuY2ls' } });
		res.success(function(data, status, headers, config) {
			console.log("done");
		});
		res.error(function(data, status, headers, config) {
			// Handle error 
		});

	};

}]);

