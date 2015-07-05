/* global angular */
angular.module('app', [])
	.controller('MainCtrl', function($scope) {
		var container = document.getElementById('container');
		var editor = CodeMirror(container, {
			mode: 'javascript'
		});
	});