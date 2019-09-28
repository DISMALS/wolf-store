import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

var schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
};


export default function (source) {
    const option = getOptions(this);

    validateOptions(schema, option, 'test loader');

    return `export default ${JSON.stringify(source)}`;
}