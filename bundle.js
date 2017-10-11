/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var puzzles = __webpack_require__(1);
var boardEl = document.getElementById("puzzle");
function drawBoard(puzzle) {
    puzzle.values.forEach(function (row) {
        var rowEl = document.createElement("div");
        rowEl.className = "row clear";
        row.forEach(function (spot) {
            var div = document.createElement('div');
            div.classList.add("triangle");
            if (spot) {
                if (spot.up) {
                    div.classList.add("up");
                }
                else {
                    div.classList.add("down");
                }
                for (var i = 0; i < 3; i++) {
                    var side = document.createElement('div');
                    side.classList.add('side');
                    div.appendChild(side);
                }
                var text = document.createElement('span');
                text.innerText = spot.value;
                div.appendChild(text);
            }
            rowEl.appendChild(div);
        });
        boardEl.appendChild(rowEl);
    });
}
drawBoard(puzzles.puzzle1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.puzzle1 = {
    height: 6,
    width: 9,
    maxNum: 4,
    values: [
        [
            null,
            null,
            {
                up: true,
                value: 3
            },
            {
                up: false,
                value: 4
            },
            {
                up: true,
                value: 2
            },
            {
                up: false,
                value: 1
            },
            {
                up: true,
                value: 2
            },
            null,
            null
        ],
        [
            null,
            {
                up: true,
                value: 6
            },
            {
                up: false,
                value: 6
            },
            {
                up: true,
                value: 7
            },
            {
                up: false,
                value: 7
            },
            {
                up: true,
                value: 5
            },
            {
                up: false,
                value: 4
            },
            {
                up: true,
                value: 3
            },
            null
        ],
        [
            null,
            {
                up: false,
                value: 4
            },
            {
                up: true,
                value: 5
            },
            {
                up: false,
                value: 5
            },
            null,
            {
                up: false,
                value: 8
            },
            {
                up: true,
                value: 4
            },
            {
                up: false,
                value: 0
            },
            null
        ],
        [
            null,
            {
                up: true,
                value: 7
            },
            {
                up: false,
                value: 6
            },
            null,
            null,
            null,
            {
                up: false,
                value: 8
            },
            {
                up: true,
                value: 6
            },
            null
        ],
        [
            {
                up: true,
                value: 9
            },
            {
                up: false,
                value: 8
            },
            null,
            null,
            null,
            null,
            null,
            {
                up: false,
                value: 3
            },
            {
                up: true,
                value: 5
            },
        ],
        [
            {
                up: false,
                value: 11
            },
            {
                up: true,
                value: 9
            },
            {
                up: false,
                value: 10
            },
            {
                up: true,
                value: 10
            },
            {
                up: false,
                value: 9
            },
            {
                up: true,
                value: 12
            },
            {
                up: false,
                value: 8
            },
            {
                up: true,
                value: 6
            },
            {
                up: false,
                value: 7
            },
        ],
    ]
};


/***/ })
/******/ ]);