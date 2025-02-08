import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { ConfirmWindow } from './components/ConfirmWindow/ConfirmWindow';
import { List } from './components/List/List';
import { EditingPanel } from './components/EditingPanel/EditingPanel';
import { Overlay } from './components/Overlay/Overlay';
import Loader from './components/Loader/Loader';

function App() {
  const [seminars, setSeminars] = useState<ISeminars[]>([]);
  const [listItemId, setListItemId] = useState<{ index: number | null, id: number | null }>({ index: null, id: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [confirmWindow, setConfirmWindow] = useState<boolean>(false);
  const [editWindow, setEditWindow] = useState<boolean>(false);
  const [currentEditedItem, setCurrentEditedItem] = useState<ISeminars | null>(null);

  const url = 'http://localhost:3001/seminars';
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get<ISeminars[]>(url);
        setSeminars(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setTimeoutLoader();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (confirmWindow || editWindow) ? 'hidden' : 'unset';
  });

  const setTimeoutLoader = () => {
    setTimeout(() => {
      return setLoading(false);
    }, 5000);
  };

  const handleDelete = (index: number, item: ISeminars) => {
    setConfirmWindow(true);
    setListItemId({
      index: index,
      id: item.id
    });
  };

  const handleConfirmDelete = async () => {
    if (listItemId) {
      await axios.delete(`${url}/${listItemId.id}`)
        .then(response => {
          console.log('Запись успешно удалена: ', response.data);
        })
        .catch(error => {
          console.log('Ошибка при удалении записи: ', error);
        });
    }
    
    const newList = seminars.filter(item => item.id !== listItemId?.id);
    setSeminars(newList);
    setConfirmWindow(false);
  };

  const handleCancelDelete = () => {
    setListItemId({
      index: null,
      id: null
    });
    setConfirmWindow(false);
  };
  
  const handleEditItem = (index: number, item: ISeminars) => {
    setEditWindow(true);
    setListItemId({
      index: index,
      id: item.id
    });
    setCurrentEditedItem(item);
  };

  const handleUpdateItem = async (updatedItem: ISeminars) => {
    if (listItemId && updatedItem) {
      await axios.put(`${url}/${listItemId.id!}`, {...updatedItem})
      .then(response => {
        console.log('Данные успешно обновлены: ', response.data);
      })
      .catch(error => {
        console.log('Ошибка при обновлении: ', error);
      });

      const updatedData = seminars.map(item =>
        item.id === listItemId.id ? {...updatedItem} : item
      );
      setSeminars(updatedData);
      setCurrentEditedItem(null);
    }

    setEditWindow(false);
  };
  
  const handleUpdateFormData = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentEditedItem) {
      const {name, value} = e.target;
      setCurrentEditedItem(prev => ({
        ...prev !,
        [name]: value
    }))
    }
  };

  const handleCancelUpdateItem = () => {
    setCurrentEditedItem(null);
    setEditWindow(false);
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="home__title">Расписание семинаров</h1>

        {loading ? <Loader /> : error ? (
          <div className="error">Error: {error.toString()}</div>
        ) : (
          <List
            seminars={seminars}
            handleEditItem={handleEditItem}
            handleDelete={handleDelete} />)}
      </div>

      {confirmWindow && (
        <Overlay>
          <ConfirmWindow
            handleConfirmDelete={handleConfirmDelete}
            handleCancelDelete={handleCancelDelete} />
        </Overlay>
      )}

      {editWindow && (
        <Overlay>
          <EditingPanel
            currentEditedItem={currentEditedItem}
            handleUpdateFormData={handleUpdateFormData}
            handleUpdateItem={handleUpdateItem}
            handleCancelUpdateItem={handleCancelUpdateItem} />
        </Overlay>
      )}
    </div>
  )
}

export default App
