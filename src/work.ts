const fix = () => {
  let image: HTMLImageElement = document.getElementById(
    'image'
  ) as HTMLImageElement;
  navigator.clipboard.readText().then(
    (cliptext) => {
      let text = cliptext;
      console.log(text);
      if (!text.match('^sftp://')) {
        notify('🔐 Invalid SFTP source');
        if (image && image.src) {
          image.src = './src/assets/placeholder-image.png';
        }
      } else {
        let re = /sftp:\/\/.*.selcdn.ru\/static\//;
        let out = text.replace(re, 'https://static.mebbr.ru/');
        if (isValidUrl(out)) {
          if (image && image.src) {
            image.src = out;
          }
          navigator.clipboard.writeText(out);
          notify('📋 Copied to clipboard');
          setTimeout(() => {
            clearNotifications();
          }, 3000);
        } else {
          notify('😔 Invalid URL');
          if (image && image.src) {
            image.src = './src/assets/placeholder-image.png';
          }
        }
      }
    },
    (err) => console.log(err)
  );
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

const notify = (string) => {
  let notificationArea = document.getElementById('notifications');
  if (notificationArea) {
    notificationArea.innerHTML += `<div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                      <div class="mr-3 text-xl font-normal">${string}</div>
                                      <button onclick="return this.parentNode.remove();" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                                          <span class="sr-only">Close</span>
                                          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                      </button>
                                  </div>`;
  }
};

const clearNotifications = () => {
  let notificationArea = document.getElementById('notifications');
  if (notificationArea) {
    notificationArea.innerHTML = '';
  }
};

const copyInnerText = (e) => {
  navigator.clipboard.writeText(e.text);
  notify('📋 Copied to clipboard');
  setTimeout(() => {
    clearNotifications();
  }, 3000);
};
