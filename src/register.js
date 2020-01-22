import { addons } from '@storybook/addons';
import { STORY_CHANGED } from '@storybook/core-events';
import { ADDON_ID } from './constants';
import { Amplitude } from './amplitude';

export const register = () => {
  if (process.env.NODE_ENV === 'production') {
    addons.register(ADDON_ID, api => {
      const amplitude = new Amplitude(api);
      api.on(STORY_CHANGED, () => {
        amplitude.logStoryEvent();
      });
    });
  }
};
