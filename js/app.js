/* global chrome */
/* global CerebrumIrrumabo */
/* global $ */
/* global angular */


angular.module('app', ['ui.layout'])
	.controller('MainCtrl', function($scope) {
		this.input = '';
		var that = this;
		
		this.loadedFileName = '';
		this.currentFileName = '';
		this.saved = true;
		
		this.consoleClass = '';
		this.debugClass = 'hidden';
		
		var container = document.getElementById('editor-area');
		var editor = CodeMirror(container, {
			mode: 'bfmode',
			lineWrapping: true,
			matchBrackets: true,
			autoCloseBrackets: true
		});
		editor.setOption('save', {
			'Ctrl-S': function () {
				that.saveFile(that.entry);
			}
		});
		
		//Listen for changes:
		editor.on('change', function(instance, change) {
			if (that.saved && change.origin != 'setValue') {
				console.log(change);
				that.currentFileName += '*';
				that.saved = false;
				$scope.$apply();
			} else if (change.origin == 'setValue' && that.saved == false) {
				that.saved = true;
			}
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
			try {
				var test = runner.run();
				if (test.endOfCode) {
					this.results.push(test.output + '\n');
				}
				console.log(test);
			} catch (e) {
				this.results.push('Error: ' + e);
			}
		};
		
		this.openFile = function() {
			chrome.fileSystem.chooseEntry({type: 'openWritableFile'}, function(entry) {
				that.fileEntry = entry;
				if (entry) {
					entry.file(function(file) {
						var fileReader = new FileReader();
						
						fileReader.onload = function(e) {
							that.currentFileName = file.name;
							that.loadedFileName = file.name;
							editor.setValue(e.target.result);
							$scope.$apply();
							//Save the last loaded file to localStorage   TODO: Fix this, it's not freakin working
							chrome.storage.local.set({lastLoaded: entry.fullPath});
						};
						
						fileReader.readAsText(file);
					});
				}
			});
		};
		
		this.saveFile = function(entry) {
			if (entry) {
				entry.createWriter(function(fileWriter) {
					fileWriter.onerror = function(e) {
				      console.log("Write failed: " + e.toString());
				    };
					var blob = new Blob(['This is a super long test'], {type: "text/plain"});
					// fileWriter.truncate(blob.size);
					
					fileWriter.onwriteend = function() {
						that.saved = true;
						that.currentFileName = that.loadedFileName;
						$scope.$apply();
						console.log('File Saved');
					};
					
					fileWriter.write(blob);
				});
			}
		}
		
		this.toggleConsoleArea = function(panelToShow) {
			if (panelToShow == 'console') {
				this.consoleClass = '';
				this.debugClass = 'hidden';
			} else {
				this.consoleClass = 'hidden';
				this.debugClass = '';
			}
		};
		
		
		//Init:
		//TODO: Fix this as well since, you guessed it, it's not fffffinng working either....
		chrome.storage.local.get('lastLoaded', function(result) {
			chrome.fileSystem.getFile(result.lastLoaded.toString(), function (entry) {
				console.log(entry);
			});
			console.log(result.lastLoaded.toString());
		});
		
	})
	
	.directive('heightWatch', function($window) {
		return {
			restrict: 'A',
			
			link: function(scope, element, attrs) {
				// console.log(element);
				// console.log(attrs);
				function update() {
					var winHeight = $window.innerHeight;
					console.log(winHeight - 300);
					element.css('height', (winHeight / 1.5).toString() +  'px');
				}
				update();
				angular.element(window).on('resize', function (e) {
					update();
				});
			}
		};
	});