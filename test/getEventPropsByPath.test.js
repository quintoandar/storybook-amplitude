import getEventPropsByPath from '../src/getEventPropsByPath';

describe('Get event props by path', () => {
  const buildPath = (viewMode = 'docs') =>
    `/${viewMode}/components-fields-input--success`;

  it('should return the group name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.group).toBe('components-fields');
  });

  it('should return the page name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.page).toBe('input');
  });

  it('should return the story name', () => {
    const path = buildPath();
    const event = getEventPropsByPath(path);
    expect(event.story).toBe('success');
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
