/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/connectors/http-connector.ts":
/*!***************************************************!*\
  !*** ./resources/js/connectors/http-connector.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var HttpConnector = function () {
  function HttpConnector(hostname) {
    this.hostname = hostname;
  }

  HttpConnector.prototype.getXMLHTTPObject = function () {
    for (var _i = 0, _a = [undefined, 'Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP']; _i < _a.length; _i++) {
      var arg = _a[_i];

      try {
        return arg ? new ActiveXObject(arg) : new XMLHttpRequest();
      } catch (_b) {//
      }
    }

    throw new Error('No XMLHttpObject available.');
  };

  HttpConnector.prototype.sendGetRequest = function (url) {
    var req = this.getXMLHTTPObject();
    return new Promise(function (resolve, reject) {
      req.onload = function () {
        var status = req.status,
            response = req.response,
            statusText = req.statusText;

        if (status && response && status >= 200 && status < 300) {
          resolve({
            status: status,
            payload: response
          });
        } else {
          reject({
            status: status,
            statusText: statusText
          });
        }

        req.onerror = function () {
          reject({
            status: status,
            statusText: statusText
          });
        };
      };

      req.open('GET', "https://" + url, true);
      req.send();
    });
  };

  HttpConnector.prototype.get = function (uri, query) {
    var url = "" + this.hostname + uri + "?" + new URLSearchParams(query).toString();
    return this.sendGetRequest(url);
  };

  return HttpConnector;
}();

exports.default = HttpConnector;

/***/ }),

/***/ "./resources/js/connectors/page-rules-http-connector.ts":
/*!**************************************************************!*\
  !*** ./resources/js/connectors/page-rules-http-connector.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PageRulesHttpConnector = void 0;

var http_connector_1 = __importDefault(__webpack_require__(/*! ./http-connector */ "./resources/js/connectors/http-connector.ts"));

var PageRulesHttpConnector = function (_super) {
  __extends(PageRulesHttpConnector, _super);

  function PageRulesHttpConnector(hostname) {
    return _super.call(this, hostname) || this;
  }

  PageRulesHttpConnector.prototype.fetchRule = function (pageUrl, projectId) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.get('/api/page-rules', {
              projectId: projectId,
              pageUrl: pageUrl
            })];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , JSON.parse(response.payload)];
        }
      });
    });
  };

  return PageRulesHttpConnector;
}(http_connector_1["default"]);

exports.PageRulesHttpConnector = PageRulesHttpConnector;

/***/ }),

/***/ "./resources/js/enviroment.ts":
/*!************************************!*\
  !*** ./resources/js/enviroment.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.enviroment = void 0;
exports.enviroment = {
  excludedTags: 'path,path1,noscript,script,style,svg,symbol,img,input,button,select,option,path,hr,a,link,h1,h2,h3,h4,h5,h6'
};

/***/ }),

/***/ "./resources/js/index.ts":
/*!*******************************!*\
  !*** ./resources/js/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var page_rules_http_connector_1 = __webpack_require__(/*! ./connectors/page-rules-http-connector */ "./resources/js/connectors/page-rules-http-connector.ts");

var keyphrase_link_builder_1 = __webpack_require__(/*! ./modifiers/keyphrase-link-builder */ "./resources/js/modifiers/keyphrase-link-builder.ts");

var node_filter_1 = __importDefault(__webpack_require__(/*! ./modifiers/node-filter */ "./resources/js/modifiers/node-filter.ts"));

var node_selector_1 = __webpack_require__(/*! ./modifiers/node-selector */ "./resources/js/modifiers/node-selector.ts");

var run = function run() {
  return __awaiter(void 0, void 0, void 0, function () {
    var projectId, apiHostname, connector, pageRules, nodeSelector;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!document.currentScript) {
            return [2
            /*return*/
            ];
          }

          projectId = document.currentScript.getAttribute('data-project');
          apiHostname = document.currentScript.getAttribute('data-api-hostname');

          if (!projectId || !apiHostname) {
            return [2
            /*return*/
            ];
          }

          connector = new page_rules_http_connector_1.PageRulesHttpConnector(apiHostname);
          return [4
          /*yield*/
          , connector.fetchRule(window.location.toString(), String(projectId))];

        case 1:
          pageRules = _a.sent();
          nodeSelector = new node_selector_1.NodeSelector();
          pageRules.keyphrases.forEach(function (keyphrase) {
            var nodeFilter = new node_filter_1["default"](keyphrase);
            var matchedPhrase = nodeFilter.getFilteredNodes(nodeSelector.selectNodes());
            var keyphraseLinkBuilder = new keyphrase_link_builder_1.KeyphraseLinkBuilder(matchedPhrase, pageRules.id);
            keyphraseLinkBuilder.buildLinks();
          });
          return [2
          /*return*/
          ];
      }
    });
  });
};

(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , run()];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
})();

/***/ }),

/***/ "./resources/js/modifiers/get-all-html-nodes.ts":
/*!******************************************************!*\
  !*** ./resources/js/modifiers/get-all-html-nodes.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var enviroment_1 = __webpack_require__(/*! ../enviroment */ "./resources/js/enviroment.ts");

var getAllHtmlNodes = function getAllHtmlNodes(cssClass) {
  if (cssClass) {
    var selectedNodes = document.body.querySelectorAll("." + cssClass);
    return selectedNodes.item(0).querySelectorAll("*:not(" + enviroment_1.enviroment.excludedTags + ")");
  }

  return document.body.querySelectorAll("*:not(" + enviroment_1.enviroment.excludedTags + ")");
};

exports.default = getAllHtmlNodes;

/***/ }),

/***/ "./resources/js/modifiers/keyphrase-link-builder.ts":
/*!**********************************************************!*\
  !*** ./resources/js/modifiers/keyphrase-link-builder.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KeyphraseLinkBuilder = void 0;

var KeyphraseLinkBuilder = function () {
  function KeyphraseLinkBuilder(matchedPhrase, pageRuleId) {
    this.matchedPhrase = matchedPhrase;
    this.pageRuleId = pageRuleId;
  }

  KeyphraseLinkBuilder.prototype.buildLinks = function () {
    if (!this.matchedPhrase || this.matchedPhrase.keyphraseNodes.length === 0) {
      return [];
    }

    return this.linkPhrasesInFoundNodes();
  };

  KeyphraseLinkBuilder.prototype.linkPhrasesInFoundNodes = function () {
    var totalMatched = this.matchedPhrase.keyphraseNodes.length;

    if (totalMatched < Number(this.matchedPhrase.phrase.numberOfOccurrence)) {
      return this.linkTop(this.matchedPhrase.keyphraseNodes);
    }

    if ((totalMatched + 1) / 2 >= Number(this.matchedPhrase.phrase.numberOfOccurrence)) {
      return this.linkSpreading(this.matchedPhrase.keyphraseNodes);
    }

    if ((totalMatched + 1) / 2 < Number(this.matchedPhrase.phrase.numberOfOccurrence)) {
      return this.linkTop(this.matchedPhrase.keyphraseNodes);
    }

    return this.linkAll(this.matchedPhrase.keyphraseNodes);
  };

  KeyphraseLinkBuilder.prototype.linkTop = function (foundNodes) {
    var _this = this;

    var newInnerHTMLList = [];
    var matchedCounts = 0;
    foundNodes.forEach(function (node) {
      if (node.hasChildNodes() && matchedCounts < Number(_this.matchedPhrase.phrase.numberOfOccurrence)) {
        // const parentNode = node.parentElement;
        // parentNode.replaceChild(this.getSponsoredChild(), node);
        console.log('linkTop node.innerHTML==>', node.innerHTML);
        node.replaceChild(_this.getSponsoredChild(), node.childNodes.item(0));
        newInnerHTMLList.push(node.innerHTML);
        matchedCounts++; // node.replaceChild(this.getSponsoredChild, node.firstChild())
        // newInnerHTMLList.push((node as Element).innerHTML);
        // matchedCounts++;
      }
    });
    return newInnerHTMLList;
  };

  KeyphraseLinkBuilder.prototype.linkSpreading = function (foundNodes) {
    var _this = this;

    var newInnerHTMLList = [];
    var matchedCounts = 0;
    foundNodes.forEach(function (node, index) {
      // pair indexes
      if (!(index % 2) && matchedCounts < Number(_this.matchedPhrase.phrase.numberOfOccurrence) && node.hasChildNodes()) {
        // const parentNode = node;
        // parentNode.replaceChild(this.getSponsoredChild(), node);
        console.log('linkSpreading node.innerHTML==>', node.innerHTML);
        node.replaceChild(_this.getSponsoredChild(), node.childNodes.item(0));
        newInnerHTMLList.push(node.innerHTML);
        matchedCounts++;
      }
    });

    if (matchedCounts < Number(this.matchedPhrase.phrase.numberOfOccurrence)) {
      foundNodes.forEach(function (node, index) {
        // odd indexes
        if (index % 2 && matchedCounts < Number(_this.matchedPhrase.phrase.numberOfOccurrence) && node.hasChildNodes()) {
          console.log('linking odd indexes'); // const parentNode = node;
          // parentNode.replaceChild(this.getSponsoredChild(), node);

          console.log('linkSpreading node.innerHTML==>', node.innerHTML);
          node.replaceChild(_this.getSponsoredChild(), node.childNodes.item(0));
          newInnerHTMLList.push(node.innerHTML);
          matchedCounts++;
        }
      });
    }

    return newInnerHTMLList;
  };

  KeyphraseLinkBuilder.prototype.linkAll = function (foundNodes) {
    var _this = this;

    var newInnerHTMLList = [];
    foundNodes.forEach(function (node) {
      if (node.hasChildNodes()) {
        // const parentNode = node.c;
        // parentNode.replaceChild(this.getSponsoredChild(), node);
        console.log('linkAll node.innerHTML==>', node.innerHTML);
        node.replaceChild(_this.getSponsoredChild(), node.childNodes.item(0));
        newInnerHTMLList.push(node.innerHTML);
      }
    });
    return newInnerHTMLList;
  };

  KeyphraseLinkBuilder.prototype.getSponsoredChild = function () {
    var sponsoredChildAnchor = document.createElement('a');
    sponsoredChildAnchor.setAttribute('rel', 'sponsored');
    sponsoredChildAnchor.setAttribute('rev', "wd-" + this.pageRuleId);
    sponsoredChildAnchor.setAttribute('href', this.matchedPhrase.phrase.url);
    sponsoredChildAnchor.insertAdjacentHTML('beforeend', this.matchedPhrase.phrase.name);
    return sponsoredChildAnchor;
  };

  return KeyphraseLinkBuilder;
}();

exports.KeyphraseLinkBuilder = KeyphraseLinkBuilder;

/***/ }),

/***/ "./resources/js/modifiers/node-filter.ts":
/*!***********************************************!*\
  !*** ./resources/js/modifiers/node-filter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var enviroment_1 = __webpack_require__(/*! ../enviroment */ "./resources/js/enviroment.ts");

var NodeFilter = function () {
  function NodeFilter(keyPhrase) {
    this.keyPhrase = keyPhrase;
    this.excludedTags = enviroment_1.enviroment.excludedTags.toUpperCase().split(',');
    keyPhrase.name = this.escapeRegExp(keyPhrase.name);
    this.regExp = new RegExp("\\b" + keyPhrase.name + "\\b", 'gm');
    this.nodesWithKeyphrase = [];
    this.matchedPhrase = {
      phrase: keyPhrase,
      keyphraseNodes: []
    };
  }

  NodeFilter.prototype.getFilteredNodes = function (nodes) {
    nodes.forEach(this.scanForChildTextNodes.bind(this));

    for (var index = 0; index < this.nodesWithKeyphrase.length; index++) {
      this.replaceAndTagKeyphraseInHtmlOf(this.nodesWithKeyphrase[index]);
    }

    var matchedNodes = document.body.querySelectorAll("[data-digidip-found=\"dgd" + this.keyPhrase.name.replace(/\s+/g, '') + "dgd\"]"); // this.matchedPhrase.keyphraseNodes = this.cleanNodesWithexcludedTags(matchedNodes) as [];

    this.matchedPhrase.keyphraseNodes = matchedNodes;
    return this.matchedPhrase;
  }; // private cleanNodesWithexcludedTags(matchedNodes: Element[]): Element[] {
  //     const cleanNodes = [];
  //     for (let index = 0; index < matchedNodes.length; index++) {
  //         console.log('matchedNodes[index].tagName  15:32==>', matchedNodes[index].tagName)
  //         if (!this.excludedTags.includes(matchedNodes[index].tagName as string)) {
  //             cleanNodes.push(matchedNodes[index]);
  //         }
  //     }
  //     return cleanNodes;
  // }


  NodeFilter.prototype.scanForChildTextNodes = function (node) {
    if (this.excludedTags.includes(node.nodeName)) {
      return;
    }

    if (node.hasChildNodes() && node.nodeType !== 3) {
      node.childNodes.forEach(this.scanForChildTextNodes.bind(this));
    } else {
      this.processNode(node);
    }
  };

  NodeFilter.prototype.processNode = function (childNode) {
    if (this.excludedTags.includes(childNode.nodeName)) {
      return;
    }

    if (childNode.parentElement && childNode.parentElement.children.length > 0) {
      for (var index = 0; index < childNode.parentElement.children.length; index++) {
        if (childNode.parentElement.children.item(index)) {
          this.processChildElement(childNode.parentElement.children.item(index));
        }
      }
    }

    if (childNode.parentElement && childNode.parentElement.children.length === 0) {
      this.processChildElement(childNode);
    }

    return;
  };

  NodeFilter.prototype.processChildElement = function (nodeElement) {
    if (this.excludedTags.includes(nodeElement.tagName)) {
      // console.log('nodeElement.tagName 15:42===>', nodeElement.tagName);
      // console.log('nodeElement.innerHTML===>', nodeElement.innerHTML);
      return;
    } // console.log('####processChildElement asdfadfasdfasdf 15:32####');
    // if ((nodeElement.attributes
    //     && nodeElement.getAttribute(`data-dgd${this.keyPhrase.name.replace(/\s+/g, '')}`) === 'visited')
    //     || nodeElement.parentElement?.getAttribute(`data-dgd${this.keyPhrase.name.replace(/\s+/g, '')}`) === 'visited') {
    //     return;
    // }


    if (nodeElement.attributes && nodeElement.getAttribute("data-dgd" + this.keyPhrase.name.replace(/\s+/g, '')) === 'visited') {
      return;
    }

    this.ifMatchKeyphraseStoreElement(nodeElement);
  };

  NodeFilter.prototype.ifMatchKeyphraseStoreElement = function (nodeElement) {
    var _a; // console.log('####ifMatchKeyphraseStoreElement asdfadfasdfasdf 13:18####');


    if (nodeElement.innerHTML) {
      if (nodeElement.attributes) {
        nodeElement.setAttribute("data-dgd" + this.keyPhrase.name.replace(/\s+/g, ''), 'visited');
      } // if (nodeElement.parentElement && nodeElement.parentElement.attributes) {
      //     nodeElement.parentElement.setAttribute(`data-dgd${this.keyPhrase.name.replace(/\s+/g, '')}`, 'visited');
      // }
      // } else {
      //     nodeElement.parentElement.setAttribute(`data-dgd${this.keyPhrase.name.replace(/\s+/g, '')}`, 'visited');
      // }


      var matches = (_a = nodeElement.textContent) === null || _a === void 0 ? void 0 : _a.match(this.regExp);

      if (matches) {
        this.nodesWithKeyphrase.push(nodeElement);
      }
    }
  };

  NodeFilter.prototype.replaceAndTagKeyphraseInHtmlOf = function (node) {
    var foundTag = "<span data-digidip-found=\"dgd" + this.keyPhrase.name.replace(/\s+/g, '') + "dgd\">" + this.keyPhrase.name + "</span>"; // if (node.parentElement && node.parentElement.innerHTML) {
    //     const newInnerHTML = node.parentElement.innerHTML.replace(this.regExp, foundTag);
    //     node.parentElement.innerHTML = newInnerHTML;
    // }
    //check for childrens here or before again

    console.log('node.tagName==>', node.tagName);
    console.log('node.children.length ===>', node.children.length);
    console.log('node.childNodes.length ===>', node.childNodes.length); // console.log('node.firstChild?.childNodes.length ===>', node.firstChild?.childNodes.length);
    // if (node.firstChild && node.firstChild.childNodes.length > 2) {
    //     return;
    // }
    // if (node.innerHTML && node.childNodes.length < 2) {

    if (node.innerHTML) {
      // console.log('node.innerHTML 20:09 ====>', node.innerHTML);
      // const newInnerHTML = node.innerHTML;
      // newInnerHTML.replace(this.regExp, foundTag);
      // node.innerHTML = newInnerHTML;
      // console.log('newInnerHTML 20:14 ====>', newInnerHTML);
      // console.log('TEST ===>', /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(newInnerHTML))
      // const newInnerHTML = node.innerHTML.replace(this.regExp, foundTag);
      // node.innerHTML = newInnerHTML;
      node.innerHTML.replace(this.regExp, foundTag);
    }
  };

  NodeFilter.prototype.escapeRegExp = function (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  return NodeFilter;
}();

exports.default = NodeFilter;

/***/ }),

/***/ "./resources/js/modifiers/node-selector.ts":
/*!*************************************************!*\
  !*** ./resources/js/modifiers/node-selector.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NodeSelector = void 0;

var get_all_html_nodes_1 = __importDefault(__webpack_require__(/*! ./get-all-html-nodes */ "./resources/js/modifiers/get-all-html-nodes.ts"));

var NodeSelector = function () {
  function NodeSelector(selectedHtmlNodes) {
    this.selectedHtmlNodes = selectedHtmlNodes;
  }

  NodeSelector.prototype.selectNodes = function (cssClass) {
    if (!this.selectedHtmlNodes) {
      this.selectedHtmlNodes = get_all_html_nodes_1["default"](cssClass);
    }

    return this.selectedHtmlNodes;
  };

  return NodeSelector;
}();

exports.NodeSelector = NodeSelector;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/index.ts");
/******/ 	
/******/ })()
;
