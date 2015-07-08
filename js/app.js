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
		
		var engineIsDirty = true;
		
		//Set up the editor
		var container = document.getElementById('editor-area');
		var editor = CodeMirror(container, {
			mode: 'bfmode',
			lineWrapping: true,
			matchBrackets: true,
			autoCloseBrackets: true
		});
		editor.setOption('extraKeys', {
			'Ctrl-S': function () {
				that.saveFile(that.fileEntry);
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
		
		//Set up the CerebrumIrrumabo Instance
		this.pointerLen = 200;//TODO: Add a binding for this on the front end
		var runner = new CerebrumIrrumabo('', '', this.pointerLen);
		this.run = function (input, code) {
			if (engineIsDirty) {
				runner.debug = true;
				runner.code = code;
				runner.input = input;
			}
			try {
				var test = runner.run();
				if (test.endOfCode) {
					this.results.push(test.output + '\n');
					engineIsDirty = true;
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
					var blob = new Blob([editor.getValue()], {type: "text/plain"});
					
					fileWriter.onwriteend = function() {
						that.saved = true;
						that.currentFileName = that.loadedFileName;
						$scope.$apply();
						console.log('File Saved');
					};
					
					fileWriter.write(blob);
				});
			} else {
				throw 'File was not saved';
			}
		};
		
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