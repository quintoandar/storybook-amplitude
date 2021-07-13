import { addons } from '@storybook/addons';
import { DOCS_RENDERED, STORY_RENDERED } from '@storybook/core-events';
import { ADDON_ID } from './constants';
import { Amplitude } from './amplitude';

export const register = () => {
  if (process.env.NODE_ENV === 'production') {
    addons.register(ADDON_ID, api => {
      const amplitude = new Amplitude(api);
      api.on(DOCS_RENDERED, () => {
        amplitude.logStoryEvent();
      });
      api.on(STORY_RENDERED, () => {
        amplitude.logStoryEvent();
      });
    });
  }
};
