// 
// ==UserScript==
// @name Facebook NewsItem URL Rewriter
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

var tracking_shit = /onmousedown="[^>]+/;
var guardian_fbcrap = /(fb_source=[^"]+)/;
var yahoo_app_real_uri = /redirect_url=(.+)%3Ffb_source/;
// Haven't worked out washington post's scheme yet

var newsitems = document.getElementsByClassName('newsReadsNormalItemContent');

for (item in newsitems) {
	item.innerHTML = item.innerHTML.replace(tracking_shit, "");
	if (/The Guardian/.test(item.innerHTML) {
		item.innerHTML = item.innerHTML.replace(guardian_fbcrap, "");
		
	} else if (/Yahoo!/.test(item.innerHTML) {
		url = item.innerHTML.match(yahoo_app_real_uri);
		item.innerHTML = item.innerHTML.replace(/href="(?:[^"]+)/, "href=\""+url);
	} else {
		//Need to include more rewrite rules.
	}
}
