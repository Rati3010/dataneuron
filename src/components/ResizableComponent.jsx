import React, { useEffect, useState } from 'react';
import Splitter from './Splitter';
import { useResizable } from 'react-resizable-layout';
import { cn } from '../utils/cn';
import {
  addCollection,
  getCollection,
  updateCollection,
} from '../utils/collection';

const ResiZableComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [collectionData, setCollectionData] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [userAction, setUserAction] = useState('Add');
  const [collectionId, setCollectionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCollection();
        if (data) {
          setCollectionData(data.collections);
          setUpdateCount(data.updateCount);
        }
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };
    fetchData();
  }, []);
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
  const addInputValue = async () => {
    if (inputValue) {
      try {
        if (userAction === 'Add') {
          await addCollection(inputValue);
          alert('Collection added successfully');
        } else if (userAction === 'Update') {
          await updateCollection(collectionId, inputValue);
          alert('Collection updated successfully');
        } else {
          console.error('Invalid user action');
        }
        setInputValue('');
        setCollectionId(null);
        setUserAction('Add');
        const updatedData = await getCollection();
        if (updatedData) {
          setCollectionData(updatedData.collections);
          setUpdateCount(updatedData.updateCount);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
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
          <button onClick={addInputValue}>
            {userAction === 'Add' ? 'Add' : 'Update'}
          </button>
        </div>
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={'flex grow'}>
          <div className={'grow bg-darker contents'}>
            <ul>
              {collectionData.length > 0 &&
                collectionData.map(data => {
                  return (
                    <li style={{ marginBottom: '5px' }} key={data._id}>
                      {data.text}
                      <button style={{marginLeft:"5px"}}
                        onClick={() => {
                          setUserAction('Update');
                          setCollectionId(data._id);
                          setInputValue(data.text);
                        }}
                      >
                        update
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
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
        <div>
          <p>Total Collection:{collectionData.length}</p>
          <p>Updated Collection:{updateCount.update_count}</p>
        </div>
      </div>
    </div>
  );
};

export default ResiZableComponent;
