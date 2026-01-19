Based on [HappyPath](https://github.com/gcLabs/HappyPath)
I've created this fork as Google has begun removing Manifest V2 extensions from Google.
This fork updates HappyPath to be compliant in Manifest V3.

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
* Click Close Path Editor
* The path list will update. It should contain 1 heading, and 2 relative links
* Navigate to `https://google.com`
* Clicking either link will take you to the appropriate page without changing the FQDN
* Navigate to `https://google.com.au`
* Clicking the same links will take you to the same routes without changing the FQDN
* This works because google.com and google.com.au share the same route structure. A traditional bookmark will also store the FQDN, which isn't useful when you have many websites that share the same route structure

## Domain-Specific Context Menu (New in 5.2.0)

HappierPath now supports domain-specific filtering for context menu items. You can configure paths to only appear in the context menu when you're on a specific domain or set of domains.

### Configuration Format

Each line follows this structure:

```
Name>Path[@Domain]
```

**Components:**
- **Name**: The display name for the link or heading
- **`>`**: Separator (required) - splits name from path
- **Path**: The URL path (use `0` for headings)
- **`@`**: Domain separator (optional) - only needed for domain-specific links
- **Domain**: Regex pattern to match domains (optional)

### Basic Examples

**Heading (appears on all domains):**
```
My Tools>0
```

**Simple link (appears on all domains):**
```
Dashboard>/dashboard
```

**Domain-specific link:**
```
GitHub Issues>/issues@github\.com
```

### Advanced Examples

**Single domain:**
```
Admin Panel>/admin@example\.com
```
Only appears when browsing example.com

**Multiple domains using OR (`|`):**
```
API Docs>/api/docs@(dev|staging|prod)\.example\.com
```
Appears on dev.example.com, staging.example.com, or prod.example.com

**Wildcard subdomains using `.*`:**
```
Dashboard>/dashboard@.*\.company\.com
```
Matches any subdomain of company.com (e.g., api.company.com, dev.company.com)

**Multiple different domains:**
```
Admin>/admin@(github|gitlab)\.com
```
Appears on both github.com and gitlab.com

### Complete Configuration Example

```
Work Tools>0
Company Dashboard>/dashboard@company\.com
Dev Environment>/admin@dev\.company\.com

GitHub>0
Issues>/issues@github\.com
Pull Requests>/pulls@github\.com

Universal Links>0
Google Search>/search
Wikipedia>/wiki
```

### Important Notes

- **Escape dots in domains**: Use `\.` instead of `.` (e.g., `github\.com` not `github.com`)
- **Case-insensitive**: Domain matching ignores case
- **Headings without children**: Headings are automatically hidden if no child links match the current domain
- **Backward compatible**: Links without `@Domain` appear on all domains

### Context Menu Behavior

* Context menu items are dynamically filtered based on the current tab's domain
* The filtering happens automatically when you switch tabs or navigate to a new page
* If no paths match the current domain, you'll see "No paths for this domain" in the context menu
* Domain patterns are case-insensitive regex patterns
* Invalid regex patterns will be logged to the console and those links will be hidden

## Change Log
CHANGES IN vERSION 5.0.0

Graphical Uplift

Change Requests:
* Use MUI as a component Library
* Theme option to toggle between Light and Dark. Light being the default
* Updated wording on the Read and Write Path List buttons to be simply Save and Reset Config

CHANGES IN VERSION 5.2.0

Domain-Specific Context Menu Filtering

Change Requests:

* Context menu items can now be filtered by domain using regex patterns
* Added support for domain-specific path configuration using `@domain` syntax
* Context menu dynamically updates when switching tabs or navigating
* Maintains backward compatibility - paths without domain patterns appear on all domains
* Examples and documentation added to Path Editor UI

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
