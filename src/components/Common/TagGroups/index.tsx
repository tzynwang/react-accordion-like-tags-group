import React, { memo, useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { ButtonBase } from '@mui/material';
import type { Tag, Group, GroupsKey } from './types';

const GROUPS: Group[] = Array.from({ length: 5 }, (_, i) => ({
  _id: uuidv4(),
  value: `Group: ${i}`,
}));
const TAGS_0: Tag[] = Array.from({ length: 8 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 0',
}));
const TAGS_1: Tag[] = Array.from({ length: 7 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 1',
}));
const TAGS_2: Tag[] = Array.from({ length: 10 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 2',
}));
const TAGS_3: Tag[] = Array.from({ length: 13 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 3',
}));
const TAGS_4: Tag[] = Array.from({ length: 6 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 4',
}));

function TagGroup(): React.ReactElement {
  /* States */
  const [groups, setGroups] = useState<Group[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupsKey | null>(null);
  const [currentShowTags, setCurrentTags] = useState<Tag[]>([]);
  const [currentRow, setCurrentRow] = useState<number | null>(null);

  /* Functions */
  const handleGroupClick = (clickedGroup: string, row: number) => () => {
    const group = clickedGroup as GroupsKey;
    setCurrentRow(row);
    if (currentGroup === group) {
      setCurrentGroup(null);
    } else {
      setCurrentGroup(group);
    }
  };

  /* Hooks */
  useEffect(() => {
    setGroups(GROUPS);
    setTags([...TAGS_0, ...TAGS_1, ...TAGS_2, ...TAGS_3, ...TAGS_4]);
  }, []);
  useEffect(() => {
    setCurrentTags(tags.filter((t) => t.parent === currentGroup));
  }, [currentGroup]);

  /* Main */
  return (
    <div>
      <div>currently click group: {currentGroup}</div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {groups.slice(0, 3).map((group) => (
          <ButtonBase
            key={group._id}
            onClick={handleGroupClick(group.value, 0)}
            sx={{
              minWidth: '120px',
              minHeight: '60px',
              border: '1px solid #333',
              borderRadius: '.5rem',
              backgroundColor: group.value === currentGroup ? '#ccc' : '#fff',
            }}
          >
            {group.value}
          </ButtonBase>
        ))}
      </div>
      {currentGroup && currentRow === 0 && (
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            gap: '.5rem',
            background: 'rgba(0, 0, 0, .3)',
            transform:
              currentGroup && currentRow === 0 ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'transform .2s ease-in',
          }}
        >
          {currentShowTags.map((tag) => (
            <div
              key={tag._id}
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#EED2C7',
                color: '#333',
                borderRadius: '4px',
              }}
            >
              {tag.value}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {groups.slice(3).map((group) => (
          <ButtonBase
            key={group._id}
            onClick={handleGroupClick(group.value, 1)}
            sx={{
              minWidth: '120px',
              minHeight: '60px',
              border: '1px solid #333',
              borderRadius: '.5rem',
              backgroundColor: group.value === currentGroup ? '#ccc' : '#fff',
            }}
          >
            {group.value}
          </ButtonBase>
        ))}
      </div>
      {currentGroup && currentRow === 1 && (
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            gap: '.5rem',
            background: 'rgba(0, 0, 0, .3)',
            transform:
              currentGroup && currentRow === 1 ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'transform .2s ease-in',
          }}
        >
          {currentShowTags.map((tag) => (
            <div
              key={tag._id}
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#EED2C7',
                color: '#333',
                borderRadius: '4px',
              }}
            >
              {tag.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(TagGroup);
