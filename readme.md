# Storybook Addon Amplitude

Storybook Addon Amplitude provides support for [Amplitude](https://amplitude.com/) on [Storybook](https://storybook.js.org).

## Getting Started

Install:

```sh
npm install storybook-amplitude --save-dev
```

within `.storybook/main.js`:

```js
module.exports = {
  addons: ['storybook-amplitude/register']
};
```

Then, set an environment variable with your API key:

```
window.STORYBOOK_AMPLITUDE_API_KEY = '561t966209h0789k7ffr2c3nmn0sau90'
```

### Configuration

You can use a custom event name setting an environment variable:

```
window.STORYBOOK_AMPLITUDE_EVENT = 'Your custom event'
```

The default value is `Story Viewed`.

## Event anatomy

> lt;dr: the event will be send with `Story Viewed` (or your custom event name) and the a custom property object with `viewMode`, `group`, `page` and `story`.

The [Storybook provides](https://storybook.js.org/docs/addons/api) just the `path` and `storyId` on the `api` provided by `register` callback. The `string` are like these examples:

- `/story/fundamentals-principles--page`
- `/docs/design-spacing--page`
- `/docs/components-accordion--base`
- `/story/components-accordion--base`

So, we'd splitted the path and creates an object with this anatomy:

`/<viewMode>/<group>-<page>--<story>`

Examples:

| Path                                   | ViewMode | Group        | Page       | Story    |
| -------------------------------------- | -------- | ------------ | ---------- | -------- |
| `/story/fundamentals-principles--page` | story    | fundamentals | principles | `null`   |
| `/docs/design-spacing--page`           | docs     | design       | spacing    | `null`   |
| `/docs/components-accordion--base`     | docs     | components   | accordion  | base     |
| `/story/components-button--disabled`   | story    | components   | button     | disabled |

Creating a util function that returns an object with viewMode, group, page and story. Something like this:

```js
{
  viewMode: 'docs',
  group: 'components',
  page: 'button',
  story: 'disabled'
}
```

## Support

You need a help? [Open a issue!](https://github.com/quintoandar/storybook-amplitude/issues/new)
