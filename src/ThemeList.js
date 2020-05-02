import React from 'react';
import { Popover, Space, Typography, Input, Button } from 'antd';
import { ChromePicker } from 'react-color';
import { PlusOutlined } from '@ant-design/icons';
import MyList from './MyList';

const { Text } = Typography;

const getRgb = ({ r, g, b, a }) => `rgb(${r},${g},${b},${a || 1})`;

const ColorItem = ({ color, editable = false, add = false, onChange, onDelete }) => {

  if (add) {
    return (
      <Popover 
        style={{ padding: 0 }}
        content={
          <ChromePicker color={color} onChange={(color) => onChange(color)} />
        } 
        trigger="click"
      >
        <div style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          borderStyle: 'dashed',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <PlusOutlined style={{ fontSize: 30 }}/>
        </div>
      </Popover>
    )
  }
  
  const item = (
    <div style={{
      height: 40,
      width: 40,
      backgroundColor: color,
      borderRadius: 40,
      cursor: editable ? 'pointer' : 'default'
    }}/>
  )

  if (editable) {
    return (
      <Popover 
        style={{ padding: 0 }}
        content={
          <>
            <Button danger onClick={onDelete} style={{ width: '100%' }}>delete</Button>
            <ChromePicker color={color} onChange={(color) => onChange(color)} />
          </>
        } 
        trigger="click"
      >
        {item}
      </Popover>
    )
  } else {
    return item;
  }

}

const ThemeList = ({ themes, getThemeById, saveTheme }) => (
  <MyList 
    isReady={themes ? true : false}
    data={themes}
    getDataById={getThemeById}
    saveData={saveTheme}
    title="title"
    viewComponent={({ value }) => (
      <>
        <Text>{value.title}</Text>
        <Space>
          {value.colors.map((color, key) => 
            <ColorItem key={key} color={getRgb(color)} />
          )}
        </Space>
      </>
    )}
    inputComponent={(({ value, onChange }) => (
      <>
        <Input placeholder="Title" value={value.title} onChange={(event) => onChange("title", event.target.value)}/>
        <Space style={{ margin: 5 }}>
          {value.colors.map((color, key) => 
            <ColorItem 
              key={key} 
              color={getRgb(color)} 
              editable
              onChange={({ rgb }) => onChange('colors', [
                ...value.colors.slice(0, key),
                rgb,
                ...value.colors.slice(key + 1, value.colors.length)
              ])} 
              onDelete={() => onChange('colors', [
                ...value.colors.slice(0, key),
                ...value.colors.slice(key + 1, value.colors.length)
              ])}
            />
          )}
          <ColorItem add onChange={({ rgb }) => onChange('colors', [ ...value.colors, rgb ])}/>
        </Space>
      </>
    ))}
  />
)

export default ThemeList;