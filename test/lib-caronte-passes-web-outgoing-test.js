var caronte = require('../lib/caronte/passes/web-outgoing'),
    expect = require('expect.js');

describe('lib/caronte/passes/web-outgoing.js', function () {
  describe('#setConnection', function () {
    it('set the right connection with 1.0 - `close`', function() {
      var proxyRes = { headers: {} };
      caronte.setConnection({
        httpVersion: '1.0',
        headers: {
          connection: null
        }
      }, {}, proxyRes);

      expect(proxyRes.headers.connection).to.eql('close'); 
    });

    it('set the right connection with 1.0 - req.connection', function() {
      var proxyRes = { headers: {} };
      caronte.setConnection({
        httpVersion: '1.0',
        headers: {
          connection: 'hey'
        }
      }, {}, proxyRes);

      expect(proxyRes.headers.connection).to.eql('hey'); 
    });

    it('set the right connection - req.connection', function() {
      var proxyRes = { headers: {} };
      caronte.setConnection({
        httpVersion: null,
        headers: {
          connection: 'hola'
        }
      }, {}, proxyRes);

      expect(proxyRes.headers.connection).to.eql('hola'); 
    });

    it('set the right connection - `keep-alive`', function() {
      var proxyRes = { headers: {} };
      caronte.setConnection({
        httpVersion: null,
        headers: {
          connection: null
        }
      }, {}, proxyRes);

      expect(proxyRes.headers.connection).to.eql('keep-alive'); 
    });

  });

  describe('#writeStatusCode', function () {
    it('should write status code', function() {
      var res = {
        writeHead: function(n) {
          expect(n).to.eql(200);
        }
      }

      caronte.writeStatusCode({}, res, { statusCode: 200 });
    });
  });

  describe('#writeHeaders', function() {
    var proxyRes = {
      headers: {
        hey: 'hello',
        how: 'are you?'
      }
    };

    var res = {
      setHeader: function(k, v) {
        this.headers[k] = v;
      },
      headers: {}
    };

    caronte.writeHeaders({}, res, proxyRes);

    expect(res.headers.hey).to.eql('hello');
    expect(res.headers.how).to.eql('are you?');
  });

});
 