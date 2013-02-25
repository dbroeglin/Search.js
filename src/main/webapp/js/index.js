define(
['underscore'],
function
(_)
{
  function Index() {

  }

  Index.prototype.search =  function(query) {
    var data= this.data;
    var terms = query.split(' ');
    var docs = _.uniq(_.compact(_.flatten(_.map(terms, function(term) {
      return data[term];
    }))));
    return {
      count: docs.length,
      documents: _.map(docs, function(doc) {
        return { id: doc };
      })
    };
  }

  Index.prototype.setIndex = function(data) {
    this.data = data;
  }

  return Index;
});
