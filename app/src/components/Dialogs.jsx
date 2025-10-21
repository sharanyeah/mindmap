import React, { useState } from 'react';

const Dialogs = ({ mindFileCur, mindFiles, mindFilesRemote }) => {
  const [activeDialog, setActiveDialog] = useState(null);

  return (
    <>
      <div id="dialogs-cont" className={activeDialog ? 'active' : ''}>
        <div id="dialog-rename" className="top" style={{ display: activeDialog === 'rename' ? 'block' : 'none' }}>
          <form>
            <input id="input-name" type="text" autoComplete="off" placeholder="New mindmap" />
            <button id="button-name" type="button">Rename</button>
          </form>
        </div>

        <div id="dialog-save" className="top" style={{ display: activeDialog === 'save' ? 'block' : 'none' }}>
          <form>
            <a href="" id="downloader">mind.json</a>
            <div>
              <input id="input-save" type="text" autoComplete="off" placeholder="New mindmap" />
              <button id="button-save" type="button">Download</button>
              <button id="button-save-remote" type="button">Save remote</button>
            </div>
            <div><a id="button-image" className="download-image-btn" href="">Download image</a></div>
          </form>
        </div>

        <div id="dialog-open" style={{ display: activeDialog === 'open' ? 'block' : 'none' }}>
          <form>
            <div id="dialog-open__loading-animation" className="loader hidden">
              <div className="cssload-speeding-wheel"></div>
            </div>
            <div id="file-list-samples"></div>
          </form>
        </div>

        <div id="dialog-share" className="top" style={{ display: activeDialog === 'share' ? 'block' : 'none' }}>
          <form>
            <input id="input-share" type="text" readOnly />
            <button id="button-share" type="button">Copy link</button>
          </form>
        </div>

        <div id="dialog-open-remote" style={{ display: activeDialog === 'open-remote' ? 'block' : 'none' }}>
          <div id="file-list" className="file-list">
            <div id="file-list-head">Remote files</div>
            <div id="file-list-body"></div>
          </div>
        </div>
      </div>

      <input id="rename-area" type="text" autoComplete="off" style={{ display: 'none' }} />
      
      <form className="none">
        <input type="file" id="uploader" accept=".json" multiple />
      </form>
    </>
  );
};

export default Dialogs;
