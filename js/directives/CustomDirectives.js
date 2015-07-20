angular.module('customDirectives', function () {
	
	})
	.directive('heightWatch', function($window) {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				function update() {
					var winHeight = $window.innerHeight;
					console.log(winHeight - 300);
					element.css('height', (winHeight / 1.5).toString() + 'px');
				}
				update();
				angular.element(window).on('resize', function (e) {
					update();
				});
			}
		};
	})
	.directive('console', function($window) {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				function update() {
					console.log('update being called');
					var ribbonArea = document.getElementById('ribbon-area');
					var editorArea = document.getElementById('editor-area');
					
					var combinedHeight = ribbonArea.offsetHeight + editorArea.offsetHeight;
					
					var windowHeight = window.innerHeight;
					
					element.css('height', (windowHeight - combinedHeight) - 46 + 'px');
				}
				
				angular.element(window).on('mousemove', function() {
					update();
				});
				
				
			}
		};
	})
	.directive('destroy', function() {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				element.remove();
			}
		}
	});