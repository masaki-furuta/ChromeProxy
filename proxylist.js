var proxyList = function(el) {
  this.element = el;
  this.proxies = [];
  this.init();
};
proxyList.prototype.init = function() {
  var that = this;
  this.element.addEventListener('focus', function() {
    that.element.setAttribute('hasElementFocus', true);
  }, false);
  this.element.addEventListener('blur', function(e) {
    that.element.removeAttribute('hasElementFocus');
    window.setTimeout(function() {
      for (var idx = 0; idx < that.proxies.length; idx++) {
        that.proxies[idx].blur();
      }
    }, 0);
  }, false);
};

proxyList.prototype.add = function() {
  var p = proxy.fromString("http://localhost:8080");
  this.proxies.push(p);
  p.render(this.element);
  p.onRemove = function() {
    var idx = this.proxies.indexOf(p);
    this.proxies.splice(idx, 1);
  }.bind(this);
  p.onSelect = function() {
    for (var idx = 0; idx < this.proxies.length; idx++) {
      if (this.proxies[idx] != p) {
        this.proxies[idx].deselect();
      }
    }
  }.bind(this);
};