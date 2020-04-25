import { crud } from '../database/crud';
import Item from './itemModel';

// receive object of methods from crud.js
export default crud(Item);