'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var challengeCtrlStub = {
  index: 'challengeCtrl.index',
  show: 'challengeCtrl.show',
  create: 'challengeCtrl.create',
  update: 'challengeCtrl.update',
  destroy: 'challengeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
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

  describe('GET /api/challenges/:id', function() {

    it('should route to challenge.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'challengeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/challenges', function() {

    it('should route to challenge.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'challengeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/challenges/:id', function() {

    it('should route to challenge.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'challengeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/challenges/:id', function() {

    it('should route to challenge.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'challengeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/challenges/:id', function() {

    it('should route to challenge.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'challengeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
