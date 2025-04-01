Based on [HappyPath](https://github.com/gcLabs/HappyPath)
I've created this fork as Google has begun removing Manifest V2 extensions from Google.
This fork updates HappyPath to be compilant in Manifest V3.

Thank you [gcLabs](https://github.com/gcLabs) for creating the original extension. This has saved me and my company countless hours.

HappierPath
... because everything is relative.

You know what a bookmark manager does, right? HappierPath does the same thing for paths.

Instead of bookmarking www.google.com or www.bbcnews.com, HappierPath lets you bookmark only the path, e.g. /cms/login.html or /api/introspect. This is mostly so that enterprise CMS users and other lazy webadmins can gain access to the same tools across multiple websites, without having to type in the paths repeatedly. My company has about 300 websites, all with the same paths to the same admin tools - so this saves me a lot of time. Maybe it will save you some too.

## Build
* Install NodeJS 23.10.0
* Run `npm install`
* Depending on your browser run one of the following commands
  * Chrome `npm run build-prod-chrome`
  * FireFox `npm run build-prod-firefox`
* Load the /dist folder into your browser. Instructions are dependent on browser, look up documentation for your browser

## Testing
* Open the popup page
* Click 'Open Path Editor'
* Enter a path config such as

```
Google Links>0
Search>/search?q=test
Configure>/search/howsearchworks
```

* Click Write Path List
* The path list will update. It should contain 1 heading, and 2 relative links
* Navigate to `https://google.com`
* Clicking either link will take you to the appropriate page without changing the FQDN
* Navigate to `https://google.com.au`
* Clicking the same links will take you to the same routes without changing the FQDN
* This works because google.com and google.com.au share the same route structure. A traditional bookmark will also store the FQDN, which isn't useful when you have many websites that share the same route structure

## Change Log
CHANGES IN VERSION 4.3.0

Extension Options menu

Change Requests:

* Option to sync config paths to your browser account.
  * FireFox sync depends on what is configured in FireFox settings. Default sync should be 5 minutes

Bug Fixes:
* Go button overflowing to new line on FireFox

CHANGES IN VERSION 4.2.0

Added support for FireFox

CHANGES IN VERSION 4.1.0

Added Context menu for quick navigation

CHANGES IN VERSION 4.0.0

Migrated code to React/Typescript

CHANGES IN VERSION 3.0:

Bug fixes

Updated for Chrome extension compliance

CHANGES IN VERSION 2.2:

RegEx transformations: You can now add a RegEx transformation in this format:
`{Label}>{RegEx URL match}<<<{Link to generate (with option attributes in this format: $n)}`

For example:
`Edit this page>(\/pages\/?id=)([0-9]{1,9}).*<<</editpage/?id=$2`

If HappierPath finds a RegEx match on the current URL, it will create a link using the transformation path.

## To do (in no particular order):
 - Save domains as well as paths
 - Port field (if enough people think it might be useful)
 - Customise query string variables
 - Keep query string when switching paths
 - Better path management: improved UI, grouping, moving
