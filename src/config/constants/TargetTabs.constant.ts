import { TabsProps } from '../../interfaces/Tabs.interface';

export const targetTabs: TabsProps = [
  {
    id: 1,
    title: 'front',
    isActive: true,
  },
  {
    id: 2,
    title: 'back',
    isActive: false,
  },
  {
    id: 3,
    title: 'rightSleeve',
    isActive: false,
  },
  {
    id: 4,
    title: 'leftSleeve',
    isActive: false,
  },
];

export const PART_COORDINATES: {
  [key: string]: { x: number; y: number; width: number; height: number };
} = {
  front: { x: 0, y: 150, width: 1000, height: 1200 },
  back: { x: 1000, y: 150, width: 1000, height: 1200 },
  rightSleeve: { x: 200, y: 1500, width: 500, height: 700 },
  leftSleeve: { x: 1350, y: 1450, width: 500, height: 700 },
};
