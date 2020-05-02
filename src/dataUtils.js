import { useState, useEffect } from 'react';
import { callFunction } from './firebaseUtils';

const isSame = (data1, data2) => {
  if (data1 === data2) return true;

  if (!data1 || !data2) return false;

  if (typeof data1 !== typeof data2) return false;

  if (Array.isArray(data1)) {
      return data1.reduce((acc, item, key) => isSame(item, data2[key]), true);
  }
  
  if (typeof data1 === 'object') {
      Object.keys(data1).reduce((acc, key) => isSame(data1[key], data2[key]), true);
  }
  
  return false;
}

export const useTags = () => {
  const [ tags, setTags ] = useState();

  useEffect(() => {
    if (!tags) {
      callFunction('getTags').then(tags => setTags(tags));
    }
  })

  const getTagById = id => tags.find(item => item.id === id);

  const editTag = (tag) => {
    const key = tags.findIndex(item => item.id === tag.id)
    if (key > -1) {
      setTags([
        ...tags.slice(0, key),
        tag,
        ...tags.slice(key+1, tags.length)
      ])
    } else {
      setTags([ ...tags, tag ]);
    }
  }

  const saveTag = (tag) => (tag.id && isSame(tag, getTagById(tag.id))) 
    ? Promise.resolve(tag.id)
    : callFunction('setTag', tag).then(tag => {
      editTag(tag);
      return tag.id;
    });

  return { tags, getTagById, saveTag }
}

export const useDuas = () => {
  const [ duas, setDuas ] = useState();

  useEffect(() => {
    if (!duas) {
      callFunction('getDuas').then(duas => setDuas(duas));
    }
  })

  const getDuaById = id => duas.find(item => item.id === id);

  const editDua = (dua) => {
    const key = duas.findIndex(item => item.id === dua.id)
    if (key > -1) {
      setDuas([
        ...duas.slice(0, key),
        dua,
        ...duas.slice(key+1, duas.length)
      ])
    } else {
      setDuas([ ...duas, dua ]);
    }
  }

  const saveDua = (dua) => (dua.id && isSame(dua, getDuaById(dua.id))) 
    ? Promise.resolve(dua.id)
    : callFunction('setDua', dua).then(dua => {
      editDua(dua);
      return dua.id;
    });

  return { duas, getDuaById, saveDua }
}

export const useThemes = () => {
  const [ themes, setThemes ] = useState();

  useEffect(() => {
    if (!themes) {
      callFunction('getThemes').then(themes => setThemes(themes));
    }
  })

  const getThemeById = id => themes.find(item => item.id === id);

  const editTheme = (theme) => {
    const key = themes.findIndex(item => item.id === theme.id)
    if (key > -1) {
      setThemes([
        ...themes.slice(0, key),
        theme,
        ...themes.slice(key+1, themes.length)
      ])
    } else {
      setThemes([ ...themes, theme ]);
    }
  }

  const saveTheme = (theme) => (theme.id && isSame(theme, getThemeById(theme.id))) 
    ? Promise.resolve(theme.id)
    : callFunction('setTheme', theme).then(theme => {
      editTheme(theme);
      return theme.id;
    });

  return { themes, getThemeById, saveTheme }
}