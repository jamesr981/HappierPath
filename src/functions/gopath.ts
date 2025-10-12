import { webext } from './webext.ts';
import type { WebextTab } from '../types/WebextTab.ts';
import { getLinksFromStorage } from './storage.ts';

/** How to group the new tab (Chrome). Firefox ignores grouping but preserves containers. */
export type GroupStrategy =
  | { kind: 'same-group' } // join the source tab's existing group
  | { kind: 'named-group'; title: string }; // find/create a group by title (same window)

export type GoPathOptions = {
  /** Reuse current tab (default) or open in a new tab next to the source. */
  openInNewTab?: boolean;
  /** Grouping strategy for Chrome. Defaults to same-group. */
  group?: GroupStrategy;
};

/** Create a new tab next to the source; on Firefox, preserve the container. */
export async function createNextTo(
  source: WebextTab,
  url: string
): Promise<WebextTab> {
  const props: chrome.tabs.CreateProperties = {
    url,
    active: true,
    index: typeof source.index === 'number' ? source.index + 1 : undefined,
    windowId: source.windowId,
  };

  // Firefox: keep the same container (cookieStoreId) if present
  if (webext.env.isFirefox && source.cookieStoreId) {
    try {
      (props as unknown as { cookieStoreId: string }).cookieStoreId =
        source.cookieStoreId;
    } catch (error) {
      console.warn(
        'Could not preserve container, creating tab in default container:',
        error
      );
    }
  }
  return webext.tabs.create(props);
}

/** Chrome-only: add created tab to same group as source (if any). */
export async function groupIntoSameAs(
  source: WebextTab,
  created: WebextTab
): Promise<void> {
  if (!webext.env.isChrome) return;
  if (created.id === undefined) return;
  if (typeof source.groupId === 'number') {
    await webext.tabs.group({ tabIds: [created.id], groupId: source.groupId });
  }
}

/** Chrome-only: add created tab to a named group in the same window. Create group if needed (set title only). */
export async function groupIntoNamed(
  source: WebextTab,
  created: WebextTab,
  title: string
): Promise<void> {
  if (!webext.env.isChrome) return;
  if (created.id === undefined) return;

  const groups = await webext.tabGroups.query({ title });
  const match = groups.find((g) => g.windowId === source.windowId);
  if (match) {
    await webext.tabs.group({ tabIds: [created.id], groupId: match.id });
    return;
  }

  // No existing group with that title → create a new one and name it.
  const gid = await webext.tabs.group({ tabIds: [created.id] });
  await webext.tabGroups.update(gid, { title });
}

/** Main function (Chrome + Firefox). */
export async function goPath(
  tab: WebextTab,
  urlIndex: number,
  opts: GoPathOptions = {}
): Promise<void> {
  const { openInNewTab = false, group = { kind: 'same-group' } } = opts;

  // Guard: we need the current tab's URL to compute the new URL.
  if (!tab.url) return;

  const links = await getLinksFromStorage();
  const link = links.links[urlIndex];
  const base = new URL(tab.url);
  const newUrl = `${base.protocol}//${base.hostname}${link.pathUrl}`;

  // Reuse current tab (keeps group & container automatically)
  if (!openInNewTab) {
    if (tab.id !== undefined) {
      await webext.tabs.update(tab.id, { url: newUrl });
    }
    return;
  }

  // Open next to source
  const created = await createNextTo(tab, newUrl);

  // Grouping (Chrome only)
  if (group.kind === 'same-group') {
    await groupIntoSameAs(tab, created);
  } else {
    await groupIntoNamed(tab, created, group.title);
  }
}
