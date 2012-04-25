// ==UserScript==
// @name		Remove annoying FaceBook application redirect_uri
// @description	News and video apps ask you to register with their application before viewing the content. Well, no more application tyranny I say!
// @match 		http://*.facebook.com/*
// @match 		https://*.facebook.com/*
// ==/UserScript

function replace_uris()
{
	links = document.querySelectorAll('a[href*="news.read"]');

	for(var i=0; i<links.length; i++)
	{
		r = links[i].href.match(/redirect_uri=(.+)%3F/);
		if (r)
		{
			links[i].href = cleanURL(r[1]);
		} else {
			links[i].href = cleanURL(links[i].href);
		}
	}
}

function cleanURL(url)
{
	url = decodeURIComponent(url);
	
	console.log(url);
	console.log(url.indexOf('?'));

	if(url.indexOf('?') > -1)
		url = url.substring(0, url.indexOf('?'));

	return url;
}

// listen to changes in the DOM
document.addEventListener('DOMSubtreeModified', replace_uris, false);

replace_uris();