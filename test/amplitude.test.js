import amplitude from 'amplitude-js';
import { window } from 'global';
import getEventPropsByPath from '../src/getEventPropsByPath';
import { Amplitude } from '../src/amplitude';
import { DEFAULT_EVENT } from '../src/constants';

jest.mock('amplitude-js');
jest.mock('global');

describe('Amplitude', () => {
  const viewMode = 'docs';
  const path = `/${viewMode}/components-fields-input--success`;

  const mockApi = () => ({
    getUrlState: jest.fn().mockReturnValue({ path, viewMode })
  });

  it('should set the api with provided value on constructor', () => {
    const api = mockApi();
    const instance = new Amplitude(api);
    expect(instance.api).toBe(api);
  });

  it('should get the amplitude instance', () => {
    const api = mockApi();
    new Amplitude(api);
    expect(amplitude.getInstance).toBeCalled();
  });

  it('should log the story event on call logStoryEvent method', () => {
    const api = mockApi();
    const instance = new Amplitude(api);
    instance.amplitudeInstance.logEvent.mockClear();
    instance.logStoryEvent();
    expect(instance.amplitudeInstance.logEvent).toBeCalledWith(DEFAULT_EVENT, {
      viewMode,
      ...getEventPropsByPath(path)
    });
  });

  it('should log the story with custom event', () => {
    const STORYBOOK_AMPLITUDE_EVENT = 'Some custom event';
    Object.assign(window, { STORYBOOK_AMPLITUDE_EVENT });
    const api = mockApi();
    const instance = new Amplitude(api);
    instance.logStoryEvent();
    expect(instance.amplitudeInstance.logEvent).toBeCalledWith(
      STORYBOOK_AMPLITUDE_EVENT,
      {
        viewMode,
        ...getEventPropsByPath(path)
      }
    );
  });

  it('should not log the story when path is not defined', () => {
    const api = {
      getUrlState: jest.fn().mockReturnValue({ path: undefined })
    };
    const instance = new Amplitude(api);
    instance.amplitudeInstance.logEvent.mockClear();
    instance.logStoryEvent();
    expect(instance.amplitudeInstance.logEvent).not.toBeCalled();
  });
});
