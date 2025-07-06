import React from 'react';
import { Card, Typography, Space, Button, Empty } from 'antd';
import { PlusOutlined, FileImageOutlined } from '@ant-design/icons';
import { useAppStore } from '../hooks/useAppStore';

const { Title, Paragraph } = Typography;

const MainContent: React.FC = () => {
  const { state, addData, setLoading, setError } = useAppStore();

  const handleCreateNew = () => {
    setLoading(true);
    // 模拟创建新项目
    setTimeout(() => {
      addData({
        name: `项目 ${state.data.length + 1}`,
        type: 'image',
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
    }, 1000);
  };

  const handleImportImage = async () => {
    try {
      if (window.api) {
        setLoading(true);
        const filePath = await window.api.openFile();
        if (filePath) {
          addData({
            name: '导入的图片',
            type: 'image',
            path: filePath,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setError('文件选择功能仅在桌面版本中可用');
      }
    } catch (error) {
      setError('导入图片失败');
      console.error('Import image error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>欢迎使用 Text Overlay App</Title>
        <Paragraph>
          这是一个基于 Electron + React + Ant Design 的跨平台桌面应用程序。
          您可以在这里创建和编辑图文内容。
        </Paragraph>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateNew}
            loading={state.loading}
          >
            创建新项目
          </Button>
          <Button 
            icon={<FileImageOutlined />}
            onClick={handleImportImage}
            loading={state.loading}
          >
            导入图片
          </Button>
        </Space>
      </div>

      <div style={{ flex: 1 }}>
        {state.data.length === 0 ? (
          <Empty 
            description="暂无项目"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {state.data.map((item) => (
              <Card 
                key={item.id}
                title={item.name}
                extra={<Button type="text" size="small">编辑</Button>}
                style={{ height: 200 }}
              >
                <div>
                  <p>类型: {item.type}</p>
                  <p>创建时间: {new Date(item.createdAt).toLocaleString()}</p>
                  {item.path && <p>路径: {item.path}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {state.error && (
        <div style={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          background: '#ff4d4f', 
          color: 'white', 
          padding: '8px 16px', 
          borderRadius: 4 
        }}>
          {state.error}
        </div>
      )}
    </div>
  );
};

export default MainContent; 