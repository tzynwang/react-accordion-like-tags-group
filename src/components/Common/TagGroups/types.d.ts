export type Tag = {
  _id: string;
  value: string;
  parent: string;
};

export type Group = Pick<Tag, '_id' | 'value'>;

const GroupsArray = [
  'Group: 0',
  'Group: 1',
  'Group: 2',
  'Group: 3',
  'Group: 4',
] as const;

export type GroupsKey = typeof GroupsArray[number];
