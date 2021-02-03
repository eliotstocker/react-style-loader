import loaderUtils from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
  const options = loaderUtils.getOptions(this);

  validate(schema, options, {
    name: 'Style Loader',
    baseDataPath: 'options',
  });

  const namedExport = options.modules && options.modules.namedExport;

  return `import content${
    namedExport ? ', * as locals' : ''
  } from ${loaderUtils.stringifyRequest(this, `!!${request}`)};
            import React from ${loaderUtils.stringifyRequest(this, 'react')};

var exported = function StyleElement() {
    return (<>
      {content.map(([id, css]) => (<style id={id}>{css}</style>))}
    </>);
}

${
  namedExport
    ? `export * from ${loaderUtils.stringifyRequest(this, `!!${request}`)};`
    : ''
};
export default exported;`;
};

export default loaderApi;
