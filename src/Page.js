import React from 'react';
import { Space, Typography, Avatar, Tabs } from 'antd';
import DuaList from './DuaList';
import TagList from './TagList';
import ThemeList from './ThemeList';
import { useTags, useDuas, useThemes } from "./dataUtils";

const { Text } = Typography;
const { TabPane } = Tabs;

// const themes = {
//   themes: [
//     {
//       id: "1",
//       title: "default",
//       colors: [
//         {r:190, g:196, b:69},
//         {r:49, g:105, b:12},
//         {r:20, g:48, b:0}
//       ]
//     }
//   ],
//   getThemeById: () => ({
//     id: "1",
//     title: "default",
//     colors: [
//       {r:190, g:196, b:69},
//       {r:49, g:105, b:12},
//       {r:20, g:48, b:0}
//     ]
//   })
// }

const Page = ({ user }) => {
  const tags = useTags();
  const duas = useDuas();
  const themes = useThemes();

  return (
    <div style={{
      margin: 20
    }}>
      {user && (
        <Space style={{
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <div style={{
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <Text strong>{user.name}</Text>
            <Text>{user.email}</Text>
          </div>
          <Avatar src={user.photo} />
        </Space>
      )}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tags" key="1">
          <TagList {...tags} />
        </TabPane>
        <TabPane tab="Duas" key="2">
          <DuaList {...duas} tags={tags.tags} />
        </TabPane>
        <TabPane tab="Themes" key="3">
          <ThemeList {...themes} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Page;