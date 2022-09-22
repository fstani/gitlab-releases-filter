import { filterReleasePage, Tiers, Licenses } from '../filter/GitlabReleaseFilter';
import { FilterMessageResponse, FilterMessage, MessageType } from '../types';

const messagesFromReactAppListener = (msg: FilterMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: FilterMessageResponse | null) => void) => {
  let response: FilterMessageResponse | null = null;

  if (msg.type === MessageType.FILTER_DOM) {
    response = {
      count: filterReleasePage({mode: msg.mode as Tiers, license: msg.tier as Licenses})
    };
  }

  sendResponse(response);
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
