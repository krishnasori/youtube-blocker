# YouTube Night Blocker

A Chrome extension that blocks YouTube every night from 10 PM to 7 AM, 
to help cut down on late-night doomscrolling.

## How it works

- Uses Chrome's `declarativeNetRequest` API to block requests to `youtube.com` 
  during the blocked hours.
- Checks the time every minute using `chrome.alarms`, and adds/removes the 
  blocking rule accordingly.
- Also force-reloads any already-open YouTube tabs when block hours begin, 
  so you don't need to manually refresh for the block to take effect.

## Known limitation

YouTube uses a service worker that can serve cached pages without making a 
fresh network request. Because `declarativeNetRequest` can only intercept 
actual network requests, this means the block doesn't always trigger 
immediately in every case (e.g. some cached navigations). 

A more robust fix would be adding a `chrome.webNavigation.onBeforeNavigate` 
listener to catch navigation attempts directly, regardless of whether the 
page loads from cache or network. This is a planned next step, not yet 
implemented.

## Setup

1. Clone this repo
2. Go to `chrome://extensions`
3. Enable Developer mode (top right)
4. Click "Load unpacked" and select this folder

## Status

Functional but with the limitation above. Currently using a Web Store 
extension as a daily-driver alternative while this is a side project to 
learn Chrome extension development.