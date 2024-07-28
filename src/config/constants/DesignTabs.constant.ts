import { TabsProps } from '../../interfaces/Tabs.interface';

export const DesignTabs: TabsProps = [
  {
    id: 1,
    title: 'Basic',
    isActive: true,
    imageUrl: '/assets/images/designs/basic-tshirt.png',
    textures: {
      front: [{ id: '', path: '' }],
      back: [{ id: '', path: '' }],
      rightHand: [{ id: '', path: '' }],
      leftHand: [{ id: '', path: '' }],
    },
  },
  {
    id: 2,
    title: 'Double Lines',
    isActive: false,
    imageUrl: '/assets/images/designs/double-lines.png',
    textures: {
      front: [
        {
          id: 'element_1',
          path: '/assets/textures/double-lines/front_1.png',
        },
      ],
      back: [
        {
          id: 'element_2',
          path: '/assets/textures/double-lines/back_1.png',
        },
      ],
      rightHand: [{ id: '', path: '' }],
      leftHand: [{ id: '', path: '' }],
    },
  },
  {
    id: 3,
    title: 'Tribal Lines',
    isActive: false,
    imageUrl: '/assets/images/designs/trible-lines.png',
    textures: {
      front: [
        {
          id: 'element_1',
          path: '/assets/textures/trible-lines/front_1.png',
        },
      ],
      back: [
        {
          id: 'element_2',
          path: '/assets/textures/trible-lines/back_1.png',
        },
      ],
      rightHand: [{ id: '', path: '' }],
      leftHand: [{ id: '', path: '' }],
    },
  },
  {
    id: 4,
    title: 'lines',
    isActive: false,
    imageUrl: '/assets/images/designs/basic-tshirt.png',
    textures: {
      front: [
        {
          id: 'element_1',
          path: '/assets/textures/lines/front_1.png',
        },
        {
          id: 'element_2',
          path: '/assets/textures/lines/front_2.png',
        },
      ],
      back: [
        {
          id: 'element_1',
          path: '/assets/textures/lines/back_1.png',
        },
        {
          id: 'element_2',
          path: '/assets/textures/lines/back_2.png',
        },
      ],
      rightHand: [
        {
          id: 'element_3',
          path: '/assets/textures/lines/right_1.png',
        },
      ],
      leftHand: [
        {
          id: 'element_3',
          path: '/assets/textures/lines/left_1.png',
        },
      ],
    },
  },
];
