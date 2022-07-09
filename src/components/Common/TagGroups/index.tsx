import React, { memo, useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { chunk } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ButtonBase } from '@mui/material';
import type { Tag, Group, GroupsKey } from './types';

const GROUPS: Group[] = Array.from({ length: 8 }, (_, i) => ({
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
const TAGS_5: Tag[] = Array.from({ length: 6 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 5',
}));
const TAGS_6: Tag[] = Array.from({ length: 6 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 6',
}));
const TAGS_7: Tag[] = Array.from({ length: 6 }, (_, i) => ({
  _id: uuidv4(),
  value: faker.name.firstName(),
  parent: 'Group: 7',
}));
const GROUP_PER_ROW = 3;

function TagGroup(): React.ReactElement {
  /* States */
  const [rows, setRows] = useState<React.ReactNode[][]>([]);
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
    setTags([
      ...TAGS_0,
      ...TAGS_1,
      ...TAGS_2,
      ...TAGS_3,
      ...TAGS_4,
      ...TAGS_5,
      ...TAGS_6,
      ...TAGS_7,
    ]);
  }, []);
  useEffect(() => {
    const chunks = chunk(groups, GROUP_PER_ROW);
    const result = chunks.map((groupRow, groupIndex) => {
      const row: React.ReactNode[] = groupRow.map((group) => (
        <ButtonBase
          key={group._id}
          onClick={handleGroupClick(group.value, groupIndex)}
          sx={{
            flex: '1 1 auto',
            minWidth: '120px',
            minHeight: '60px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: group.value === currentGroup ? '#ccc' : '#fff',
          }}
          disableRipple
          disableTouchRipple
        >
          {group.value}
        </ButtonBase>
      ));
      return row;
    });
    setRows(result);
  }, [groups, currentGroup]);
  useEffect(() => {
    setCurrentTags(tags.filter((t) => t.parent === currentGroup));
  }, [currentGroup]);

  /* Main */
  return (
    <React.Fragment>
      <div style={{ marginBottom: '1rem' }}>
        currently click group: {currentGroup}
      </div>
      {rows.map((row, rowsIndex) => (
        <div
          key={rowsIndex}
          className="GroupsWrapper"
          style={{
            marginBottom:
              currentGroup && currentRow === rowsIndex ? '0' : '1rem',
          }}
        >
          <div className="GroupRow" style={{ display: 'flex', gap: '1rem' }}>
            {row.map((r, index) => (
              <React.Fragment key={index}>{r}</React.Fragment>
            ))}
          </div>
          {currentGroup && currentRow === rowsIndex && (
            <div
              className="TagsWrapper"
              style={{
                margin: '1rem auto',
                padding: '1rem',
                display: 'flex',
                gap: '.5rem',
                background: 'rgba(0, 0, 0, .6)',
              }}
            >
              {currentShowTags.map((tag) => (
                <div
                  key={tag._id}
                  className="Tag"
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
      ))}
    </React.Fragment>
  );
}

export default memo(TagGroup);
