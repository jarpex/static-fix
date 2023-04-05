const onTextRead = (text: string, image: HTMLImageElement | null) => {
  const isUsingSftp = text.match('^sftp://') !== null;

  if (isUsingSftp === false) {
    notify('🔐 Invalid SFTP source');
    if (image !== null) {
      image.src = './src/assets/placeholder-image.png';
    }
    return;
  }

  const staticRegex = /sftp:\/\/.*.selcdn.ru\/static\//;
  const staticUrl = text.replace(staticRegex, 'https://static.mebbr.ru/');
  if (isValidUrl(staticUrl) === false) {
    notify('😔 Invalid URL');
    if (image !== null) {
      image.src = './src/assets/placeholder-image.png';
    }
    return;
  }

  navigator.clipboard.writeText(staticUrl);
  notify('📋 Copied to clipboard');
  if (image !== null) {
    image.src = staticUrl;
  }

  setTimeout(clearNotifications, 3000);
};

const fix = () => {
  const image = document.getElementById('image') as HTMLImageElement | null;
  navigator.clipboard.readText()
    .then((text) => onTextRead(text, image))
    .catch(console.error);
};

const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
  } catch (err) {
    return false;
  }

  return true;
};

const notify = (text: string) => { 
  const notificationArea = document.getElementById('notifications');
  if (notificationArea === null) return;

  notificationArea.innerHTML += 
`<div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
  <div class="mr-3 text-xl font-normal">${text}</div>
  <button onclick="return this.parentNode.remove();" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  </button>
</div>`;
};

const clearNotifications = () => {
  const notificationArea = document.getElementById('notifications');
  if (notificationArea !== null) {
    notificationArea.innerHTML = '';
  }
};

const copyInnerText = (e) => {
  navigator.clipboard.writeText(e.text);
  notify('📋 Copied to clipboard');

  setTimeout(clearNotifications, 3000);
};
