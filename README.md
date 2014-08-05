
====================

Conect Microsite

====================

Exertis Micro-P Quickstart Project for Microsites | multipage ajax microsite configured for Conect

##Prerequisite
Webserver with domain & webroot folder (default document index.html)

##Getting Started

1) Clone this Quickstart repo into the webroot setup above

2) Every project must to contain initProject() in its index.html file which becomes the equivient of $(document).ready();

3) Configure the project index file (/PROJECT-NAME/index.html)

- Set var projectName = [your agreed PROJECT-NAME]
- Set inSandbox = true
- Use head.load() to include any global JS and CSS

NB:
home.html is ajaxed into the page by default.  
- All ajaxed pages need to contain initPage() which again is called after the content has been received.
- Inside initPage use head.load() to include any JS and CSS required for this page

4) The sandbox expects a querystring parameter to be passed to know where to load the project from
- http://YOUR-DOMAIN?project=myproject

NB
- You can also pass p=PAGE-NAME to change the default landing page to one of the sub pages

==============================