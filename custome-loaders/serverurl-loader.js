// import { getOptions, urlToRequest } from 'loader-utils';
// import validateOptions from 'schema-utils';

// var schema = {
//     type: 'object',
//     properties: {
//         test: {
//             type: 'string'
//         }
//     }
// };


module.exports = function(source) {
    console.log(source);
    // console.log(source);
    // const option = getOptions(this);

    // validateOptions(schema, option, 'test loader');
    urlToRequest();
    return `export default ${JSON.stringify(source)}`;
}