import React from 'react';
import { Typography, Input, Tag, Select } from 'antd';
import MyList from './MyList';

const { Text } = Typography;
const { Option } = Select;

const DuaList = ({ tags, duas, getDuaById, saveDua }) => (
  <MyList 
    isReady={tags && duas}
    data={duas}
    getDataById={getDuaById}
    saveData={saveDua}
    title={value => value.title.ind}
    viewComponent={({ value }) => (
      <>
        <Text><b>Judul :</b> {value.title.ind}</Text>
        <Text><b>Title :</b> {value.title.eng}</Text>
        <Text>{value.dua}</Text>
        <div>
					<b>Tags : </b>
          {value.tags.map((tagId, key) => 
            <Tag key={key}>
              {tags.find(tag => tag.id === tagId).ind}
            </Tag>
          )}
        </div>
        <Text><b>Transliterasi :</b> {value.trans}</Text>
        <Text><b>Terjemahan :</b> {value.ind}</Text>
        <Text><b>Translation :</b> {value.eng}</Text>
        <Text><b>Max Counter :</b> {value.maxcnt || 1}</Text>
      </>
    )}
    inputComponent={(({ value, onChange }) => (
      <>
        <Input placeholder="Judul" value={value.title.ind} onChange={(event) => onChange("title", { ...value.title, ind: event.target.value })}/>
        <Input placeholder="Title" value={value.title.eng} onChange={(event) => onChange("title", { ...value.title, eng: event.target.value })}/>
        <Input placeholder="Dua" value={value.dua} onChange={(event) => onChange("dua", event.target.value)}/>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select tags"
          defaultValue={value.tags}
          onChange={(value) => onChange("tags", value)}
        >
          {tags.map((tag, key) => (
            <Option key={key} value={tag.id}>{tag.ind}</Option>
          ))}
        </Select>
        <Input placeholder="Translation" value={value.trans} onChange={(event) => onChange("trans", event.target.value)}/>
        <Input placeholder="Terjemah" value={value.ind} onChange={(event) => onChange("ind", event.target.value)}/>
        <Input placeholder="Translate" value={value.eng} onChange={(event) => onChange("eng", event.target.value)}/>
        <Input placeholder="Link article" value={value.article} onChange={(event) => onChange("article", event.target.value)}/>
        <Input placeholder="Max Counter" type="number" value={value.maxcnt} onChange={(event) => onChange("maxcnt", event.target.value)}/>
      </>
    ))}
  />
)

export default DuaList;
