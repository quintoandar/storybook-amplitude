import amplitude from 'amplitude-js';
import { window } from 'global';
import { DEFAULT_EVENT } from './constants';
import getEventPropsByPath from './getEventPropsByPath';

export class Amplitude {
  constructor(api) {
    this.api = api;
    this.amplitudeInstance = buildAmplitudeInstance();
    this.logStoryEvent();
  }

  logStoryEvent() {
    const { path, viewMode } = this.api.getUrlState();

    if (shouldLog(path)) {
      this.amplitudeInstance.logEvent(getEventType(), {
        viewMode,
        ...getEventPropsByPath(path)
      });
    }
  }
}

function buildAmplitudeInstance() {
  const amplitudeInstance = amplitude.getInstance();
  amplitudeInstance.init(window.STORYBOOK_AMPLITUDE_API_KEY);
  return amplitudeInstance;
}

function getEventType() {
  return window.STORYBOOK_AMPLITUDE_EVENT || DEFAULT_EVENT;
}

function shouldLog(path) {
  return typeof path !== 'undefined';
}
