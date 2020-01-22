module.exports = {
  getInstance: jest.fn(() => ({
    init: jest.fn(),
    logEvent: jest.fn()
  }))
};
