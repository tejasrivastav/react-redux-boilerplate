/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_POSTS = 'boilerplate/App/LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'boilerplate/App/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'boilerplate/App/LOAD_POSTS_ERROR';
export const DEFAULT_LOCALE = 'en';

const THIRDS = 'thirds';
const FIFTHS = 'fifths';
const MAGIC = 'magic';

export const categories = [
  {
    name: THIRDS,
    exec: (row) => row.id % 3 === 0
  },
  {
    name: FIFTHS,
    exec: (row) => row.id % 5 === 0
  },
  {
    name: MAGIC,
    exec: (row) => (row.category ? (row.category.length === 2) : false)
  }
];

export const categoriesName = categories.map((category) => category.name);
