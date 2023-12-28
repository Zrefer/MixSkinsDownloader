import axios from 'axios';

import { ISkinData } from '../types/skin';
import UsersRespose from '../types/api';

const baseUrl = process.env.REACT_APP_API_URL;

function getImageSize(
  imageData: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
    img.src = imageData;
  });
}

async function getFile(
  type: 'cape' | 'skin',
  username: string,
): Promise<ISkinData> {
  const url = `${baseUrl}/${
    type === 'skin' ? 'skins' : 'cloaks'
  }/${username}.png`;
  try {
    const response = await axios.get<Blob>(url, { responseType: 'blob' });
    const blob = response.data;
    const imageData = URL.createObjectURL(blob);
    const { width, height } = await getImageSize(imageData);
    return {
      name: `${username}_${type}`,
      width,
      height,
      imageData,
      size: blob.size,
    };
  } catch {
    return null;
  }
}

export function getSkin(username: string): Promise<ISkinData> {
  return getFile('skin', username);
}

export function getCape(username: string): Promise<ISkinData> {
  return getFile('cape', username);
}

export async function getUsers(search: string): Promise<UsersRespose> {
  const url = `${baseUrl}/users?search=${search}`;
  const response = await axios.get<UsersRespose>(url);
  return response.data;
}
