
var currentUser = whoami();

//------------------------------------

/* AJAX MICROSITE JS */

//------------------------------------

function initContent() {

	var landingPage = querystring_lookup('p');
	landingPage = ((typeof landingPage !== "undefined" && landingPage !== null) ? landingPage : "home");
	
	ajaxMSPage(setMSPage(landingPage), ajaxWrapper);		// check QS & load content

	// prefix image paths outside ajax area
	$(contentWrapper).find('img').each(function () {
		var thisSRC = checkSRC($(this).attr('src'));
		$(this).attr('src', thisSRC);
	});

	// repair anchor tags outside ajax area
	$(contentWrapper + ' a').each(function () {
		var thisHREF = checkHREF($(this).attr('href'));
		$(this).attr("href", thisHREF);																													// update path
		if ($(this).hasClass('act')) {																													// add click through event
			$(this).on('click', function () {
				createGAEvent(projectName, 'Click-Through', $(this).attr("href"), inSandbox);				// analytics clickthrough event
			});
		}
	});

	// analytics event
	createGAEvent(projectName, "Landing-Page", landingPage, inSandbox);
}

//------------------------------------

// returns the full path to a page, used to provide a path the the ajax load function
// look in querysting first to jump to specific content, defaults to home.html
//
function setMSPage(requestedPage) {

	var targetPage = ((typeof (requestedPage) !== "undefined" && requestedPage !== null) ? requestedPage : "home");
	var contentURL = prefixURL + targetPage + '.html';

	// analytics event
	createGAEvent(projectName, "Load-Page", targetPage, inSandbox);

	return contentURL
}

// loads the content on an html page to the target div
//
function ajaxMSPage(ajaxURL, targetDiv) {
	
	$.ajax({
		global: true,
		cache: false,
		url: ajaxURL,																																								// path to file
		dataType: 'html',
		success: function (data) {
			$('#ms-loading').fadeIn();
			$(targetDiv).html(data);																									// load content area
			
			initPage();																															// call function included in ajaxed content, used to assign plugins, listeners etc.

			// prefix image paths
			$(targetDiv).find('img').each(function() {
				var thisSRC = checkSRC($(this).attr('src'));
				$(this).attr('src', thisSRC);
			});

			// repair anchor tags
			$(targetDiv + ' a').each(function() {
				var thisHREF = checkHREF($(this).attr('href'));
				$(this).attr("href", thisHREF);																													// update path
				if ($(this).hasClass('act')) {																													// add click through event
					$(this).on('click', function(){
						createGAEvent(projectName, 'Click-Through', $(this).attr("href"), inSandbox);				// analytics clickthrough event
					});
				}

			});

			$('#ms-loading').fadeOut();
		}
	});
}

// listener for navigation, if the link has the appropriate data value the ajax load is called
//
$(contentWrapper).on('click', 'a', function (e) {

	if (typeof($(this).data('target-content')) !== 'undefined') {

		ajaxMSPage(setMSPage($(this).data('target-content')), '#ms-content');

		// flag active menu link
		if ($(this).parents('div:first').attr('id') == 'ms-nav') {
			$(contentWrapper + ' #ms-nav a').removeClass('active');
			$(this).addClass('active');
		}
	}
	else if ($(this).attr('href') == "#") {
		e.preventDefault();
	}
});

// analytics event - LoadModal
//
$(contentWrapper).on('click', '.ajax-fancybox', function (event) {
	createGAEvent(projectName, "View-Item", $(this).attr('href'), inSandbox);
});

//------------------------------------

// sticky navigation
//
var nav = $('#ms-nav');
var scrolled = false;
$(window).scroll(function () {
	if (0 < $(window).scrollTop() && !scrolled) {
		nav.addClass('sticky-nav');
		scrolled = true;
	}
	if (108 > $(window).scrollTop() && scrolled) {
		nav.removeClass('sticky-nav');
		scrolled = false;
	}
});

//------------------------------------
//# sourceURL=multipage.js