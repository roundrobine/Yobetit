/**
 * Challenge model events
 */

'use strict';

import {EventEmitter} from 'events';
var Challenge = require('./challenge.model');
var ChallengeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChallengeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Challenge.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ChallengeEvents.emit(event + ':' + doc._id, doc);
    ChallengeEvents.emit(event, doc);
  }
}

export default ChallengeEvents;
