"use strict";

app.controller('Submission', ['$scope','$location', '$http', function ($scope, $location, $http) {
	
	var idsubmissions = JSON.parse(sessionStorage.getItem('idConsentSelected'));
	$scope.submissions = {};

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
            'email': 'matt@vizbot.co.nz',
            'type': 'to'
          },
          {
            'email': 'samson@vizbot.co.nz',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': 'First mail from VetBot',
      'html': '<h1>Hey Guys</h1><br/>This is the first mail from vizbot :)'
    }
  }
 }).done(function(response) {
   console.log(response); // if you're into that sorta thing
 });
	};
}]);