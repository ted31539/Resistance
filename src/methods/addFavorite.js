import emitter from './eventBus';

const storageMethods = {
  save(item) {
    const favoriteString = JSON.stringify(item);
    localStorage.setItem('myfavorite', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('myfavorite'));
  },
};

export function getFavoriteIdAry() {
  const favoriteIdAry = storageMethods.get('myfavorite') || [];
  return favoriteIdAry;
}

export function toggleFavorite(product) {
  const favoriteIdAry = getFavoriteIdAry();
  let content;

  if (favoriteIdAry.includes(product.id)) {
    favoriteIdAry.splice(favoriteIdAry.indexOf(product.id), 1);
    content = '已從我的最愛中移除';
  } else {
    favoriteIdAry.push(product.id);
    content = '已加入我的最愛';
  }
  storageMethods.save(favoriteIdAry);
  emitter.emit('getFavoriteIdAry');
  emitter.emit('push-message', {
    content,
    state: true,
  });
}
