import { TabsProps } from '../../interfaces/Tabs.interface';

export const stylishTabs: TabsProps = [
  {
    id: 1,
    title: 'Design',
    description: 'Choose a standard design',
    isActive: true,
    imageUrl: '/assets/icons/design.svg',
  },
  {
    id: 2,
    title: 'Color',
    description: 'Decide on your color combination',
    isActive: false,
    imageUrl: '/assets/icons/color.svg',
  },
  {
    id: 3,
    title: 'Pattern',
    description: 'Assign a pattern to the areas',
    isActive: false,
    imageUrl: '/assets/icons/pattern.svg',
  },
  {
    id: 4,
    title: 'Text',
    description: 'Choose a lettering, e.g. the club name',
    isActive: false,
    imageUrl: '/assets/icons/text.svg',
  },
  {
    id: 5,
    title: 'Logo',
    description: 'Place as many logos as you want',
    isActive: false,
    imageUrl: '/assets/icons/image.svg',
  },
];
