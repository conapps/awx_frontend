import FetchCRUD from './FetchCRUD.js';
import filter from 'lodash/filter.js';
import emitter from './emitter.js';

class Labs extends FetchCRUD {
  items = [];
  current = undefined;
  next = undefined;
  prev = undefined;

  constructor() {
    super({ resource: 'labs' });
  }

  index = async () => {
    const data = await this.fetchIndex();

    this.items = data.items;
    this.next = data.next;
    this.prev = data.prev;

    this.emitUpdate();
  };

  create = async lab => {
    const data = await this.fetchCreate(lab);

    this.items = [data, ...this.items];

    this.emitUpdate();
  };

  get = async id => {
    emitter.emit(`${this.resource}:${id}:get:start`);
    const lab = await this.fetchGet(id);

    this.current = lab;

    emitter.emit(`${this.resource}:${id}:get:end`, lab);
    this.emitUpdate();
  };

  delete = async id => {
    this.items = filter(this.items, item => item.id !== id);
    await this.fetchDelete(id);
    this.emitUpdate();
  };
}

export default new Labs();
