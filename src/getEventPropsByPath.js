export default function getEventPropsByPath(path) {
  const group = getGroup(path);
  const page = getPage(path);
  const story = getStory(path);

  return { group, page, story };
}

function getGroup(path) {
  const groupRegex = /(?<=\/(docs|story)\/)(.*)(?=--)/;
  const splittedPath = groupRegex.exec(path)[0].split('-');
  const pageIndex = splittedPath.length - 1;
  splittedPath.splice(pageIndex, 1);
  return splittedPath.join('-');
}

function getPage(path) {
  const groupRegex = /(\/.+?)(?=--)/;
  const splittedPath = groupRegex.exec(path)[0].split('-');
  const pageIndex = splittedPath.length - 1;
  return splittedPath[pageIndex];
}

function getStory(path) {
  const splittedPath = path.split('--');
  const pageIndex = splittedPath.length - 1;
  return splittedPath[pageIndex] === 'page' ? null : splittedPath[pageIndex];
}
