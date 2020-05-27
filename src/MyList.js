import React, { useState, Fragment } from 'react';
import { List, Button, Typography, Spin } from 'antd';
const { Text } = Typography;

const MyList = props => {
  const [ open, setOpen ] = useState(null);
  const [ type, setType ] = useState("hide");
  const [ input, setInput ] = useState({});
  const { 
    isReady, 
    data, 
    getDataById, 
    saveData, 
    title, 
    inputComponent : Input, 
    viewComponent : View
  } = props;

  const handleNew = () => {
    setOpen(null);
    setType("new");
    setInput({});
  }

  const handleExpand = (id, type) => () => {
    setOpen(id);
    setType(type);
    setInput(getDataById(id));
  }

  const handleCollapse = () => {
    setOpen(null);
    setType("hide");
    setInput({});
  }

  const handleEdit = (name, value) => setInput({ ...input, [name]: value });

  const handleSave = () => {
    setType("save");
    saveData(input).then((id) => {
      setOpen(id);
      setType("view");
    });
  }

  const ActionButton = ({ actions }) => (
    <div>
      {Object.keys(actions).map((title, key) => (
        <Fragment key={key}>
          {key !== 0 && <Text disabled>|</Text>}
          <Button type="link" onClick={actions[title]}>{title}</Button>
        </Fragment>
      ))}
    </div>
  )

  const centeredSpin = (
    <div style={{ 
      width: '100%', 
      height: 100, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Spin />
    </div>
  )

  const inputComponent = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input value={input} onChange={handleEdit} />
    </div>
  )

  const viewComponent = (item) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <View value={item} />
    </div>
  )

  if (isReady) {
    return (
      <>
        <div style={{ 
          width: '100%',
          display: 'flex', 
          justifyContent: 'flex-end'
        }}>
          <ActionButton actions={{ 
            ...(type === "new" ? { save: handleSave, cancel: handleCollapse } : { add: handleNew })
          }} />
        </div>
        {!open && (type === "new" ? inputComponent : type === "save" && centeredSpin)}
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <div style={{ 
                width: '100%',
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text strong>{typeof title === 'function' ? title(item) : item[title]}</Text>
                <ActionButton actions={{
                  ...((open !== item.id) ? {
                    view: handleExpand(item.id, "view"),
                    edit: handleExpand(item.id, "edit")
                  } : {
                    ...(type === 'edit' && { save: handleSave }),
                    [type === 'edit' ? 'cancel' : 'hide']: handleCollapse
                  })
                }}/>
              </div>
              {(open === item.id) && 
              ( (type === "view") ? viewComponent(item) 
              : (type === "edit") ? inputComponent
              : (type === "save") && centeredSpin)}
            </List.Item>
          )}
        />
      </>
    );
  } else {
    return centeredSpin;
  }
}

export default MyList;