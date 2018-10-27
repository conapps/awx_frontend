import FetchCRUD from './FetchCRUD.js';
import filter from 'lodash/filter.js';

class Labs extends FetchCRUD {
  items = [];
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
  };

  create = async lab => {
    const data = await this.fetchCreate(lab);

    this.items = [data, ...this.items];
  };

  delete = async id => {
    this.items = filter(this.items, item => item.id !== id);
    await this.fetchDelete(id);
  };
}

export default new Labs();
