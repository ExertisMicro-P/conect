
//------------------------------------

// framework utils  -  for "single-page" ajax loaded microsites

//------------------------------------

function prefixImages(targetWrapper)
{
	$(targetWrapper).find('img').each(function () // prefix image paths outside ajax area
	{
		var thisSRC 	= checkSRC($(this).attr('src'));
		$(this).attr('src', thisSRC);
	});
}

function repairAnchorTags(targetWrapper)
{
	$(targetWrapper + ' a').each(function () // repair anchor tags outside ajax area
	{
		var thisHREF;
		if ($(this).hasClass('external-link'))
		{
			thisHREF 	= $(this).attr('href');
		}
		else
		{
			thisHREF 	= checkHREF($(this).attr('href'));
			$(this).attr("href", thisHREF);	 // update path
		}

		if ($(this).hasClass('act'))  // add click through event
		{ 
			$(this).on('click', function ()
			{
				createGAEvent(projectName, 'Click-Through', $(this).attr("href"), inSandbox); // analytics clickthrough event
			});
		}
	});
}

function checkHREF(thisHREF)
{
	var response;

	if (typeof thisHREF === "undefined" )
	{
		response 		= '';
	}
	else
	{
		var aHREF 		= thisHREF;
		var cleanHREF 	= ie7fix(thisHREF,'href');
		var aHASH 		= '';
		var arrHREF;

		if (cleanHREF.indexOf('#') == 0) // link managed via assignment
		{ 
			response 	= aHREF;
		}
		else 
		{
			if (cleanHREF.indexOf('http') >= 0 && cleanHREF.indexOf('exertismicro-p.co.uk') < 0) 
			{
				response = aHREF; // external link - don't alter
			}
			else 
			{
				if (aHREF.indexOf('fnFile=') >= 0) // repair relative file link (deals with iCom interference)
				{ 
					arrHREF 	= aHREF.split('fnFile=');
					aHREF 		= arrHREF[1];
					$(this).attr('href', aHREF);
				}
				var qsDelimiter = "?";
				if (aHREF.indexOf('?') >= 0) { qsDelimiter = "&"; } // detemin appropriate QS delimiter
				if (aHREF.indexOf('#') >= 0) // does the HREF contain a # value?
				{
					arrHREF 	= aHREF.split('#');
					aHREF 		= arrHREF[0];
					aHASH 		= '#' + arrHREF[1];
				}
				response 		= aHREF;
				response 		= (currentUser.mscssid != '') ? response + qsDelimiter + 'mscssid=' + currentUser.mscssid : response; // maintain session & add the session ID,
				response 		= response + aHASH; // append any # value
			}
		}
	}
	return response;
}

function checkSRC(thisSRC)
{
	var imgSRC 		= thisSRC;	
	imgSRC 			= ie7fix(imgSRC,'src');	

	if (inSandbox != true) 
	{ // prefix image paths -  (deals with iCom interference)
		imgSRC 		= replaceAll(imgSRC, '/ImagesPortal/UK/localisation/4/', '');
		imgSRC 		= prefixURL + imgSRC;
	}
	else 
	{ // standard prefix
		imgSRC 		= prefixURL + imgSRC;
	}
	var response 	= imgSRC;
	return response;
}

function ie7fix(addr, domtype)
{
	var cleanAddr 	= addr;
	var cleanHash 	= '';
	var arrAddr;
	
	switch (domtype)
	{
		case 'src':		
			if (cleanAddr.indexOf(document.domain) >= 0)
			{ // fix ie7 bug - remove domain from src value
				cleanAddr = cleanAddr.replace('http://' + document.domain + '/', '');
				cleanAddr = cleanAddr.replace('https://' + document.domain + '/', '');
			}
			break;
		
		case 'href':				
			var url 		= document.URL;
			var arrURL 		= url.split('#');			
			cleanAddr 		= cleanAddr.replace(arrURL[0], '');
			if (cleanAddr == '##') {
				cleanAddr 	= cleanAddr.replace('##', '#');
			}
			break;
	}	
	return cleanAddr;
}

function groupObjects(thisContainer, thisObject, thisWrapper, thisGroupSize) 
{
	// group offer boxes
	var number_of_objects;
	var number_of_rows;
	var startPoint;
	var endPoint;
	var objects_per_row = thisGroupSize;

	number_of_objects = $(thisObject).length;
	number_of_rows = 0;

	// calculate number of rows
	for (i = 0; i < number_of_objects; i = (i + objects_per_row)) 
	{
		number_of_rows++;
	}

	if (number_of_rows > 0) 
	{
		// create section
		for (i = 0; i < (number_of_rows) ; i++) 
		{
			startPoint = i;
			endPoint = startPoint + objects_per_row;

			if (endPoint > number_of_objects) 
			{
				endPoint = number_of_objects;
				$(thisContainer).children().slice(startPoint).wrapAll(thisWrapper);
			} 
			else 
			{
				$(thisContainer).children().slice(startPoint, endPoint).wrapAll(thisWrapper);
			}
		}
	}
}