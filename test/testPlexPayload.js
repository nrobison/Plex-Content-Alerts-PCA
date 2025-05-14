import { expect } from 'chai';

import { PlexWebhookPayload } from '../models/model.js';
import sampleWebhook from './sampleWebhook.json' assert { type: 'json' };

describe('PlexWebhookPayload Model', () => {
  it('should parse the correct payload and map key fields', () => { //using maps for complex objects, and flat fields both work equally as well
    const payload = new PlexWebhookPayload(sampleWebhook);

    expect(payload.event).to.equal('media.pause');
    expect(payload.Account.title).to.equal('pancakeOCEAN');
    expect(payload.Server.title).to.equal('OceanPlex');
    expect(payload.Player.title).to.equal('Waffles');
    expect(payload.Metadata.title).to.equal('The Socratic Method');
    expect(payload.Metadata.Image).to.be.an('array').with.lengthOf(4); //4 items in the list for image metadata
  });

  it('parse the correct number of cast roles', () => {
    const payload = new PlexWebhookPayload(sampleWebhook);
    expect(payload.Metadata.Role.length).to.be.greaterThan(0);
    expect(payload.Metadata.Role[0]).to.have.property('role');
    expect(payload.Metadata.Role[0]).to.have.property('tag');
  });
});
