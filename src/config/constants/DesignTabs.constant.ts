import { TabsProps } from '../../interfaces/Tabs.interface';

export const DesignTabs: TabsProps = [
  {
    id: 1,
    title: 'Basic',
    isActive: true,
    imageUrl: '/assets/images/designs/basic-tshirt.png',
    textures: {
      front: { path: '', coordinates: { x: 0, y: 0 } },
      back: { path: '', coordinates: { x: 0, y: 0 } },
      rightHand: { path: '', coordinates: { x: 0, y: 0 } },
      leftHand: { path: '', coordinates: { x: 0, y: 0 } },
    },
  },
  {
    id: 2,
    title: 'Double Lines',
    isActive: false,
    imageUrl: '/assets/images/designs/double-lines.png',
    textures: {
      front: {
        path: '/assets/textures/designs/double-lines/double-lines.png',
        coordinates: { x: 2, y: -1 },
      },

      back: { path: '', coordinates: { x: 0, y: 0 } },
      rightHand: { path: '', coordinates: { x: 0, y: 0 } },
      leftHand: { path: '', coordinates: { x: 0, y: 0 } },
    },
  },
  {
    id: 3,
    title: 'Tribal Lines',
    isActive: false,
    imageUrl: '/assets/images/designs/trible-lines.png',
    textures: {
      front: {
        path: '/assets/textures/designs/trible-lines/trible-lines.png',
        coordinates: { x: 1.9, y: -0.9 },
      },
      back: { path: '', coordinates: { x: 0, y: 0 } },
      rightHand: { path: '', coordinates: { x: 0, y: 0 } },
      leftHand: { path: '', coordinates: { x: 0, y: 0 } },
    },
  },
  {
    id: 4,
    title: 'down arrow',
    isActive: false,
    imageUrl: '/assets/images/designs/down-arrow.png',
    textures: {
      front: {
        path: '/assets/textures/designs/down-arrow/down-arrow.png',
        coordinates: { x: 1.97, y: -0.95 },
      },
      back: { path: '', coordinates: { x: 0, y: 0 } },
      rightHand: { path: '', coordinates: { x: 0, y: 0 } },
      leftHand: { path: '', coordinates: { x: 0, y: 0 } },
    },
  },
];
