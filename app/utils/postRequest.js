import request from 'utils/request';

/*
* The transformer function to add catgories to the reponse
* register the catgeories you want to add
* exectute them over the row
* TODO: attach a register of the categories
*/
function transform(repos) {
  const THIRDS = "thirds";
  const FIFTHS = "fifths";
  const MAGIC = "magic";

  let BasicCategories = [
    {
      name: THIRDS,
      exec: (row) => row % 3 == 0
    },
    {
      name: FIFTHS,
      exec: (row) => row % 5 == 0
    }
  ];
  let AdvanceCategories = [
    {
      name: MAGIC,
      exec: (categories) => categories.length === 2
    }
  ]
  repos.forEach(row => {
    BasicCategories.forEach((category)=>{
      if(category.exec(row.id)) {
        row.category = row.category || [];
        row.category.push(category.name);
      }
    })
    if(row.category) {
      AdvanceCategories.forEach((category)=>{
        if(category.exec(row.category)){
          row.category = [MAGIC];
        }
      })
    }
  });
  return repos;
}

export default function (endpoint) {
  return request(endpoint).then(transform);
}
