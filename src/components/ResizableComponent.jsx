import React, { useState } from 'react';
import Splitter from './Splitter';
import { useResizable } from 'react-resizable-layout';
import { cn } from '../utils/cn';

const ResiZableComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: 'y',
    initial: 150,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 250,
    min: 50,
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 200,
    min: 50,
    reverse: true,
  });
  const addInputValue = () =>{
    
    setInputValue('');
  }
  return (
    <div
      className={
        'flex flex-column h-screen bg-dark font-mono color-white overflow-hidden'
      }
    >
      <div className={'flex grow'}>
        <div
          className={cn('shrink-0 contents', isFileDragging && 'dragging')}
          style={{ width: fileW }}
        >
          <input
            type="text"
            placeholder="Enter text ...."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button onClick={addInputValue}>Add</button>
        </div>
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={'flex grow'}>
          <div className={'grow bg-darker contents'}>Editor</div>
          <Splitter isDragging={isPluginDragging} {...pluginDragBarProps} />
        </div>
      </div>
      <Splitter
        dir={'horizontal'}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          'shrink-0 bg-darker contents',
          isTerminalDragging && 'dragging'
        )}
        style={{ height: terminalH }}
      >
        Terminal
      </div>
    </div>
  );
};

export default ResiZableComponent;
