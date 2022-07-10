import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import type { TagProps } from './types';

const Tag = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<TagProps>(({ theme, selected }) => ({
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: selected
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  color: selected ? theme.palette.common.white : theme.palette.common.black,
}));

export default Tag;
