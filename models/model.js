/* 
Data models for Plex Alerts
*/
export { PlexWebhookPayload, MetadataModel, PersonModel, AccountModel, ServerModel, PlayerModel, ImageModel, GuidModel, RatingModel, RoleModel, UltraBlurColorsModel };

//filter is 'actor' for instance
//tag is the name of the ACTUAL ACTOR - Omar Epps play's Dr. Forman, tag is Omar Epps - it is ACTUAL NAMES
class PersonModel {
  constructor({ id, filter, tag, tagKey, thumb }) {
    this.id = id;
    this.filter = filter;
    this.tag = tag;
    this.tagKey = tagKey;
    this.thumb = thumb;
  }
}

//title for this instance would be the name of the account = plex user profile
class AccountModel{
  constructor({id, thumb, title})
  {
    this.id = id;
    this.thumb = thumb;
    this.title = title;
  }
}

//title in this instance is the name of the Plex Server
class ServerModel {
  constructor({ title, uuid }) {
    this.title = title;
    this.uuid = uuid;
  }
}


class PlayerModel {
  constructor({ local, publicAddress, title, uuid }) {
    this.local = local;
    this.publicAddress = publicAddress;
    this.title = title;
    this.uuid = uuid;
  }
}

class ImageModel {
  constructor({ alt, type, url }) {
    this.alt = alt;
    this.type = type;
    this.url = url;
  }
}

class GuidModel {
  constructor({ id }) {
    this.id = id;
  }
}

class RatingModel {
  constructor({ image, value, type }) {
    this.image = image;
    this.value = value;
    this.type = type;
  }
}

//Role in this case is the actor's character name in the film, movie, or series
class RoleModel extends PersonModel {
  constructor({ id, filter, tag, tagKey, role, thumb }) {
    super({ id, filter, tag, tagKey, thumb });
    this.role = role;
  }
}

class UltraBlurColorsModel {
  constructor({ topLeft, topRight, bottomRight, bottomLeft }) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
  }
}

//Objects from webhook, should map them to their respective classes
//map functions to convert the data to the respective classes, should loop over each item in  the aray, apply the func, and return a new array of results
//.. hopefully

class MetadataModel { 
  constructor(data) {
   Object.assign(this, data); //data copied over if not specified-shallow copy-redundant but safe incase something is missed
    this.Image = (data.Image || []).map(img => new ImageModel(img)); //complex fields
    this.UltraBlurColors = new UltraBlurColorsModel(data.UltraBlurColors || {});
    this.Guid = (data.Guid || []).map(g => new GuidModel(g)); 
    this.Rating = (data.Rating || []).map(r => new RatingModel(r));
    this.Director = (data.Director || []).map(d => new PersonModel(d));
    this.Writer = (data.Writer || []).map(w => new PersonModel(w));
    this.Role = (data.Role || []).map(r => new RoleModel(r));
    this.Producer = (data.Producer || []).map(p => new PersonModel(p));
    
  }
}


class PlexWebhookPayload {
  constructor({ event, user, owner, Account, Server, Player, Metadata }) {
    this.event = event;
    this.user = user;
    this.owner = owner;
    this.Account = new AccountModel(Account);
    this.Server = new ServerModel(Server);
    this.Player = new PlayerModel(Player);
    this.Metadata = new MetadataModel(Metadata);
  }
}
