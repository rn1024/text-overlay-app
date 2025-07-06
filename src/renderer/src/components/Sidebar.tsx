import React from 'react';
import { Menu, Typography, Space, Button, Divider } from 'antd';
import { 
  HomeOutlined, 
  FileImageOutlined, 
  SettingOutlined, 
  InfoCircleOutlined,
  FolderOpenOutlined,
  SaveOutlined 
} from '@ant-design/icons';
import { useAppStore } from '../hooks/useAppStore';

const { Title, Text } = Typography;

const Sidebar: React.FC = () => {
  const { state } = useAppStore();

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'projects',
      icon: <FolderOpenOutlined />,
      label: '项目',
      children: [
        {
          key: 'recent',
          label: '最近项目',
        },
        {
          key: 'templates',
          label: '模板',
        },
      ],
    },
    {
      key: 'tools',
      icon: <FileImageOutlined />,
      label: '工具',
      children: [
        {
          key: 'image-editor',
          label: '图片编辑',
        },
        {
          key: 'text-overlay',
          label: '文字叠加',
        },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: '关于',
    },
  ];

  const handleSaveProject = async () => {
    if (window.api) {
      try {
        const success = await window.api.saveFile(
          JSON.stringify(state.data, null, 2),
          'project.json'
        );
        if (success) {
          console.log('项目保存成功');
        }
      } catch (error) {
        console.error('保存项目失败:', error);
      }
    }
  };

  return (
    <div style={{ padding: '16px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          导航
        </Title>
      </div>

      <div style={{ flex: 1 }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </div>

      <Divider />

      <div style={{ padding: '0 16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text type="secondary">项目统计</Text>
            <div>
              <Text strong>{state.data.length}</Text> 个项目
            </div>
          </div>
          
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={handleSaveProject}
            style={{ width: '100%' }}
          >
            保存项目
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Sidebar; 