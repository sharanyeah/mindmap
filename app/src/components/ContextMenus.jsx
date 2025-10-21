import React from 'react';

const ContextMenus = ({ mindMap }) => {
  return (
    <>
      <div id="context-branch" className="context-menu hidden">
        <div>
          <button id="context-branch__set-color">Set color</button>
          <button id="context-branch__rename">Rename</button>
          <button id="context-branch__delete">Delete</button>
        </div>
      </div>

      <div id="context-color-picker" className="context-menu hidden">
        <div id="colors-cont">
          <button id="context-color-picker__color-picker__button">
            <input id="color-picker" type="color" />
          </button>
        </div>
      </div>

      <div id="context-canvas" className="context-menu hidden">
        <div>
          <button id="context-canvas__add-root">Add node</button>
          <button id="context-canvas__save">Save mind map</button>
          <button id="context-canvas__rename">Rename mind map</button>
          <button id="context-canvas__share">Share</button>
          <button id="context-canvas__delete">Delete</button>
        </div>
      </div>
    </>
  );
};

export default ContextMenus;
