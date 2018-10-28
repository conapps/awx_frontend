import { schema } from 'normalizr';

export const lab = new schema.Entity('labs');
export const labs = new schema.Array(lab);

export const participant = new schema.Entity('participants');
export const participants = new schema.Array(participant);
