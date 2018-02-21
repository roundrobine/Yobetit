'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var challengeCtrlStub = {
  index: 'challengeCtrl.index',
  pi: 'challengeCtrl.pi',
};

var routerStub = {
  get: sinon.spy(),
};

// require the index with our stubbed out modules
var challengeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './challenge.controller': challengeCtrlStub
});

describe('Challenge API Router:', function() {

  it('should return an express router instance', function() {
    expect(challengeIndex).to.equal(routerStub);
  });

  describe('GET /api/challenges', function() {

    it('should route to challenge.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'challengeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/challenges/pi', function() {

    it('should route to challenge.controller.pi', function() {
      expect(routerStub.get
        .withArgs('/:id', 'challengeCtrl.pi')
        ).to.have.been.calledOnce;
    });

  });

});
