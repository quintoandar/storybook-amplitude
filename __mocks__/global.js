module.exports = {
  window: jest.fn(() => ({
    STORYBOOK_AMPLITUDE_API_KEY: 'some-key'
  }))
};
