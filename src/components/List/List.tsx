import { FC, memo } from 'react';
import { Card } from '../Card/Card';
import styles from './List.module.scss';

interface IList {
    seminars: ISeminars[];
    handleDelete: (item: ISeminars) => void;
    handleEdit: (item: ISeminars) => void;
}

export const List: FC<IList> = memo(({seminars, handleDelete, handleEdit}) => {
    return (
        <ul className={styles.list}>
            {
                seminars.length !== 0 ? (
                    seminars.map((item, index) => (
                        <Card
                            key={index}
                            item={item}
                            handleDelete={handleDelete}
                            handleEditItem={handleEdit} />))
                ) : (
                    <li className={styles.list__empty}>
                        К сожалению, в данный момент нет запланированных семинаров.
                        Подпишитесь на наши обновления, чтобы первыми узнать о новых мероприятиях!
                    </li>
                )
            }
        </ul>
    );
});