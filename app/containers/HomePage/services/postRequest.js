import request from 'utils/request';

import { categories } from 'containers/App/constants';
/*
* The transformer function to add catgories to the reponse
* register the catgeories you want to add
* exectute them over the row
*/

function transform(repos) {
  repos.forEach((row) => {
    categories.forEach((category) => {
      if (category.exec(row)) {
        row.category = row.category || [];
        row.category.push(category.name);
      }
    });
  });
  return repos;
}

export default function (endpoint) {
  return request(endpoint).then(transform).catch((err) => {
    console.error(err);
  });
}
