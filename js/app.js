/* global $ */
/* global angular */
angular.module('app', ['ui.layout'])
	.controller('MainCtrl', function($scope) {
		this.input = '';
		var that = this;
		
		
		var container = document.getElementById('editor-area');
		var editor = CodeMirror(container, {
			mode: 'bfmode',
			lineWrapping: true,
			matchBrackets: true,
			autoCloseBrackets: true
		});
		
		this.code = function() {return editor.getValue();};
		
		this.results = [];
		
		var runner;
		this.run = function (input, code) {
			var pointerLen = 200;
			if (!runner) {
				runner = new CerebrumIrrumabo(input, code, pointerLen);
			}
			runner.debug = true;
			// runner.addBreakpoint(2);
			var test = runner.run();
			if (test.endOfCode) {
				this.results.push(test.output);
			}
			console.log(test);
		};
		
		this.openFile = function() {
			chrome.fileSystem.chooseEntry({type: 'openWritableFile'}, function(entry, entries) {
				console.log(entry + '\n', entries);
			});
		};
		
	})
	
	.directive('heightWatch', function($window) {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				console.log(element);
				console.log(attrs);
				setTimeout(function() {
					var winHeight = $window.innerHeight;
					console.log(winHeight - 300);
					element.css('height', (winHeight / 1.5).toString() +  'px');
				}, 0);
			}
		};
	});