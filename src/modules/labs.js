import FetchCRUD from './FetchCRUD.js';

class Labs extends FetchCRUD {
  items = [];
  next = undefined;
  prev = undefined;

  constructor() {
    super({ resource: 'labs' });
  }

  index = async () => {
    let response = await this.fetchIndex();

    if (response.ok === false) {
      await this.refreshTokens();
      response = await this.fetchIndex();
    }

    const data = await response.json();

    this.items = data.items;
    this.next = data.next;
    this.prev = data.prev;
  };

  create = async lab => {
    let response = await this.fetchCreate(lab);

    if (response.ok === false) {
      await this.refreshTokens();
      response = await this.fetchIndex();
    }

    const data = await response.json();

    this.items.push(data);
  };
}

export default new Labs();
