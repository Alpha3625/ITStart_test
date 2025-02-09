import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { ConfirmWindow } from './components/ConfirmWindow/ConfirmWindow';
import { List } from './components/List/List';
import { EditingPanel } from './components/EditingPanel/EditingPanel';
import { Overlay } from './components/Overlay/Overlay';
import Loader from './components/Loader/Loader';

function App() {
  // Состояния для хранения данных семинаров, состояния загрузки, ошибок и состояния модальных окон
  const [seminars, setSeminars] = useState<ISeminars[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [confirmWindow, setConfirmWindow] = useState<boolean>(false);
  const [editWindow, setEditWindow] = useState<boolean>(false);
  const [currentEditedItem, setCurrentEditedItem] = useState<ISeminars | null>(null);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);

  // URL для API
  const url = 'http://localhost:3001/seminars';
  
  // useEffect для загрузки данных семинаров при монтировании компонента
  useEffect(() => {
    const seminarsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ISeminars[]>(url);
        if (response.status === 200) {
          setSeminars(response.data);
        } else {
          setError(`Ошибка! Статус: ${response.status}`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Ошибка! ${err.message}`);
        }
      } finally {
        setTimeout(() =>{
          setLoading(false);
        }, 5000);
      }
    };

    seminarsData();
  }, [url]);

  // useEffect для управления состоянием прокрутки страницы
  useEffect(() => {
    document.body.style.overflow = (confirmWindow || editWindow) ? 'hidden' : 'unset';
  }, [confirmWindow, editWindow]);

  // Обработчик удаления семинара
  const handleDelete = (item: ISeminars) => {
    setConfirmWindow(true);
    setCurrentItemId(item.id);
  };

  // Обработчик подтверждения удаления
  const handleConfirmDelete = async () => {
    if (currentItemId) {
      try {
        const response = await axios.delete(`${url}/${currentItemId}`);
        const newList = seminars.filter(item => item.id !== currentItemId);
        setSeminars(newList);
        setConfirmWindow(false);
        console.log('Запись успешно удалена: ', response.data);
      } catch (err) {
        console.log('Ошибка при удалении записи: ', err);
      }
    }
  };

  // Обработчик отмены удаления
  const handleCancelDelete = () => {
    setCurrentItemId(null);
    setConfirmWindow(false);
  };
  
  // Обработчик редактирования
  const handleEdit = (item: ISeminars) => {
    setEditWindow(true);
    setCurrentItemId(item.id);
    setCurrentEditedItem(item);
  };

  // Обработчик обновления
  const handleUpdate = async (updatedData: ISeminars) => {
    if (updatedData) {
      try {
        const response = await axios.put(`${url}/${updatedData.id}`, {...updatedData});  
        const updatedItem = seminars.map(item => item.id === updatedData.id ? {...updatedData} : item);
        setSeminars(updatedItem);
        setCurrentEditedItem(null);
        setEditWindow(false);
        console.log('Данные успешно обновлены: ', response.data);
      } catch (err) {
        console.log('Ошибка при обновлении: ', err);
      }
    }
  };
  
  // Обработчик изменения данных формы редактирования
  const handleUpdateFormData = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (currentEditedItem) {
      const {name, value} = e.target;
      setCurrentEditedItem(prev => ({ ...prev!, [name]: value }));
    }
  };

  // Обработчик отмены обновления
  const handleCancelUpdate = () => {
    setCurrentEditedItem(null);
    setEditWindow(false);
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="home__title">Расписание семинаров</h1>

        {loading ? <Loader /> : error ? (
          <div className="error">{error.toString()}</div>
        ) : (
          <List
            seminars={seminars}
            handleEdit={handleEdit}
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
            handleUpdate={handleUpdate}
            handleCancelUpdate={handleCancelUpdate} />
        </Overlay>
      )}
    </div>
  )
}

export default App;