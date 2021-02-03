# react-style-loader

Inject CSS into the React VDOM.

## Getting Started

To begin, you'll need to install `react-style-loader`:

```console
npm install --save-dev style-loader
```

It's recommended to combine `react-style-loader` with the [`css-loader`](https://github.com/webpack-contrib/css-loader)
you will also require chaining in babel loader as the output will include react code

Then add the loader to your `webpack` config. For example:

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```jsx
import StyleElement from './style.css';

//Use Style Element like any other react element IE:
return (
  <>
    <StyleElement />
    <SomeComponent>{someData}</SomeComponent>
  </>
);
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['babel-loader', 'react-style-loader', 'css-loader'],
      },
    ],
  },
};
```

## Options

|           Name            |    Type    |   Default   | Description               |
| :-----------------------: | :--------: | :---------: | :------------------------ |
| [**`modules`**](#modules) | `{Object}` | `undefined` | Configuration CSS Modules |

### `modules`

Type: `Object`
Default: `undefined`

Configuration CSS Modules.

#### `namedExport`

Type: `Boolean`
Default: `false`

Enables/disables ES modules named export for locals.

> ⚠ Names of locals are converted to `camelCase`.

> ⚠ It is not allowed to use JavaScript reserved words in css class names.

> ⚠ Options `esModule` and `modules.namedExport` in `css-loader` and `style-loader` should be enabled.

**styles.css**

```css
.foo-baz {
  color: red;
}
.bar {
  color: blue;
}
```

**index.js**

```js
import StyleElement, { fooBaz, bar } from './styles.css';

console.log(fooBaz, bar);
```

You can enable a ES module named export using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Examples

### Source maps

The loader automatically inject source maps when previous loader emit them.
Therefore, to generate source maps, set the `sourceMap` option to `true` for the previous loader.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
```

## License

[MIT](./LICENSE)
