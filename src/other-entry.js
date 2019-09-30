import { isEqual } from 'lodash';
function errorTest () {
    console.log('this is other entry!');
    console.log(isEqual(3, 4));
}
errorTest()