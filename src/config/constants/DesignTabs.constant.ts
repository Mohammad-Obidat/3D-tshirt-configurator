import { TabsProps } from '../../interfaces/Tabs.interface';

export const DesignTabs: TabsProps = [
  {
    id: 1,
    title: 'Basic',
    isActive: true,
    imageUrl: '/assets/images/basic-tshirt.png',
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
    imageUrl: '/assets/images/basic-tshirt.png',
    textures: {
      front: {
        path: '/assets/textures/design_1.png',
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
    imageUrl: '/assets/images/basic-tshirt.png',
    textures: {
      front: {
        path: '/assets/textures/design_2.png',
        coordinates: { x: 2, y: -1 },
      },
      back: { path: '', coordinates: { x: 0, y: 0 } },
      rightHand: { path: '', coordinates: { x: 0, y: 0 } },
      leftHand: { path: '', coordinates: { x: 0, y: 0 } },
    },
  },
];
