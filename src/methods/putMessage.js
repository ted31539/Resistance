import emitter from './eventBus';

export default function (res, message) {
  if (res.data.success) {
    emitter.emit('push-message', {
      content: `${message}成功`,
      state: res.data.success,
    });
  } else {
    emitter.emit('push-message', {
      content: res.data.message,
      state: res.data.success,
    });
  }
}
