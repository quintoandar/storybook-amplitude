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
window.STORYBOOK_AMPLITUDE_API_KEY = 'YOUR_API_KEY_HERE'
```

### Configuration

You can use a custom event name setting an environment variable:

```
window.STORYBOOK_AMPLITUDE_EVENT = 'Your custom event'
```

The default value is `Story Viewed`.

## Event anatomy

> lt;dr: the event will be sent with `Story Viewed` (or your custom event name) and the custom property object with `viewMode`, `group`, `page` and `story`.

The [Storybook provides](https://storybook.js.org/docs/addons/api) just the `path` and `storyId` on the `api` provided by `register` callback. The `strings` are like these examples:

- `/story/fundamentals-principles--page`
- `/docs/design-spacing--page`
- `/docs/components-accordion--base`
- `/story/components-accordion--base`

So, we've split the path and created an object with this anatomy:

`/<viewMode>/<group>-<page>--<story>`

Examples:

| Path                                   | ViewMode | Group        | Page       | Story    |
| -------------------------------------- | -------- | ------------ | ---------- | -------- |
| `/story/fundamentals-principles--page` | story    | fundamentals | principles | `null`   |
| `/docs/design-spacing--page`           | docs     | design       | spacing    | `null`   |
| `/docs/components-accordion--base`     | docs     | components   | accordion  | base     |
| `/story/components-button--disabled`   | story    | components   | button     | disabled |

Creating an util function that returns an object with viewMode, group, page and story. Something like this:

```js
{
  viewMode: 'docs',
  group: 'components',
  page: 'button',
  story: 'disabled'
}
```

## Support

Do you need a help? [Open a issue here!](https://github.com/quintoandar/storybook-amplitude/issues/new)
