// ==UserScript==
// @name		Remove annoying FaceBook application redirect_uri
// @description	News and video apps ask you to register with their application before viewing the content. Well, no more application tyranny I say!
// @match 		http://*.facebook.com/*
// @match 		https://*.facebook.com/*
// ==/UserScript

console.log('Replacing URIs');
containers = document.getElementsByClassName('external uiAttachmentMedia')
for(var i=0; i<containers.length; i++)
{
	c = containers[i];
	r = c.href.match(/redirect_uri=(.+)%3F/);
	if(r)
	{
		url=decodeURIComponent(r[1]);
		console.log('replacing url ' + url);
		c.href = url;
		c.nextSibling.childNodes[0].childNodes[0].childNodes[0].href = url;
		c.parentElement.parentElement.previousSibling.childNodes[2].href= url;
	}
}