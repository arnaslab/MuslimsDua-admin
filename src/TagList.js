import React from 'react';
import { Typography, Input } from 'antd';
import MyList from "./MyList";

const { Text } = Typography;

const TagList = ({ tags, getTagById, saveTag }) => (
  <MyList
    isReady={tags ? true : false}
    data={tags}
    getDataById={getTagById}
    saveData={saveTag}
    title="ind"
    viewComponent={({ value }) => (
      <>
        <Text>{value.ind}</Text>
        <Text>{value.ara}</Text>
        <Text>{value.eng}</Text>
      </>
    )}
    inputComponent={(({ value, onChange }) => (
      <>
        <Input placeholder="Judul" value={value.ind} onChange={(event) => onChange("ind", event.target.value)}/>
        <Input placeholder="الموضوع" value={value.ara} onChange={(event) => onChange("ara", event.target.value)}/>
        <Input placeholder="Title" value={value.eng} onChange={(event) => onChange("eng", event.target.value)}/>
      </>
    ))}
  />
)

export default TagList;