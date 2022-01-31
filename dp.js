/**
 * Digidip - Custom JavaScript
 */
var Digidip = 1;
(function (document, window) {

    /**
     * Main
     */
    var DigiDip = {

        // following settings are subject to be changed by server-side JS handler
        url_visit: "https://stylebudget.digidipclick.local/visit?url=",                                       // base of the redirect url
        url_worddip_words: "//stylebudget.digidipclick.local/words", 							    // where words are sent
        use_worddip: "1",								    // is worddip active? (string; "1" or "0")
        new_tab: "1",								            // is new_tab active? (string; "1" or "0")
        encoded_xhr_credentials: "bW9iaXBhbnRzOm1vYmlwYW50cw==",         // for basic-auth environments only
        hosts_ignore: "facebook.com|youtube.com|baidu.com|wikipedia.org|twitter.com|qq.com|linkedin.com|taobao.com|live.com|hao123.com|sina.com.cn|blogspot.com|weibo.com|yandex.ru|sohu.com|vk.com|pinterest.com|wordpress.com|360.cn|instagram.com|paypal.com|msn.com|soso.com|ask.com|tumblr.com|xvideos.com|mail.ru|163.com|imdb.com|stackoverflow.com|imgur.com|reddit.com|blogger.com|cnn.com|lemonde.fr|lefigaro.fr|tukif.com|allocine.fr|parisexe.com|t.co|lequipe.fr|pagesjaunes.fr|dailymotion.com|store.steampowered.com|googleadservices.com|doubleclick.net|youtu.be|rstyle.me|mondemul.net|cdn.m6web.fr|jheberg.net|userscloud.com".split('|'),					    // target-hosts that have to be ignored completely
        element_clickhandler: "",            // If given, the clickhandler only has to be active within the HTML element (depends on element_clickhandler_attribute)
        element_clickhandler_attribute: "",     // the html-attribute that defines limitation to site area (included areas)
        element_ignore_attribute: "rel",                 // the html-attribute that defines that a link should be ignored
        element_ignore_pattern: "pass",                       // the value of the html-attribute defined above
        element_ignore_consider_parents: "0",   // if or if not parent elements shall be considered (string; "1" or "0")
        widgets: JSON.parse('{}'),
        project: '990',
        worddip_cdn_url: 'https://cdn.jsdelivr.net/gh/es7eban/testwdjs@83c3898c74c3907e4faf3f2539ebb1bcf68d0791/wd-js.js',
        worddip_api_hostname: 'wds.digidip.net',

        // further settings, will not be changed by JS handler
        logging_param: "digidiplog=true",                                   // param/value that activates console output
        replacing_elements_exclude: ['H1', 'H2', 'H3', 'A', 'TEXTAREA', 'CODE', 'PRE', 'IFRAME', 'SCRIPT', 'STYLE', 'TITLE'],

        // properties & converting of settings
        logging: false,
        ctx_attr_name: 'digidipctx',
        ctx_attr_value: new Date().getTime(),
        w3cEvents: (!window.attachEvent),
        rootNodes: [document],

        /**
         * Init DigiDip
         */
        initCore: function () {

            // Logging allowed?
            DigiDip.logging = DigiDip.isLoggingActivated();

            // Log start of loading process
            if (DigiDip.logging) {
                DigiDip.log('loading');
            }

            // Do we have to limit out scope?
            if (DigiDip.element_clickhandler != "" && DigiDip.element_clickhandler_attribute != "") {
                var tmpRootNodes = false;
                var scope = '';
                switch (DigiDip.element_clickhandler_attribute) {
                    case 'id':
                        scope = "#";
                        tmpRootNodes = [document.getElementById(DigiDip.element_clickhandler)];
                        break;
                    case 'class':
                        scope = ".";
                        tmpRootNodes = document.getElementsByClassName(DigiDip.element_clickhandler);

                        //to array
                        tmpRootNodes = Object.keys(tmpRootNodes).map(function (key) {
                            return tmpRootNodes[key]
                        });

                        if (DigiDip.logging) {
                            DigiDip.log('Start removing children nodes');
                        }

                        //remove children
                        tmpRootNodes = tmpRootNodes.filter(function (item) {

                            for (i in tmpRootNodes) {
                                if (tmpRootNodes[i].contains(item) && tmpRootNodes[i] != item) {
                                    return false;
                                }
                            }

                            return true;
                        });
                        if (DigiDip.logging) {
                            DigiDip.log('Finished removing children nodes');
                        }
                        break;
                    default:

                        if (DigiDip.logging) {
                            DigiDip.log('No attribute ' + DigiDip.element_clickhandler_attribute + ' with value ' + DigiDip.element_clickhandler);

                        }
                }


                if (tmpRootNodes) {
                    DigiDip.rootNodes = tmpRootNodes;
                    if (DigiDip.logging) {
                        DigiDip.log('scope is ' + scope + '[' + DigiDip.element_clickhandler + '] ,' + DigiDip.rootNodes.length + ' root Nodes');
                    }
                } else {
                    if (DigiDip.logging) {
                        DigiDip.log('scope element ' + scope + '[' + DigiDip.element_clickhandler + '] not found!');
                    }
                }
            }

            // Attach global click event
            var i;

            if (DigiDip.w3cEvents) {
                // w3c
                //check
                for (i = 0; i < DigiDip.rootNodes.length; i++) {
                    DigiDip.rootNodes[i].addEventListener('click', DigiDip.clickHandler, false);
                    DigiDip.rootNodes[i].addEventListener('contextmenu', DigiDip.clickHandler, false);
                }
            } else {
                // ie
                for (i = 0; i < DigiDip.rootNodes.length; i++) {
                    DigiDip.rootNodes[i].attachEvent('onclick', DigiDip.clickHandler);
                    DigiDip.rootNodes[i].attachEvent('oncontextmenu', DigiDip.clickHandler);
                }
            }
        },

        /**
         * Returns TRUE if a pass-condition is found in the given node
         * @param node
         * @return boolean
         */
        hasPassCondition: function (node) {

            var attributeValue;

            if (node.hasAttribute(DigiDip.element_ignore_attribute)) {
                attributeValue = node.getAttribute(DigiDip.element_ignore_attribute);
                if (attributeValue.search(DigiDip.element_ignore_pattern) !== -1) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Click Handler.
         * @param e Event
         */
        clickHandler: function (e) {
            var
                elem = DigiDip.w3cEvents ? e.target : window.event.srcElement,
                trimmedDomain = document.domain.replace(/(www\.)?(.*)/, '$2'),
                targetHost,
                targetTest = undefined,
                parentSearch,
                href;

            // check if the element or a parent element of it is a link
            while (elem && elem.nodeName !== 'A') {
                elem = elem.parentNode;
            }

            // if we could not found a valid link element, there's nothing to do.
            if (!elem) {
                return;
            }

            //avoid firefox to trigger the event twice
            if ((e.type != "contextmenu") && (e.button == 2)) {
                if (DigiDip.logging) {
                    DigiDip.log('Abort');
                }
                return;
            }

            // now we have to check if we found a "pass-condition": a situation that forbids
            // us to process the click. there are two possibilities:

            // 1. defined ignore_attribute and ignore_pattern that match
            if ((DigiDip.element_ignore_attribute != "") && (DigiDip.element_ignore_pattern != "")) {

                if (DigiDip.element_ignore_consider_parents == "1") {

                    // not only check the node we've found, but also it's parent
                    parentSearch = elem;

                    //check all parents till rootnodes or document node
                    while (parentSearch && DigiDip.rootNodes.filter(function (subitem) {
                        return subitem == parentSearch
                    }).length == 0 && parentSearch != document) {
                        if (DigiDip.hasPassCondition(parentSearch)) {
                            if (DigiDip.logging) {
                                DigiDip.log("ignoring element [" + elem.href + "]");
                            }
                            return;
                        }
                        parentSearch = parentSearch.parentNode;
                    }

                } else {

                    // check only the node itself
                    if (DigiDip.hasPassCondition(elem)) {
                        if (DigiDip.logging) {
                            DigiDip.log("ignoring element [" + elem.href + "]");
                        }
                        return;
                    }

                }
            }

            // 2. click outside a defined element_clickhandler
            if (DigiDip.element_clickhandler != "") {

                // Note: Normally, this should not be necessary, because during the init phase, we only
                // subscribe to the events of the defined element_clickhandler, but we had cases where the
                // respective element was not available at this time. So following code is only for the 1% where
                // it doesn't work. :-(
                var elmTmpRootNode = document.getElementById(DigiDip.element_clickhandler);
                if (elmTmpRootNode && (!elmTmpRootNode.contains(elem))) {
                    if (DigiDip.logging) {
                        DigiDip.log("ignoring element [" + elem.href + "] cause no child of [#" + DigiDip.element_clickhandler + "]");
                    }
                    return;
                }

            }

            // nothing to do if we have previously marked the link as "already shifted"
            if ((elem.hasAttribute(DigiDip.ctx_attr_name)) && (elem.getAttribute(DigiDip.ctx_attr_name) == DigiDip.ctx_attr_value)) {
                return;
            }

            // nothing to do in case it's an internal link (pointing to the same domain).
            // note that we're intentionally ignoring "www" subdomain here.
            href = elem.href;
            if (!(href && /^https?:\/\/(www\.)?([^\/:]*)(:\d+)?(\/.*)?$/.test(href) && RegExp.$2 !== trimmedDomain)) {
                return;
            }

            // also nothing to do if the target host is on the blacklist
            targetHost = RegExp.$2;
            if (DigiDip.hosts_ignore.length > 0) {
                targetTest = new RegExp("(" + DigiDip.hosts_ignore.join('|').replace(/[\.]/g, "\\$&") + ")$", "i");
                if (targetTest.test(targetHost)) {
                    return;
                }
            }

            // we're dealing with an external link, that is not on the blacklist.
            // save the old values (needed for unshifting) and build new link
            var
                oldValHref = elem.href,
                oldValTarget = elem.target;

            var newLink =
                DigiDip.url_visit +
                encodeURIComponent(elem.href) +
                (elem.rev ? ("&ref=" + encodeURIComponent(elem.rev)) : '') +
                (elem.getAttribute('data-ddid') ? ("&wd_id=" + encodeURIComponent(elem.getAttribute('data-ddid'))) : '') +
                (document.referrer ? ("&ppref=" + encodeURIComponent(document.referrer)) : '') +
                (window.location.href ? ("&currurl=" + encodeURIComponent(window.location.href)) : '');

            if (DigiDip.logging) {
                DigiDip.log('shifting [' + elem.href + '] to [' + newLink + ']');
            }

            // assign new values to link element
            elem.href = newLink;
            if (DigiDip.new_tab == "1") {
                elem.target = "_blank";
            }

            // if the link has been "activated" via contextmenu, we have to keep the shifting in mind
            if (e.type == "contextmenu") {
                elem.setAttribute(DigiDip.ctx_attr_name, DigiDip.ctx_attr_value);
            }

            // set timeout for unshifting the link
            window.setTimeout(function () {
                if (DigiDip.logging) {
                    DigiDip.log('unshifting [' + elem.href + '] to [' + oldValHref + ']');
                }
                elem.href = oldValHref;
                if (oldValTarget === "") {
                    elem.removeAttribute('target');
                } else {
                    elem.target = oldValTarget;
                }

                if (elem.hasAttribute(DigiDip.ctx_attr_name)) {
                    elem.removeAttribute(DigiDip.ctx_attr_name);
                }

            }, ((e.type == "contextmenu") ? 15000 : 500));

        },

        /**
         * Logs message
         * @param msg string
         */
        log: function (msg) {
            var ph = (typeof msg === 'object') ? '%o' : '%s';
            console.log('[' + new Date().getTime() + '] (Digidip) ' + ph, msg);
        },

        /**
         * Checks if logging is activated.
         * If, the code is allowed to generate console log messages.
         * @return boolean
         */
        isLoggingActivated: function () {

            var
                prmstr = window.location.search.substr(1),
                prmarr = prmstr.split("&"),
                i;

            for (i = 0; i < prmarr.length; i++) {
                if (prmarr[i] == DigiDip.logging_param) {
                    return true;
                }
            }

            return false;

        },

        loadWidgetScript(script) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widgets.digidip.it/widget/digidip/'+ script +'.js';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        },

        loadWorddipScript: function () {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = DigiDip.worddip_cdn_url;
            s.setAttribute('data-project', DigiDip.project);
            s.setAttribute('data-api-hostname', DigiDip.worddip_api_hostname);
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }

    };

    DigiDip.initCore();

    if (DigiDip.widgets.enabled) {
        if (DigiDip.logging) {
            DigiDip.log(`initializing m-widgets with: ${JSON.stringify(DigiDip.widgets)}`);
        }
        var script = DigiDip.widgets.script || DigiDip.project_subdomain;
        DigiDip.loadWidgetScript(script);
    } else {
        if (DigiDip.logging) {
            DigiDip.log('widget feature is inactive');
        }
    }
    if (DigiDip.use_worddip === '1') {
        console.log(`##initializing worddip for locally project: ${DigiDip.project}`);
        if (DigiDip.logging) {
            DigiDip.log(`##initializing worddip for locally project: ${DigiDip.project}`);
        }
        DigiDip.loadWorddipScript();
    } else {
        if (DigiDip.logging) {
            DigiDip.log('worddip feature is inactive');
        }
    }

    if (DigiDip.logging && typeof __tcfapi === "function") {
        __tcfapi('addEventListener', 2, (tcData, success) => {
            if(success) {
                DigiDip.log(tcData);
            } else {
                DigiDip.log('TCF loading failed.');
            }
        });
    }
})(document, window);
