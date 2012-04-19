// ==UserScript==
// @name		Remove annoying FaceBook application redirect_uri
// @description	News and video apps ask you to register with their application before viewing the content. Well, no more application tyranny I say!
// @match 		http://*.facebook.com/*
// @match 		https://*.facebook.com/*
// ==/UserScript

function replace_uris()
{
	// replace normal news items
	containers = document.getElementsByClassName('external uiAttachmentMedia');
	for(var i=0; i<containers.length; i++)
	{
		c = containers[i];
		r = c.href.match(/redirect_uri=(.+)%3F/);
		if(r)
		{
			url = decodeURIComponent(r[1]);
			c.href = url;
			c.nextSibling.childNodes[0].childNodes[0].childNodes[0].href = url;
			c.parentElement.parentElement.previousSibling.childNodes[2].href= url;
		}
	}

	// replace links on popup hovercard thingies
	containers = document.getElementsByClassName('HovercardStage');
	for(var i=0; i<containers.length; i++)
	{
		c = containers[i];
		href = c.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].href;
		r = href.match(/redirect_uri=(.+)%3F/);

		if(r)
			c.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].href = decodeURIComponent(r[1]);
	}
}

// listen to changes in the DOM
document.addEventListener('DOMSubtreeModified', replace_uris, false);

replace_uris();