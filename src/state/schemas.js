import { schema } from 'normalizr';
/** Labs */
export const lab = new schema.Entity('labs');
export const labs = new schema.Array(lab);
/** Participants */
export const participant = new schema.Entity('participants');
export const participants = new schema.Array(participant);
/** Jobs */
export const job = new schema.Entity('jobs');
export const jobs = new schema.Array(job);
