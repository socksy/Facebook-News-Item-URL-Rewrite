// 
// ==UserScript==
// @name Facebook News Items URL Rewriter
// @description Rewrites news item URLs so they don't force you to sign up to an app just to read the damn article
// @version 0.1
// @include http://*.facebook.com/*
// @include http://facebook.com/*
// @include https://*.facebook.com/*
// @include https://facebook.com/*
// @include http://*.facebook.tld/*
// @include http://facebook.tld/*
// @include https://*.facebook.tld/*
// @include https://facebook.tld/*
// ==/UserScript==

var appname_reg = /data-appname="[^"]+"/g;
var tracking_shit = /onmousedown="[^>]+/;
var guardian_fbcrap = /(fb_source=[^"]+)/;
var yahoo_app_real_uri = /redirect_url=(.+)%3Ffb_source/;
// Haven't worked out washington post's scheme yet

var newsitems = document.getElementsByClassName('newsReadsNormalItemContent');

for (i=0; i<newsitems.length; i++) {
	newsitems[i].innerHTML = newsitems[i].innerHTML.replace(tracking_shit, "");
	if (/The Guardian/.test(newsitems[i].innerHTML)) {
		newsitems[i].innerHTML = newsitems[i].innerHTML.replace(guardian_fbcrap, "");
		
	} else if (/Yahoo!/.test(newsitems[i].innerHTML)) {
		url = newsitems[i].innerHTML.match(yahoo_app_real_uri);
		newsitems[i].innerHTML = newsitems[i].innerHTML.replace(/href="(?:[^"]+)/, "href=\""+decodeURI(url));
	} else {
		//Need to include more rewrite rules.
	}
	newsitems[i].innerHTML = newsitems[i].innerHTML.replace(appname_reg, "");
}
