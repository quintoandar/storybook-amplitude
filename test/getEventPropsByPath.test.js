import getEventPropsByPath from '../src/getEventPropsByPath';

describe('Get event props by path', () => {
  const buildPath = (viewMode = 'docs') =>
    `/${viewMode}/components-fields-input--success`;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error.mockClear();
  });

  it('should return the group name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.group).toBe('components-fields');
  });

  it('should log an error when try to get a group name from a invalid path', () => {
    const path = '/invalid-group/components-fields-input--success';
    const { group } = getEventPropsByPath(path);
    expect(console.error).toBeCalledWith(
      '[storybook-amplitude] Error on get group',
      expect.any(TypeError)
    );
    expect(group).toBeUndefined();
  });

  it('should return the page name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.page).toBe('input');
  });

  it('should log an error when try to get a page name from a invalid path', () => {
    const path = '/group/';
    const { page } = getEventPropsByPath(path);
    expect(console.error).toBeCalledWith(
      '[storybook-amplitude] Error on get page',
      expect.any(TypeError)
    );
    expect(page).toBeUndefined();
  });

  it('should return the story name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.story).toBe('success');
  });

  it('should log an error when try to get a story name from a invalid path', () => {
    const path = undefined;
    const { story } = getEventPropsByPath(path);
    expect(console.error).toBeCalledWith(
      '[storybook-amplitude] Error on get story',
      expect.any(TypeError)
    );
    expect(story).toBeUndefined();
  });

  it('should return events props from story mode', () => {
    const path = buildPath('story');
    const event = getEventPropsByPath(path);
    expect(event).toEqual({
      group: 'components-fields',
      page: 'input',
      story: 'success'
    });
  });

  it('should return null when story name is a page', () => {
    const path = '/story/fundamentals-principles--page';
    const event = getEventPropsByPath(path);
    expect(event.story).toBeNull();
  });
});
