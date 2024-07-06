export interface TabProps {
  id: number;
  title: string;
  isActive: boolean;
}

export type TabsProps = TabProps[];

export interface TabsComponentProps {
  editorTabs: TabsProps;
  setActiveTab: (id: number) => void;
}
