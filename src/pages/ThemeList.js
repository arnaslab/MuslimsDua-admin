import React, { useState } from 'react';
import { Popover, Space, Typography, Input, Button } from 'antd';
import { ChromePicker } from 'react-color';
import { PlusOutlined } from '@ant-design/icons';
import MyList from '../components/MyList';

const { Text } = Typography;

const getRgb = ({ r, g, b, a }) => `rgb(${r},${g},${b},${a || 1})`;

const ColorItem = ({ color: prevColor, editable = false, add = false, onChange, onDelete }) => {

  const [ color, setColor ] = useState(prevColor);

  if (add) {
    return (
      <Popover 
        style={{ padding: 0 }}
        content={
          <>
            <ChromePicker color={color} onChangeComplete={({ rgb }) => setColor(rgb)} />
            <Button onClick={() => onChange(color)} style={{ width: '100%' }}>oke</Button>
          </>
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
      backgroundColor: prevColor,
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
            <ChromePicker color={color} onChangeComplete={({ rgb }) => setColor(rgb)} />
            <Button onClick={() => onChange(color)} style={{ width: '100%' }}>oke</Button>
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

const ThemeList = ({ 
  isReady,
  themes, 
  getThemeById, 
  save, 
  sortUp, 
  sortDown, 
  cancelSort, 
  saveAll 
}) => (
  <MyList 
    isReady={isReady}
    data={themes}
    getDataById={getThemeById}
    sortUp={sortUp}
    sortDown={sortDown}
    cancelSort={cancelSort}
    saveData={save}
    saveAll={saveAll}
    title="title"
    viewComponent={({ value }) => (
      <>
        <Text>{value.title}</Text>
        <Space>
          {value.colors.map((color, key) => 
            <ColorItem key={key} color={getRgb(color)} />
          )}
        </Space>
        {value.bgColor && <ColorItem color={getRgb(value.bgColor)} />}
      </>
    )}
    inputComponent={(({ value, onChange }) => (
      <>
        <Input placeholder="Title" value={value.title} onChange={(event) => onChange("title", event.target.value)}/>
        <Space style={{ margin: 5 }}>
          {(value.colors || []).map((color, key) => 
            <ColorItem 
              key={key} 
              color={getRgb(color)} 
              editable
              onChange={newColor => onChange('colors', [
                ...value.colors.slice(0, key),
                newColor,
                ...value.colors.slice(key + 1, value.colors.length)
              ])} 
              onDelete={() => onChange('colors', [
                ...value.colors.slice(0, key),
                ...value.colors.slice(key + 1, value.colors.length)
              ])}
            />
          )}
          <ColorItem add onChange={newColor => onChange('colors', [ ...(value.colors || []), newColor ])}/>
        </Space>
        <ColorItem 
          add={!value.bgColor} 
          editable={value.bgColor} 
          color={value.bgColor}
          onChange={newColor => onChange('bgColor', newColor)}
          onDelete={() => onChange('bgColor', null)} 
        />
      </>
    ))}
  />
)

export default ThemeList;