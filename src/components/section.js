export default class Section {
	constructor({ items, renderer }, container) {
	  this._renderedItems = items;
	  this._renderer = renderer;
	  this._container = container;
	}
  
	prependItem(element) {
	  this._container.prepend(element);
	}

	appendItem(element) {
	  this._container.append(element);
	}
  
	renderItems() {
	  this._renderedItems.forEach(item => {
		this._renderer(item);
	  });
	}
  }