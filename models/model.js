/* 
Data models for Plex Alerts
*/

class Person {
  constructor({ id, filter, tag, tagKey, thumb }) {
    this.id = id;
    this.filter = filter;
    this.tag = tag;
    this.tagKey = tagKey;
    this.thumb = thumb;
  }
}

