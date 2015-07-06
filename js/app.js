/* global angular */
angular.module('app', ['ui.layout'])
	.controller('MainCtrl', function($scope) {
		var container = document.getElementById('editor-area');
		var editor = CodeMirror(container, {
			mode: 'javascript'
		});
	});