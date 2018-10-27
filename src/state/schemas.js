import { schema } from 'normalizr';

export const lab = new schema.Entity('labs');
export const labs = new schema.Array(lab);
