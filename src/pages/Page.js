import React from 'react';
import { Space, Typography, Avatar, Tabs } from 'antd';
import DuaList from './DuaList';
import TagList from './TagList';
import ThemeList from './ThemeList';
import { useTags } from "../utils/dataUtils";

const { Text } = Typography;
const { TabPane } = Tabs;

const Page = ({ user }) => {
  const tags = useTags();

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
          <DuaList tags={tags.tags} />
        </TabPane>
        <TabPane tab="Themes" key="3">
          <ThemeList />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Page;