define(
['index'],
function
(Index) {

  describe('Index', function () {
    beforeEach(function () {
      this.index = new Index();
    });

    it('should respond to #search', function () {
      expect(this.index.search).toBeDefined();
    });

    it('should respond to #setIndex', function () {
      expect(this.index.setIndex).toBeDefined();
    });

    describe('Should answer queries:', function() {
      beforeEach(function () {
        this.index.setIndex({
            foo: ['doc1'],
            bar: ['doc1', 'doc2']
        });

        this.addMatchers({
            toRetrieve: function(count, docs) {
              var actual = this.actual;

              if (this.actual.count != count) {
                this.message = function() {
                  return "Expected " + count + " instead of " + actual.count;
                };
                return false;
              }
              for(var i = 0; i < docs.length; i++) {
                if (actual.documents[i].id != docs[i]) {
                  console.log(actual.documents[i]);
                  this.message = function() {
                     return "Expected " + docs[i] + " instead of " + actual.documents[i].id;
                  };
                  return false;
                }
              }
              return true;
            }
        });
      });

      it('"foo" -> doc1', function () {
        var result = this.index.search('foo');

        expect(result).toEqual({
            count: 1,
            documents: [
              { id: 'doc1' }
          ]
        });
      });

      it('"bar" -> doc1, doc2', function () {
        var result = this.index.search('bar');

        expect(result).toEqual({
            count: 2,
            documents: [
              { id: 'doc1' },
              { id: 'doc2' }
          ]
        });
      });

      it('"baz" -> _nothing_', function () {
        var result = this.index.search('baz');

        expect(result).toEqual({
            count: 0,
            documents: []
        });
      });

      it('"foo bar" -> doc1, doc2', function () {
        var result = this.index.search('foo bar');

        expect(result).toRetrieve(2, ['doc1', 'doc2']);
      });
    });
  });
});
