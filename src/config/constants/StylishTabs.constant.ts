import { TabsProps } from '../../interfaces/Tabs.interface';

export const stylishTabs: TabsProps = [
  {
    id: 1,
    title: 'Design',
    isActive: true,
    imageUrl: '/assets/icons/design.svg',
  },
  {
    id: 2,
    title: 'Colors',
    isActive: false,
    imageUrl: '/assets/icons/color.svg',
  },
  {
    id: 3,
    title: 'Pattern',
    isActive: false,
    imageUrl: '/assets/icons/pattern.svg',
  },
  {
    id: 4,
    title: 'Text',
    isActive: false,
    imageUrl: '/assets/icons/text.svg',
  },
  {
    id: 5,
    title: 'Logos',
    isActive: false,
    imageUrl: '/assets/icons/image.svg',
  },
];
