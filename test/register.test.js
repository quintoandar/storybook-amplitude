import { addons } from '@storybook/addons';
import { DOCS_RENDERED, STORY_RENDERED } from '@storybook/core-events';
import { ADDON_ID } from '../src/constants';
import { Amplitude } from '../src/amplitude';
import { register } from '../src/register';

const mockAmplitudeInstance = { logStoryEvent: jest.fn() };

const mockApi = () => ({
  on: jest.fn((param, cb) => cb())
});

jest.mock('@storybook/addons');

jest.mock('../src/amplitude', () => ({
  Amplitude: jest.fn(() => mockAmplitudeInstance)
}));

describe('Register', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    addons.register.mockClear();
  });

  it('should register the addon when is production', () => {
    process.env.NODE_ENV = 'production';
    register();
    expect(addons.register).toBeCalledWith(ADDON_ID, expect.any(Function));
  });

  it('should not register the addon when is not production', () => {
    process.env.NODE_ENV = 'development';
    register();
    expect(addons.register).not.toBeCalled();
  });

  it('should create an instance from amplitude on register', () => {
    const api = mockApi();
    addons.register.mockImplementation((params, cb) => cb(api));
    register();
    expect(Amplitude).toBeCalledWith(api);
  });

  it('should listen story changes by api', () => {
    const api = mockApi();
    addons.register.mockImplementation((params, cb) => cb(api));
    register();
    expect(api.on).toBeCalledWith(DOCS_RENDERED, expect.any(Function));
    expect(api.on).toBeCalledWith(STORY_RENDERED, expect.any(Function));
  });

  it('should log story when it has been changed', () => {
    const api = mockApi();
    addons.register = jest.fn((param, cb) => cb(api));
    register();
    expect(mockAmplitudeInstance.logStoryEvent).toBeCalled();
  });
});
