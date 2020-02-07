export default function getEventPropsByPath(path) {
  const group = getGroup(path);
  const page = getPage(path);
  const story = getStory(path);

  return { group, page, story };
}

function getGroup(path) {
  try {
    const groupRegex = /(docs\/|story\/)(.*)(?=--)/;
    const splittedPath = groupRegex.exec(path)[2].split('-');
    const pageIndex = splittedPath.length - 1;
    splittedPath.splice(pageIndex, 1);
    return splittedPath.join('-');
  } catch (error) {
    buildError('group', error);
  }
}

function getPage(path) {
  try {
    const groupRegex = /(\/.+?)(?=--)/;
    const splittedPath = groupRegex.exec(path)[0].split('-');
    const pageIndex = splittedPath.length - 1;
    return splittedPath[pageIndex];
  } catch (error) {
    buildError('page', error);
  }
}

function getStory(path) {
  try {
    const splittedPath = path.split('--');
    const pageIndex = splittedPath.length - 1;
    return splittedPath[pageIndex] === 'page' ? null : splittedPath[pageIndex];
  } catch (error) {
    buildError('story', error);
  }
}

function buildError(attr, error) {
  console.error(`[storybook-amplitude] Error on get ${attr}`, error);
  return null;
}
