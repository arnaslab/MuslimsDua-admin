import { useState, useEffect } from 'react';
import { callFunction } from './firebaseUtils';

const isSame = (data1, data2) => {
  // compare value
  if (data1 === data2) return true;

  // check different type
  if (typeof data1 !== typeof data2) return false;

  // check if array or object
  if (Array.isArray(data1) || typeof data1 === 'object') {

    // if array check different length
    if (Array.isArray(data1) && (data1.length !== data2.length)) return false;

    // if object check diferent keys count
    if (typeof data1 === 'object' && (Object.keys(data1).length !== Object.keys(data2).length)) return false;

    // check each attribute
    for (const key in data1) {
      if (!isSame(data1[key], data2[key])) {
          // different value of attribute
          return false;
      }
    }

    // all attributes same
    return true;
  }

  // different
  return false;
}

export const useData = ({ getEndpoint, setEndpoint }) => {
  const [ isReady, setReady ] = useState(false);
  const [ ori, setOri ] = useState();
  const [ data, setData ] = useState();

  useEffect(() => {
    callFunction(getEndpoint)
      .then(data => {
        const sortedData = data
          .sort((a, b) => a.sort - b.sort)
          .map((item, key) => ({ ...item, sort: key + 1 }));
        setOri(sortedData);
        // const sortedData = data
        //   .sort((a, b) => a.sort - b.sort)
        //   .map((item, key) => ({ ...item, sort: key + 1 }));
        setData(sortedData);
        setReady(true);
      });
  }, [getEndpoint])

  const getItemById = id => data.find(item => item.id === id);

  const getItemKey = id => data.findIndex(item => item.id === id);

  const edit = (item) => {
    const key = getItemKey(item.id)
    if (key > -1) {
      setData([
        ...data.slice(0, key),
        item,
        ...data.slice(key+1, data.length)
      ])
    } else {
      setData([ ...data, item ]);
    }
  }

  const save = (item) => (item.id && isSame(item, getItemById(item.id))) 
    ? Promise.resolve(item.id)
    : callFunction(setEndpoint, item).then(item => {
      edit(item);
      return item.id;
    });

  const sortUp = (item) => {
    const key = getItemKey(item.id)
    if (key > -1) {
      setData([
        ...data.slice(0, key-1),
        { ...item, sort: item.sort - 1 },
        { ...data[key-1], sort: data[key-1].sort + 1 },
        ...data.slice(key+1, data.length)
      ])
    }
  }

  const sortDown = (item) => {
    const key = getItemKey(item.id)
    if (key > -1) {
      setData([
        ...data.slice(0, key),
        { ...data[key+1], sort: data[key+1].sort - 1 },
        { ...item, sort: item.sort + 1 },
        ...data.slice(key+2, data.length)
      ])
    }
  }

  const cancelSort = () => setData(ori);

  const saveAll = async () => {
    setReady(false);
    const newData = await Promise.all(ori.map(async oriItem => {
      const item = getItemById(oriItem.id);
      if (isSame(item, oriItem)) {
        return item;
      } else {
        try {
          return await callFunction(setEndpoint, item);
        } catch(err) {
          return item;
        }
      }
    }))
    setData(newData.sort((a, b) => a.sort - b.sort));
    setOri(newData);
    setReady(true);
  }

  return { 
    isReady, 
    data, 
    getItemById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll 
  }
}

export const useTags = () => {
  const { 
    isReady, 
    data : tags, 
    getItemById : getTagById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll 
  } = useData({
    getEndpoint: 'getTags', 
    setEndpoint: 'setTag'
  });

  return {
    isReady, 
    tags, 
    getTagById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll
  }
}

export const useDuas = () => {
  const { 
    isReady, 
    data : duas, 
    getItemById : getDuaById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll 
  } = useData({ 
    getEndpoint: 'getDuas', 
    setEndpoint: 'setDua'
  });

  return {
    isReady, 
    duas, 
    getDuaById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll
  }
}

export const useThemes = () => {
  const { 
    isReady, 
    data : themes, 
    getItemById : getThemeById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll 
  } = useData({ 
    getEndpoint: 'getThemes', 
    setEndpoint: 'setTheme'
  });

  return {
    isReady, 
    themes, 
    getThemeById, 
    save, 
    sortUp, 
    sortDown, 
    cancelSort, 
    saveAll
  }
}